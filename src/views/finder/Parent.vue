<template>
  <div class="parent">
    <h2>Wer bist du?</h2>
    <form>
      <div class="group">
        <h3>Wie ist dein Geschlecht?</h3>
        <div class="group horizontal">
          <div class="radio">
            <input
              type="radio"
              id="radio_0_0"
              :value="'female'"
              name="gender"
              v-model="value.gender"
              @change="onChange"
            />
            <label for="radio_0_0">Weiblich</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="radio_0_1"
              :value="'male'"
              name="gender"
              v-model="value.gender"
              @change="onChange"
            />
            <label for="radio_0_1">Männlich</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="radio_0_2"
              :value="'diverse'"
              name="gender"
              v-model="value.gender"
              @change="onChange"
            />
            <label for="radio_0_2">Divers</label>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="group" v-if="value.gender != null">
          <h3>Wann ist dein Geburtstag?</h3>
          <input
            type="date"
            :id="'date_0'"
            placeholder="tt.mm.jjjj"
            v-model="value.birthDate"
            :class="value.birthDate != null ? 'active' : ''"
            @change="onChange"
          />
        </div>
      </transition>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Dots from "@/components/Dots.vue";
import { ParentStatus } from "@/shared/status";

@Component({
  components: {
    Dots,
  },
})
export default class Parent extends Vue {
  @Prop() value?: ParentStatus;

  @Emit("change")
  onChange(): { key: string; value: any } {
    if (this.value != undefined) {
      this.value.updateValidity();
    }
    return { key: "parent", value: this.value };
  }
}
</script>
