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
    <div v-if="!!this.activeCategory" class="category">
      <h1>{{ activeCategory.name }}</h1>
      <div class="description" v-html="activeCategory.description"></div>
      <div class="results" v-if="!isLoading">
        <ResultBox
          v-for="(result, index) in results[activeCategory.name]"
          :key="index"
          :result="result"
          @open="openResult"
        />
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
import ResultBox from "../components/ResultBox.vue";
import axios from "axios";
import { states } from "../shared/helpers";

@Component({
  components: {
    Result,
    ResultBox,
  },
})
export default class Results extends Vue {
  public categories: any[] = [];
  public activeCategory: any = null;
  public results: { [key: string]: any[] } = {};
  public actions: any[] = [];
  public joblist: any[] = [];
  public resultTypes: any = {};
  public activeResult: any = null;
  mariageTypeOptions: any[] = [];
  public loadingResults = true;
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

    this.navigate(this.categories[0]);
  }
  openResult(result: any) {
    this.activeResult = result;
  }
  get currentActions() {
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
    await this.getCategoryResults();
  }

  async getCategoryResults(): Promise<any[]> {
    if (this.activeCategory) {
      if (!this.results[this.activeCategory.name]) {
        this.loadingResults = true;
        this.results[this.activeCategory.name] = this.filterResults(
          (
            await axios.get(
              "https://afq-t32f44ncfa-ey.a.run.app/items/result?fields=*,has_job.joblist_id,has_mariage_type.,actions.*.*.*&filter[category][_eq]=" +
                this.activeCategory.id
            )
          ).data.data
        );
        this.loadingResults = false;
        return this.results[this.activeCategory.name];
      } else {
        return this.results[this.activeCategory.name];
      }
    }
    return await [];
  }

  get isLoading(): boolean {
    return this.loadingResults;
  }

  filterResults(results: any[]): any[] {
    const filterCriteria: any = this.$cookies.get("finder_value");
    console.log(this.results, filterCriteria);

    // TODO:
    // has_insurance: Array(0)
    //age

    if (results) {
      const filters: { [key: string]: (res: any) => boolean } = {
        dateFilter: (res) =>
          res.end_date == null || new Date("2022-12-31").getTime() > Date.now(),
        maxIncomeFilter: (res) =>
          res.max_income == null || filterCriteria.income <= res.max_income,
        minIncomeFilter: (res) =>
          res.min_income == null || filterCriteria.income >= res.min_income,
        maxRentFilter: (res) =>
          res.max_rent == null || filterCriteria.rent <= res.max_rent,
        minRentFilter: (res) =>
          res.min_rent == null || filterCriteria.rent >= res.min_rent,
        maxChildrenCountFilter: (res) =>
          res.max_children_count == null ||
          filterCriteria.numberOfChildren <= res.max_children_count,
        minChildrenCountFilter: (res) =>
          res.min_children_count == null ||
          filterCriteria.numberOfChildren >= res.min_children_count,
        ageFilter: (res) => {
          if (res.min_age != null && res.max_age != null) {
            return true;
          }
          for (let i = 0; i < filterCriteria.length; i++) {
            const child = filterCriteria[i].children;
            if (res.min_age != null && res.min_age > child) {
              return false;
            }
            if (res.max_age != null && res.max_age < child) {
              return false;
            }
          }
          return true;
        },
        pregnantFilter: (res) => !res.pregnant || filterCriteria.pregnant,
        hasJobFilter: (res) =>
          res.has_job == null || res.has_job.length == 0
            ? true
            : res.has_job
                .map((r: any) => r.joblist_id)
                .includes(filterCriteria.jobStatus),
        hasMariageTypeFilter: (res) =>
          res.has_mariage_type == null || res.has_mariage_type.length == 0
            ? true
            : res.has_mariage_type
                .map((r: any) => r.mariage_types_id)
                .includes(filterCriteria.mariageStatus.id),

        addressFilter: (res) => {
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
          return inRegionFilter && postalCodesFilter;
        },
      };

      for (const key in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, key)) {
          results = results.filter(filters[key]);
        }
      }

      return results
        .map((res: any) => {
          res.type = this.resultTypes[res.type];
          return res;
        })
        .sort((resA: any, resB: any) => resB.type.weight - resA.type.weight);
    }
    return [];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.results-view {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100vw;
  // height: 100vh;
  overflow-y: auto;
  // padding-top: 3rem;
  box-sizing: border-box;
  nav {
    font-weight: bold;
    font-size: 1rem;
    ul {
      list-style: none;
      padding: 0.5rem;
      margin: 0;
      line-height: 1.25rem;
      li {
        a {
          display: inline-block;
          transition: 200ms color;
          cursor: pointer;
          padding: 12px;
          &.active,
          &:hover {
            color: var(--orange);
          }
        }
      }
    }
  }
  .category {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5px;
    @media (min-width: 800px) {
      padding: 1rem;
    }
    > .description {
      text-align: center;
      width: 100%;
      padding: 0 0.5rem;
      box-sizing: border-box;
      // margin-bottom: 3rem;
      @media (min-width: 600px) {
        padding-bottom: 3rem;
      }
    }
    .results {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
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
