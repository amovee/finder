<template>
  <div
    class="card"
    @click="click(false)"
    :class="config.isFavorite ? 'fav' : ''"
  >
    <button class="btn none" @click="click(true)">
      <Heart :class="config.isFavorite ? 'fav' : ''" />
      <!-- <img v-if="config.isFavorite" src="@/assets/favorite-active.svg" /> -->
      <!-- <img v-if="!config.isFavorite" src="@/assets/favorite-inactive.svg" /> -->
    </button>
    <h5>{{ config.name }}</h5>
    <div class="type" v-if="config.type">{{ config.type.name }}</div>
    <div class="date" v-if="date">
      <img src="@/assets/date.svg" /> {{ date }}
    </div>
    <p v-html="config.short_description" />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Heart from "./Heart.vue";

@Component({
  components: { Heart },
})
export default class Card extends Vue {
  @Prop() config?: any;

  iconClicked = false;
  click(icon: boolean) {
    if (icon) {
      this.fav();
      this.iconClicked = true;
    } else {
      if (!this.iconClicked) {
        this.open();
      }
      this.iconClicked = false;
    }
  }
  get date() {
    let start, end;
    if (
      this.config.start_date &&
      new Date(this.config.start_date).getTime() > Date.now()
    ) {
      start = {
        day: new Date(this.config.start_date).getMonth(),
        month: new Date(this.config.start_date).getDay(),
        year: new Date(this.config.start_date).getFullYear(),
      };
    }
    if (this.config.end_date) {
      end = {
        day: new Date(this.config.end_date).getMonth(),
        month: new Date(this.config.end_date).getDay(),
        year: new Date(this.config.end_date).getFullYear(),
      };
    }
    const formatter = (date: any) =>
      (date.day < 10 ? "0" + date.day : date.day) +
      "." +
      (date.month < 10 ? "0" + date.month : date.month);
    if (start && end) {
      if (start.year == end.year) {
        return formatter(start) + " - " + formatter(end);
      }
      return formatter(start) + start.year + " - " + formatter(end) + end.year;
    } else if (!start && end) {
      return "bis zum " + formatter(end) + "." + end.year;
    } else if (start && !end) {
      return "ab dem " + formatter(start) + "." + start.year;
    }
    return null;
  }
  @Emit("open")
  open() {
    return;
  }
  @Emit("fav")
  fav(): { id: number; activ: boolean } {
    this.config.isFavorite = !this.config.isFavorite;
    return { id: this.config.id, activ: this.config.isFavorite };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  position: relative;
  cursor: pointer;
  width: 300px;
  height: 350px;

  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;

  /* accent green */
  border: 1px solid #009eb3;
  box-sizing: border-box;
  transition: 500ms border ease, 500ms outline ease, 500ms padding ease;
  padding: 28px 1rem;
  &.fav {
    border: 4px solid var(--light-red);
    outline: 1px solid var(--dark-red);
    padding: calc(28px - 3px) calc(1rem - 3px);
    h5 {
      color: var(--dark-red);
    }
  }

  h5 {
    font-family: "Playfair Display";
    color: var(--dark-primary);
    font-size: 24px;
    font-weight: 400;
    margin: 0 0 8px 0;
    line-height: 2rem;
    transition: 500ms color ease;
  }
  .type {
    /* background light green */
    background: #e4f2f2;
    border-radius: 2px;

    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    color: #008799;
    margin-bottom: 8px;

    /* identical to box height */
    text-align: center;
    letter-spacing: 0.02em;
    padding: 4px 12px;
  }
  .date {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    /* background light green */
    background: rgba(250, 219, 215, 0.5);
    border-radius: 2px;

    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    color: var(--accent-red);
    margin-bottom: 8px;

    /* identical to box height */
    text-align: center;
    letter-spacing: 0.02em;
    padding: 5px 12px;
  }
  p {
    font-size: 1rem;
    line-height: 24px;
    margin: 8px 0;
    color: var(--body-text);
    font-weight: 400;
  }
  .btn.none {
    outline: none;
    background: none;
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
  }
}
</style>
