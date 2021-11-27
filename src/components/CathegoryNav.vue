<template>
  <div
    class="cathegory-nav"
    ref="nav"
    :class="large ? 'large' : ''"
    v-if="cathegories"
  >
    <button
      v-if="cathegories[active]"
      class="btn cathegory active"
      :class="open ? 'open' : ''"
      @click="open = !open"
    >
      {{ cathegories[active].name }}
      <span>{{ getNor(cathegories[active]) }}</span>
      <img src="@/assets/expand_down.svg" />
    </button>

    <transition name="fade">
      <div class="button-list" v-if="open || large">
        <button
          class="btn cathegory"
          v-for="(cathegory, i) in cathegories"
          :key="i"
          :class="i == active ? 'active' : ''"
          @click="onChange(i)"
        >
          {{ cathegory.name }} <span>{{ getNor(cathegory) }}</span>
        </button>
      </div>
    </transition>
    <Dots :width="7" :height="6" :top="true" :left="true" />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Dots from "@/components/Dots.vue";
import { Cathegory } from "@/shared/cathegory";

@Component({
  components: {
    Dots,
  },
})
export default class CathegoryNav extends Vue {
  active = 0;
  open = false;
  large = false;
  cathegories: Cathegory[] = [];
  $refs: any;

  getNor(cathegory: Cathegory): string {
    if (cathegory.allreadyRequested) {
      if (cathegory.content.length > 99) {
        return "99+";
      }
      return cathegory.content.length + "";
    }
    return "";
  }

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, true);
    this.cathegories = Object.values(this.$store.getters.cathegories);
    this.cathegories = this.cathegories.sort(
      (a: any, b: any) => a.sort - b.sort
    );
  }
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize, true); 
  }
  onResize() {
    this.large = this.$refs.nav.clientWidth >= 1200;
  }
  @Emit("change")
  onChange(index: number) {
    this.active = index;
    this.open = false;
    return this.cathegories[index].id;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cathegory-nav {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  color: var(--dark-primary);
  .dots {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:not(.large) {
    .button-list {
      position: absolute;
      top: 51px;
      width: 350px; //TODO: 250px
      left: calc(50% - 350px / 2);
      background: var(--light-green);
      z-index: 100;
      .btn {
        width: 100%;
        border-radius: 0;
        justify-content: center;
        color: var(--dark-primary);
      }
    }
  }
  &.large {
    padding-top: 2rem;
    padding-left: 2rem;
    margin-bottom: 4rem;
    > .btn.cathegory {
      display: none;
    }
    .dots {
      display: inherit;
    }
    .button-list {
      background: var(--light-green);
      // position: relative;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 24px;
      padding: 24px 2rem;
      flex-wrap: wrap;
    }
  }
  .btn.cathegory {
    display: flex;
    align-items: center;
    color: var(--dark-primary);

    gap: 8px;
    padding: 12px 12px 11px 28px;
    font-size: 18px;
    border: 2px solid #fff;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      width: 24px;
      height: 24px;
      border-radius: 12px;
      background: var(--accent-red);
      color: var(--bright-primary);
      font-size: 12px;
    }
    &.active {
      border: 2px solid var(--accent-red);
      box-shadow: 0px 4px 0px rgba(250, 109, 90, 0.2);
      span {
        background: var(--dark-primary);
      }
    }

    img {
      transform: rotate(-180deg);
      transition: 200ms transform ease;
    }
    &.open img {
      transform: rotate(0deg);
    }
  }
}
</style>
