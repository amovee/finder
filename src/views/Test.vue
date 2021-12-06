<template>
  <div id="test">
    <nav>
      <label for="category">Kategorie</label>
      <select id="category" v-model.number="category">
        <option v-for="(cat, i) in cathegories" :key="i" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
      <label for="start">Start:</label>
      <input type="number" id="start" v-model.number="start" min="0" />
      <label for="end">max Anzahl:</label>
      <input type="number" id="end" v-model.number="end" min="0" max="100" />
      <button @click="reload">load</button>
      <p>
        Anzahl Ergebnisse: {{ results.length }} von {{ nor }} in dieser
        Kategorie
      </p>
    </nav>
    <main>
      <Card v-for="(result, i) in results" :key="i + 100" :config="result" />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import ResultCard from "@/components/ResultCard.vue";
import axios from "axios";
import { FinderStatus } from "@/shared/status";

class A {
  public print(): void {
    console.log(123);
  }
}

@Component({
  components: {
    Card,
    ResultCard,
  },
})
export default class Test extends Vue {
  cathegories = [];
  category = 1;
  nor = 0;
  start = 0;
  end = 2;
  id?: number | null = null;
  url = "https://afq-t32f44ncfa-ey.a.run.app/items/";
  results: any[] = [];
  message = "";
  $router: any;
  async mounted() {
    // console.log('TEST: ');

    // const filters: string[] = [
    //   `{"_or":[{"end_date":{"_null":true}},{"end_date":{"_gt":"$NOW"}}]}`,
    //   `{"_or":[{"min_children_count":{"_null":true}}, {"min_children_count":{"_lte":3}}]}`,
    //   `{"_or":[{"max_children_count":{"_null":true}}, {"max_children_count":{"_gte":3}}]}`,
    //   `{"_or":[{"min_rent":{"_null":false}},{"min_rent":{"_lte":650}}]}`,
    //   `{"_or":[{"max_rent":{"_null":false}},{"max_rent":{"_gte":650}}]}`,
    //   `{"_or":[{"min_income":{"_null":false}},{"min_income":{"_lte":3004}}]}`,
    //   `{"_or":[{"max_income":{"_null":false}},{"max_income":{"_gte":3004}}]}`,
    //   `{"is_pregnant":{"_eq":false}}`,
    //   `{"category":{"_eq":6}}`,
    // ];
    // const a = await axios.get(
    //   this.url +
    //     `result?fields=*,has_job.joblist_id,has_mariage_type.*,type.*&offset=0&limit=100&filter={"_and":[${filters.join(
    //       ","
    //     )}]}`
    // );
    // console.log('->',a.data.data.length);
    // a.data.data.forEach((e: any) => {
    //   console.log(e.min_children_count, e.max_children_count);
    // });

    this.cathegories = (await axios.get(this.url + "category")).data.data;
    await this.reloadCard();
  }
  async reloadCard() {
    const request =
      this.url +
      `result?fields=*,has_job.joblist_id,has_mariage_type.*,type.*&offset=${this.start}&limit=${this.end}&filter={"category": {"_eq": ${this.category}}}`;
    let results = (await axios.get(request)).data.data;
    if (results[0]) {
      this.results = results;
    } else {
      this.results = [];
    }
    this.nor = (
      await axios.get(
        this.url +
          `result?fields=*&limit=0&meta=filter_count&filter={"category": {"_eq": ${this.category}}}`
      )
    ).data.meta.filter_count;
  }
  async reload() {
    this.message = "";
    await this.reloadCard();
  }
}
</script>
<style lang="scss">
#test {
  padding-top: 120px;
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  main {
    width: 100vw;
    justify-content: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
  }
  nav {
  }
}
</style>
