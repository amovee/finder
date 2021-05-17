<template>
  <div class="results-view">
    <nav>
      <ul v-if="categories.length > 0 && activeCategory != null">
        <li v-for="(category, index) in categories" :key="index">
          <a
            v-on:click="navigate(category)"
            :class="{ active: activeCategory.id == category.id }"
            >{{ category.name }}</a
          >
        </li>
      </ul>
    </nav>
    <div v-if="this.activeCategory != null" class="category">
      <h1>{{ activeCategory.name }}</h1>
      <div class="description" v-html="activeCategory.description"></div>
      <div class="results">
        <div
          class="result"
          v-for="(result, index) in filteredResults"
          :key="index"
        >
          <h2>{{ result.name }}</h2>
          <span class="type">{{ result.type.name }}</span>

          <h4
            v-if="result.start_date != null || result.end_date == null"
            class="time"
          >
            <div class="start" v-if="result.start_date != null">
              vom<span class="date">{{
                timeFormatting(result.start_date)
              }}</span>
            </div>
            <div class="end" v-if="result.end_date != null">
              bis zum<span class="date">{{
                timeFormatting(result.end_date)
              }}</span>
            </div>
          </h4>
          <div
            class="short_description"
            v-html="result.short_description"
          ></div>
          <!-- {{result}} -->
          <button @click="activeResult = result">Details</button>
        </div>
      </div>
    </div>
    <div v-if="activeResult" class="active-result">
      <button @click="activeResult = null" class="close">
        <img src="../assets/close_black.svg" alt="" />
      </button>
      <Result :result="activeResult" :actions="currentActions"></Result>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Result from "../components/Result.vue";
import axios from "axios";
import { states } from "../components/plz";

@Component({
  components: {
    Result,
  },
})
export default class Results extends Vue {
  public categories: any[] = [];
  public activeCategory: any = null;
  public results: any[] = [];
  public actions: any[] = [];
  public joblist: any[] = [];
  public resultTypes: any = {};
  public activeResult: any = null;
  categoriesLoadedV = false;
  mariageTypeOptions: any[] = [];
  constructor() {
    super();
  }
  async mounted(): Promise<void> {
    this.categories = (
      await axios.get("https://afq-t32f44ncfa-ey.a.run.app/items/category")
    ).data.data;
    this.actions = (
      await axios.get("https://afq-t32f44ncfa-ey.a.run.app/items/action")
    ).data.data;
    this.joblist = (
      await axios.get("https://afq-t32f44ncfa-ey.a.run.app/items/joblist")
    ).data.data;

    this.mariageTypeOptions = (
      await axios.get("https://afq-t32f44ncfa-ey.a.run.app/items/mariage_types")
    ).data.data.sort((a: any, b: any) => b.weight - a.weight);
    (
      await axios.get("https://afq-t32f44ncfa-ey.a.run.app/items/result_type")
    ).data.data.forEach((type: any) => {
      this.resultTypes[type.id] = {
        name: type.name,
        weight: type.weight,
        icon: type.icon,
      };
    });

    // console.log(this.categories);
    this.navigate(this.categories[0]);
    // console.log(a.filter((d: any)=>d.category == this.categories[this.activeCategory].id));
  }
  get currentActions() {
    console.log(this.activeResult);
    return this.actions.filter((action: any) => {
      for (let i = 0; i < this.activeResult.actions.length; i++) {
        const id = this.activeResult.actions[i];
        if (action.id == id) return true;
      }
      return false;
    });
  }
  async navigate(category: any) {
    this.activeCategory = category;
    console.log(this.activeCategory);
    this.results = (
      await axios.get(
        "https://afq-t32f44ncfa-ey.a.run.app/items/result?fields=*,has_job.joblist_id,has_mariage_type.*&filter[category][_eq]=" +
          this.activeCategory.id
      )
    ).data.data;
  }

  get filteredResults(): any[] {
    const filterCriteria: any = this.$cookies.get("finder_value");
    // console.log(filterCriteria);
    // end_date: (...)
    // max_rent: (...)
    // min_rent: (...)
    // min_income: (...)
    // max_income: (...)
    // postalcodes: (...)
    // max_children_count: (...)
    // min_children_count: (...)
    // region: (...)
    // has_job: (...)
    // has_mariage_type: (...)

    // has_insurance: Array(0)
    //age

    return this.results
      .filter((res) => {
        const dateFilter: boolean =
          res.end_date == null || new Date("2022-12-31").getTime() > Date.now();
        const maxIncomeFilter: boolean =
          res.max_income == null || filterCriteria.income <= res.max_income;
        const minIncomeFilter: boolean =
          res.min_income == null || filterCriteria.income >= res.min_income;
        const maxRentFilter: boolean =
          res.max_rent == null || filterCriteria.rent <= res.max_rent;
        const minRentFilter: boolean =
          res.min_rent == null || filterCriteria.rent >= res.min_rent;
        const maxChildrenCountFilter: boolean =
          res.max_children_count == null ||
          filterCriteria.numberOfChildren <= res.max_children_count;
        const minChildrenCountFilter: boolean =
          res.min_children_count == null ||
          filterCriteria.numberOfChildren >= res.min_children_count;

        // console.log(res, res.start_date, res.end_date);

        // TODO: Make it faster
        let postalCodesFilter = false;
        if (res.postalcodes != null) {
          res.postalcodes.split(",").forEach((codes: any) => {
            if (filterCriteria.postalCode.startsWith(codes)) {
              postalCodesFilter = true;
            }
          });
        } else {
          postalCodesFilter = true;
        }

        let inRegionFilter = true;
        if (res.region != null) {
          inRegionFilter = states[+res.region].postalCodes.includes(
            filterCriteria.postalCode
          );
        }

        const hasJobFilter =
          res.has_job == null || res.has_job.length == 0
            ? true
            : res.has_job
                .map((r: any) => r.joblist_id)
                .includes(filterCriteria.jobStatus);
        const hasMariageTypeFilter =
          res.has_mariage_type == null || res.has_mariage_type.length == 0
            ? true
            : res.has_mariage_type
                .map((r: any) => r.mariage_types_id)
                .includes(filterCriteria.mariageStatus.id);

        return (
          dateFilter &&
          maxIncomeFilter &&
          minIncomeFilter &&
          minRentFilter &&
          maxRentFilter &&
          postalCodesFilter &&
          maxChildrenCountFilter &&
          minChildrenCountFilter &&
          inRegionFilter &&
          hasJobFilter &&
          hasMariageTypeFilter
        );
      })
      .map((res: any) => {
        res.type = this.resultTypes[res.type];
        return res;
      })
      .sort((resA: any, resB: any) => resB.type.weight - resA.type.weight);
  }
  public timeFormatting(date: string): string {
    const getMonth = (d: string) => {
      return [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
      ][new Date(d).getMonth()];
    };
    const getYear = (d: string) => new Date(d).getFullYear();
    const getDay = (d: string) => new Date(d).getDate();
    return getDay(date) + ". " + getMonth(date) + " " + getYear(date);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.results-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  padding-top: 3rem;box-sizing: border-box;
  nav {
    font-weight: bold;
    font-size: 0.75rem;
    ul {
      list-style: none;
      padding: 0.5rem;
      margin: 0;
      line-height: 1rem;
      li {
        a {
          transition: 200ms color;
          cursor: pointer;
          &.active,
          &:hover {
            color: var(--orange);
          }
        }
      }
    }
  }
  .category {
    padding: 1rem;
    // position: absolute;
    // top: 0;
    // right: 0;
    // width: 60%;
    .description {
      text-align: center;
      width: 100%;
      margin-bottom: 3rem;
    }
    .results {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      .result {
        background-color: var(--light-orange);
        padding: 1rem;
        box-sizing: border-box;
        h2 {
          font-size: 1.25rem;
          color: var(--orange);
          margin: 0 0 0.5rem 0;
        }
        .type {
          font-size: 0.75rem;
          font-weight: bold;
          display: inherit;
        }
        button {
          background-color: var(--orange);
          color: white;
          border: none;
          padding: 0.25rem 0.5rem;
          border-radius: 8px;
          cursor: pointer;
        }
        a {
          color: var(--orange);
        }
        width: calc(50% - 0.5rem);
      }
    }
  }
}
.active-result {
  position: fixed;
  padding: 4rem 1rem;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow-y: auto;
  button.close {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background-color: var(--orange);
    color: white;
    border: none;
    border-radius: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;

    img {
      width: 2rem;
      height: 2rem;
      display: block;
    }
  }
}
</style>
