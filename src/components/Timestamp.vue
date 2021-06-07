<template>
  <h4 class="timestamp">
    <div class="start" v-if="start_date != null">
      vom <span class="date">{{ timeFormatting(start_date) }}</span>
    </div>
    <div class="end" v-if="end_date != null">
      bis zum <span class="date">{{ timeFormatting(end_date) }}</span>
    </div>
  </h4>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class Timestamp extends Vue {
  @Prop() public start_date!: any;
  @Prop() public end_date!: any;
  timeFormatting(date: string): string {
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
.timestamp {
  font-size: 0.75rem;
  text-align: center;
}
</style>
