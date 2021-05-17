<template>
  <div class="home">
    <finder/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Finder from '@/components/Finder.vue'; // @ is an alias to /src

@Component({
  components: {
    Finder,
  },
})
export default class Home extends Vue {
}
</script>
<style lang="scss">
#home {
  // position: absolute;
  // display: block;
}
</style>
