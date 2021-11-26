<template>
  <div class="information-field">
    <div class="content">
      <p>
        {{ text }}
      </p>
    </div>
    <Dots :width="7" :height="6" :top="false" :left="false"/>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Dots from "@/components/Dots.vue";

@Component({
  components: {
    Dots,
  },
})
export default class Aside extends Vue {
  @Prop() text?: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.information-field {
  // display: none;
  position: relative;
  box-sizing: border-box;
  padding: 0 0 2rem 2rem;
  max-width: 400px;
  margin-bottom: 3rem;
  .content {
    padding: 2rem;
    background: var(--dark-primary);
    p {
      color: white;
      margin: 0;
      font-size: 1rem;
      line-height: 24px;
    }
  }
  .dots {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
