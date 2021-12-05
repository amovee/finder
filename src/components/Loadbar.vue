<template>
  <div class="loadbar">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Loadbar extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loadbar {
  z-index: 100;
  display: block;
  position: relative;
  width: 30px;
  height: 30px;
  .circle {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: circleAnimation 3s infinite linear;
      background: var(--accent-red);
    &:nth-of-type(1) {
      background: var(--accent-green);
      animation-delay: -2s;
    }
    &:nth-of-type(2) {
      background: var(--dark-primary);
      animation-delay: -1s;
    }
  }
  @keyframes circleAnimation {
    0% {
      transform: rotate(0deg) translate(64%)scale(100%);
    }
    25% {
      transform: rotate(90deg) translate(70%)scale(120%);
    }
    50%{
      transform: rotate(180deg) translate(64%)scale(100%);
    }
    75%{
      transform: rotate(270deg) translate(50%)scale(60%);
    }
    100% {
      transform: rotate(360deg) translate(64%)scale(100%);
    }
  }
}
</style>
