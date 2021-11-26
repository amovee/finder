<template>
  <div class="dots">
    <div class="row" v-for="i in height" :key="i">
      <div class="column" v-for="j in width" :key="j" >
      <span class="dot" :class="!condition(i,j)?'hidden':''"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Dots extends Vue {
  @Prop() width?: number;
  @Prop() height?: number;
  @Prop() top?: boolean;
  @Prop() left?: boolean;
  border = 2;
  
  condition(i: number, j: number): boolean {
    if(this.top && this.left) {
      return i<=this.border || j<=this.border;
    } else if(this.top && !this.left) {
      return i<=this.border || j>5;
    } else if(!this.top && this.left) {
      return i>4 || j<=this.border;
    } else {
      return i>4 || j>5;
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dots {
  width: 100px;
  height: 84px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .row {
    display: flex;
    flex-direction: row;
    gap: 12px;
    width: 100px;
    height: 4px;
  }
}
.dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: var(--accent-red);
  &.hidden {
    opacity: 0;
  }
}
</style>
