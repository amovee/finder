<template>
  <div class="alert">
    <OverlayScrollbarsComponent class="view" :extensions="[]">
      <div class="alert-content">
        <slot></slot>
      </div>
    </OverlayScrollbarsComponent>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import OverlayScrollbars from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

@Component({
  components: {
    OverlayScrollbarsComponent,
  },
})
export default class Alert extends Vue {
  beforeDestroy() {
    let a: any = document.getElementById("scroll");
    var instance = OverlayScrollbars(a, {});
    instance.options("overflowBehavior.y", "scroll");
    instance.options("overflowBehavior.x", "scroll");
  }
  mounted() {
    let a: any = document.getElementById("scroll");
    var instance = OverlayScrollbars(a, {});
    instance.options("overflowBehavior.y", "hidden");
    instance.options("overflowBehavior.x", "hidden");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.alert {
  .alert-content {
    background: rgb(0, 111, 128, 0.5);
    padding: 0rem;
    box-sizing: border-box;
    min-height: 100vh;
    width: 100vw;
    
    @media (min-width: 800px) {
    padding: 3rem;
    }
  }
}
</style>
