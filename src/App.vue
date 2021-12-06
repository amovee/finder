<template>
  <div id="app">
    <OverlayScrollbarsComponent class="view" id="scroll" :extensions="[]">
      <router-view />
    </OverlayScrollbarsComponent>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

@Component({
  components: {
    OverlayScrollbarsComponent,
  },
})
export default class App extends Vue {
  mounted() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }
}
</script>
<style lang="scss">
@import "./normalize.scss";
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700&display=swap");
body {
  .view {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
  font-family: "Nunito Sans";
  margin: 0;
  --bright-primary: #fff;
  --dark-primary: #092b5c;
  --accent-red: #fa8373;
  --accent-green: #009eb3;
  --accent-yellow: #fabd5a;
  --accent-purple: #3d6adb;

  --text-inactive: #78818f;
  --body-text: #1d2e47;

  --light-creme: #f7f6f2;
  --light-green: #e4f2f2;
  --light-red: #fadbd7;
  --light-yellow: #faefd0;
  --dark-cream: #e6e4e1;
  --dark-green: #4b99a3;
  --dark-red: #fa8373;
  --dark-yellow: #fac673;
  --gray: #aaadb2;

  color: var(--dark-primary);

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
