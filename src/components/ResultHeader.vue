<template>
  <header class="result-header">      
    <a class="logo" href="https://amuvee.de/">amuvee<span>.</span></a>
    <nav :class="min ? 'min' : ''">
      <a class="menu-btn" @click="min = !min"
        ><img src="@/assets/menu.svg"
      /></a>
      <router-link class="in-menu" :to="{ path: url }"
        ><img src="@/assets/edit.svg" /><span class="text"
          >Angaben ändern</span
        ></router-link
      >
      <a class="in-menu" @click="openSharingMenu()"
        ><img src="@/assets/bookmark.svg" /><span class="text"
          >Resultate teilen</span
        ></a
      >
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class ResultHeader extends Vue {
  public url = "./";
  public min = true;

  constructor() {
    super();
    if (this.$store.getters.answers) {
      this.url +=
        "?answers=" + JSON.stringify(this.$store.getters.answers.toJson());
    }
  }
  @Emit("openSharingMenu")
  openSharingMenu() {
    this.min = true;
    return;
  }
}
</script>

<style scoped lang="scss">
header.result-header {
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
  .logo {
    font-family: "Playfair Display";
    text-decoration: none;
    color: var(--dark-primary);
    font-size: 40px;
    font-weight: 700;
    padding-bottom: 8px;
    span {
      color: var(--accent-red);
    }
  }
  nav {
    z-index: 1;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: end;
    overflow-y: hidden;
    height: calc(118px * 3);
    transition: 500ms height ease;

    @media (min-width: 600px) {
      position: inherit;
      flex-direction: row;
        min-height: 0;
        height: inherit !important;
        gap: 3rem;
      a.in-menu {
        padding: 0;
        min-height: 2rem;
      }
      .menu-btn {
        display: none;
      }
    }
    &.min {
      height: 118px;
    }
    a {
      padding: 12px;
      min-height: 118px;
      box-sizing: border-box;
      padding: 2rem 3rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      gap: 8px;
      color: var(--dark-primary);
      text-decoration: none;
      &.in-menu {
        background: white;
      }
    }
  }
  // nav {
  //   display: flex;
  //   flex-direction: row;
  //   align-items: center;
  //   gap: 4rem;
  //   a {
  //     display: flex;
  //     flex-direction: row;
  //     align-items: center;
  //     cursor: pointer;
  //     gap: 8px;
  //     &.in-menu {
  //       color: var(--dark-primary);
  //       text-decoration: none;
  //     }
  //     &.menu-btn {
  //       display: none;
  //     }
  //     @media (max-width: 800px) {
  //       &.menu-btn {
  //         display: inherit;
  //       }
  //       &.in-menu {
  //         display: none;
  //       }
  //     }
  //   }
  // }
}
</style>
