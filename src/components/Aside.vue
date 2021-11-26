<template>
  <aside :class="open ? 'open' : ''">
    <div class="logo">amuvee<span>.</span></div>
    <ul>
      <li
        class="row"
        v-for="(page, i) in pages"
        :key="i"
        :class="type(i, page)"
      >
        <a @click="onChange(i)" v-if="type(i, page) != 'unvisited'">
          <img
            src="@/assets/arrow_forward.svg"
            v-if="type(i, page) == 'current'"
          />
          <img src="@/assets/done.svg" v-if="type(i, page) == 'visited'" />
          {{ page.name }}
        </a>
        <a v-if="type(i, page) == 'unvisited'" class="unvisited">
          <div class="dot">
            <span></span>
          </div>
          {{ page.name }}
        </a>
      </li>
    </ul>
    <p>Fragen oder Probleme? <router-link to="/">Hilfe</router-link></p>
  </aside>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class Aside extends Vue {
  @Prop() index?: number;
  @Prop() pages?: { key: string; name: string }[];
  @Prop() value: any;
  @Prop() open?: boolean;
  type(i: number, page: { key: string; name: string }): string {
    if (
      this.pages != undefined &&
      this.index != undefined &&
      this.value != undefined
    ) {
      if (this.index == i) {
        return "current";
      }
      if (this.value[page.key].isValid) {
        return "visited";
      } else if (i > this.index) {
        return "unvisited";
      }
    }
    return "current";
  }
  @Emit("change")
  onChange(i: number): number {
    return i;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
aside {
  
  background: var(--bright-primary);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 40px;
  z-index: 10;
  @media (min-width: 1024px) {
      padding: 3rem 80px;
  }
  
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 2rem;
    right: 0;
    width: 2px;
    height: calc(100vh - 4rem);
    background: var(--light-creme);
  }
  .logo {
    font-family: "Playfair Display";
    font-size: 40px;
    font-weight: 700;

    @media (min-width: 1024px) {
      margin-bottom: 53px;
    }
    span {
      color: var(--accent-red);
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    gap: 24px;
    li {
      list-style: none;
      img,
      .dot {
        display: inline-block;
      }
      .dot {
        position: relative;
        width: 24px;
        height: 24px;
        padding: 9px;
        box-sizing: border-box;
        span {
          position: absolute;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          outline: 2px solid var(--text-inactive);
        }
      }
      a {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        &.unvisited {
          cursor: default;
        }
        gap: 12px;
        text-decoration: none;
        font-size: 18px;
        font-weight: 700;
        color: var(--accent-green);
      }
      &.current a {
        color: var(--accent-red);
      }
      &.unvisited a {
        color: var(--text-inactive);
        font-weight: 400;
      }
    }
  }
  p {
    font-size: 1rem;
    font-weight: 700;
    color: var(--dark-primary);
    a {
      color: var(--accent-red);
    }
  }
}
</style>
