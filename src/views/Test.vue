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
      <Card
        v-for="(result, i) in results"
        :key="i + 100"
        :config="result"
        @open="activeResult = i"
      />
      <transition name="fade">
        <div
          id="full-screen-result-card"
          v-if="activeResult != null"
        >
          <Alert>
            <ResultCard
              v-if="activeResult != null"
              :content="results[activeResult]"
              @close="activeResult = null"
              class="full-size"
            />
          </Alert>
        </div>
      </transition>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import ResultCard from '@/components/ResultCard.vue'
import axios from 'axios'
import Alert from "@/components/Alert.vue";

@Component({
  components: {
    Card,
    ResultCard,
    Alert
  },
})
export default class Test extends Vue {
  cathegories = []
  category = 1
  nor = 0
  start = 0
  end = 2
  activeResult: any = null
  id?: number | null = null
  url = 'https://afq-t32f44ncfa-ey.a.run.app/items/'
  results: any[] = []
  message = ''
  $router: any
  async mounted() {
    this.cathegories = (await axios.get(this.url + 'category')).data.data
    await this.reloadCard()
  }
  async reloadCard() {
    const request =
      this.url +
      `result?fields=*,type.*&offset=${this.start}&limit=${this.end}&filter={"category": {"_eq": ${this.category}}}`
    let results = (await axios.get(request)).data.data
    if (results[0]) {
      this.results = results
      this.results = results.map((result: any) => {
        result.actions = [];
        result.weight = result.type.weight + result.isFavorite * 1000;
        return result;
      });
    } else {
      this.results = []
    }
    this.nor = (
      await axios.get(
        this.url +
          `result?fields=*&limit=0&meta=filter_count&filter={"category": {"_eq": ${this.category}}}`,
      )
    ).data.meta.filter_count
  }
  async reload() {
    this.message = ''
    await this.reloadCard()
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
  #full-screen-result-card {
      z-index: 200;
      position: fixed;
      top: 0;
      left: 0;
      // overflow-y: hi;
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
      width: 100vw;
      box-sizing: border-box;
    }
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
