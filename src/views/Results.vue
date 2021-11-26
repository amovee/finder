<template>
  <div id="results" v-if="cathegoriesLoaded">
    <ResultHeader @openSharingMenu="sharingOpen = true" />
    <div class="title">
      <h1>Deine Resultate</h1>
      <div class="subtitle">
        <span class="green">ca. {{ numberOfAllResults }} Angebote</span> in
        <span class="red"
          >{{ Object.keys(cathegories).length }} Kategorien</span
        >
        gefunden
      </div>
    </div>
    <main>
      <CathegoryNav @change="changeCathegory" />
      <p v-html="current.description" />
      <div class="content">
        <div class="cards" v-if="results">
          <Card
            v-for="(config, i) in current.content"
            :key="i"
            :config="config"
            @open="openCard(i)"
            @fav="updateFavorites"
          />
        </div>
      </div>
      <transition name="fade">
        <div
          id="full-screen-result-card"
          v-if="activeResult != null || sharingOpen || cookieOpen"
        >
          <Alert>
            <ResultCard
              v-if="activeResult != null"
              :content="current.content[activeResult]"
              @close="closeCard"
              @fav="updateFavorites"
              class="full-size"
            />
            <SharingCard v-if="sharingOpen" @close="sharingOpen = false" />
            <CookieCard v-if="cookieOpen" @confirm="enableFavorites" />
          </Alert>
        </div>
      </transition>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import SharingCard from "@/components/SharingCard.vue";
import CathegoryNav from "@/components/CathegoryNav.vue";
import ResultCard from "@/components/ResultCard.vue";
import ResultHeader from "@/components/ResultHeader.vue";
import OverlayScrollbars from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import axios from "axios";
import { FinderStatus } from "@/shared/status";
import { Cathegory } from "@/shared/cathegory";
import { states } from "../shared/helpers";
import CookieCard from "@/components/CookieCard.vue";
import Alert from "@/components/Alert.vue";

@Component({
  components: {
    ResultHeader,
    SharingCard,
    Card,
    ResultCard,
    CathegoryNav,
    OverlayScrollbarsComponent,
    CookieCard,
    Alert,
  },
})
export default class Results extends Vue {
  url = "https://afq-t32f44ncfa-ey.a.run.app/items/";
  activeCathegory = 1; // TODO: load from most weighted
  activeResult: any = null;
  results: any[] = [];
  cathegories: { [key: number]: Cathegory } = {};
  sharingOpen = false;
  cookieOpen = false;
  favorites: number[] = [];
  cookiesEnabled = false;
  get current(): Cathegory {
    return this.cathegories[this.activeCathegory];
  }
  get numberOfAllResults(): number {
    const cathegories: { [key: number]: Cathegory } = this.cathegories;
    let n = 0;
    for (const key in cathegories) {
      if (Object.prototype.hasOwnProperty.call(cathegories, key)) {
        if (!cathegories[key].allreadyRequested) {
          n += cathegories[key].nor;
        } else {
          n += cathegories[key].content.length;
        }
      }
    }
    return n;
  }
  public $store: any;
  constructor() {
    super();
    // TODO: delete
    if (this.$route.query.answers) {
      this.$store.commit(
        "initAnswers",
        FinderStatus.fromJson(JSON.parse(this.$route.query.answers + ""))
      );
    }
    const favs: any = this.$cookies.get("favorites");
    const dateInPast = (secondDate: Date) =>
      new Date().setHours(0, 0, 0, 0) > secondDate.setHours(0, 0, 0, 0);
    if (favs && favs.allowed) {
      // TODO: expires
      this.favorites = favs.value;
      this.cookiesEnabled = true;
    }
  }
  updateFavorites(card: { id: number; activ: boolean }) {
    const expires = new Date();
    expires.setDate(new Date().getDate() + 356);
    if (card.activ) {
      if (this.favorites.indexOf(card.id) == -1) {
        this.favorites.push(card.id);
      }
    } else {
      const index = this.favorites.indexOf(card.id);
      if (index > -1) {
        this.favorites.splice(index, 1);
      }
    }
    if (this.cookiesEnabled) {
      this.$cookies.set("favorites", {
        allowed: true,
        expires,
        value: this.favorites,
      });
    } else {
      this.cookieOpen = true;
    }
  }
  enableFavorites(allow: boolean) {
    this.cookieOpen = false;
    this.cookiesEnabled = allow;
    const expires = new Date();
    expires.setDate(new Date().getDate() + 356);
    if (allow) {
      this.$cookies.set("favorites", {
        allowed: true,
        expires,
        value: this.favorites,
      });
    } else {
      this.$cookies.set("favorites", {
        allowed: false,
        expires,
      });
    }
  }
  getResultFilters = (cathegory: number | null) => {
    let f = '{"_and": [';
    // filter+='{"min_age": {"_eq": 0}}';
    // filter+='{"_or": [{"min_age": {"_eq": 0}}, {"min_age": {"_eq": "_nnull"}}]}'
    // filter+=',{"is_pregnant": {"_eq": true}}';

    // end_date: null
    // start_date: null
    const status: FinderStatus = this.$store.getters.answers;
    const filters: string[] = [
      `{"_or": [{"end_date": {"_null":true}}, {"end_date":{"_gt": "$NOW"}}]}`,
    ];

    filters.push(...status.children.getQueryFilters());
    filters.push(...status.housingSituation.getQueryFilters());
    filters.push(...status.income.getQueryFilters());
    if (cathegory != null) {
      filters.push(`{"category": {"_eq": ${cathegory}}}`);
    }
    f += filters.join(",");
    f += "]}";
    return f;
  };

  get cathegoriesLoaded(): boolean {
    return Object.keys(this.cathegories).length > 0;
  }

  async loadCathegoryResults() {
    const status: FinderStatus = this.$store.getters.answers;
    // TODO: repeat  favorite sorting
    if (this.current && !this.current.allreadyRequested) {
      const request =
        this.url +
        "result?fields=*,has_job.joblist_id,has_mariage_type.*,type.*,actions.*.*.*&limit=" +
        this.numberOfAllResults +
        "&filter=" +
        this.getResultFilters(this.current.id);
      let results = (await axios.get(request)).data.data;
      results = results.map((result: any) => {
        result.isFavorite = this.favorites.includes(result.id);
        result.weight = result.type.weight + result.isFavorite * 1000;
        return result;
      });
      results = results.filter(
          (result: any) =>
            status.lifeSituation.getResultFilter(result) &&
            status.children.getResultFilter(result) &&
            status.housingSituation.getResultFilter(result) &&
            status.insurance.getResultFilter(result) &&
            status.working.getResultFilter(result) &&
            status.income.getResultFilter(result)
        )
        .sort((a: any, b: any) => {
          return b.weight - a.weight;
        });
        
      this.$store.commit("setCategoryResults", {
        id: this.current.id,
        results,
      });
      this.results = results;
      this.current.allreadyRequested = true;
    }
  }
  async mounted(): Promise<void> {
    //this.url+"result?limit=0&filter=&meta=filter_count"

    // https://docs.directus.io/reference/query/
    // https://docs.directus.io/configuration/filter-rules/
    const status: FinderStatus = this.$store.getters.answers;

    this.$store.commit(
      "initResultTypes",
      (await axios.get(this.url + "result_type")).data.data
    );
    // }
    // (await axios.get(this.url + "category?limit=0&meta=filter_count&filter"+this.getResultFilters(element.id))).data.data;

    const cathegories = (await axios.get(this.url + "category")).data.data;
    this.$store.commit("initCathegories", cathegories);

    for (let i = 0; i < cathegories.length; i++) {
      const cat = cathegories[i];
      const nor = (
        await axios.get(
          this.url +
            "result?fields=*&limit=0&meta=filter_count&filter=" +
            this.getResultFilters(cat.id)
        )
      ).data.meta.filter_count;
      this.$store.commit("setNumberOfResults", { id: cat.id, nor });
    }
    // this.$store.commit(
    //   "saveResults",
    //   (
    //     await axios.get(
    //       this.url+"result?fields=*,has_job.joblist_id,has_mariage_type.,actions.*.*.*&filter="+filter
    //     )
    //   ).data.data
    // );

    this.cathegories = this.$store.getters.cathegories;
    this.activeCathegory = 1;
    this.loadCathegoryResults();
  }
  changeCathegory(index: number) {
    this.activeCathegory = index;
    this.loadCathegoryResults();
  }
  closeCard() {
    this.activeResult = null;
  }
  openCard(index: number) {
    this.activeResult = index;
  }
}
</script>
<style lang="scss">
#results {
  .title {
    h1 {
      font-family: "Playfair Display";
      color: var(--dark-primary);
      font-size: 2rem;
      line-height: 72px;
      text-align: center;
      margin: 0;
      font-weight: 500;
      @media (min-width: 400px) {
        font-size: 3rem;
      }
    }
    .subtitle {
      text-align: center;
      font-weight: 600;
      margin-bottom: 3rem;
      .green {
        color: var(--accent-green);
      }
      .red {
        color: var(--accent-red);
      }
    }
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1rem;
    @media (min-width: 750px) {
      padding: 0 3rem;
    }
    & > p {
      font-size: 17px;
      line-height: 28px;
      text-align: center;
      margin: 0 0 40px 0;
      max-width: 550px;
    }
    & > .content {
      display: flex;
      .cards {
        min-width: 50vw;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;

        @media (min-width: 750px) {
          gap: 2rem 3rem;
        }
      }
    }
    #full-screen-result-card {
  z-index: 10;
      position: fixed;
      top: 0;
      left: 0;
      // overflow-y: hi;
      height: 100vh;
      width: 100vw;
      box-sizing: border-box;
    }
  }
}
</style>