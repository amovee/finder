<template>
  <div class="result-box">
    <header>
      <h2>{{ result.name }}</h2>
      <span class="type">{{ result.type.name }}</span>

      <Timestamp
        v-if="result.start_date != null || result.end_date != null"
        class="time"
        :start_date="result.start_date"
        :end_date="result.end_date"
      />
    </header>
    <div class="short_description" v-html="result.short_description"></div>
    <!-- {{result}} -->
    <button @click="open">Details</button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Timestamp from "./Timestamp.vue";

@Component({
  components: {
    Timestamp,
  },
})
export default class ResultBox extends Vue {
  @Prop() private result!: any;
  @Emit("open")
  open() {
    return this.result;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.result-box {
  background-color: var(--light-orange);
  padding: 0.5rem;
  box-sizing: border-box;
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 800px) {
    width: calc(50% - 0.5rem);
    padding: 1rem;
  }
  @media (min-width: 1300px) {
    width: calc(33% - 0.6rem);
    padding: 1rem;
  }
  h2 {
    font-size: 1rem;
    // font-size: 1.25rem;
    color: var(--orange);
    margin: 0 0 0.5rem 0;
    width: 100%;
  }
  .type {
    font-size: 0.75rem;
    font-weight: bold;
    display: inherit;
    text-align: center;
  }
  button {
    width: 200px;
  }
  a {
    color: var(--orange);
  }
  .short_description {
    font-size: 1rem;
    line-height: 1.25rem;
    @media (min-width: 1000px) {
      font-size: 0.75rem;
    }
  }
}
</style>
