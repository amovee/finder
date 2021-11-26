<template>
  <div class="housing-situation">
    <h2>Wohnsituation</h2>
    <form>
      <div class="group">
        <h3>Wo wohnst du?</h3>
        <input
          type="text"
          id="place"
          name="place"
          placeholder="PLZ"
          v-model="value.place"
          @change="onChange"
          :class="value.place != null ? 'active' : ''"
          pattern="[0-9]{5}"
        />
      </div>

      <transition name="fade">
        <div class="group" v-if="value.place != null">
          <h3>Wie wohnst du?</h3>
          <div class="group horizontal">
            <div class="radio">
              <input
                type="radio"
                id="housing-situation-type_0"
                value="0"
                name="housing-situation-type"
                v-model.number="value.housingSituationType"
                @change="onChange"
              />
              <label for="housing-situation-type_0">Miete</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="housing-situation-type_1"
                value="1"
                name="housing-situation-type"
                v-model.number="value.housingSituationType"
                @change="onChange"
              />
              <label for="housing-situation-type_1">Eigentum</label>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="group" v-if="value.housingSituationType != null">
          <h3>
            {{
              value.housingSituationType == 0
                ? "Wie hoch ist deine Miete (ohne Nebenkosten)?"
                : "Wie hoch ist deine monatliche Kreditrate für Haus oder Wohnung?"
            }}
          </h3>
          <input
            type="number"
            id="costs"
            name="costs"
            v-model.number="value.costs"
            :class="value.costs != null ? 'active' : ''"
            @change="onChange"
          />
        </div>
      </transition>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Dots from "@/components/Dots.vue"; // @ is an alias to /src
import { HousingSituationStatus } from "@/shared/status";

@Component({
  components: {
    Dots,
  },
})
export default class HousingSituation extends Vue {
  @Prop() value?: HousingSituationStatus;
  @Emit("change")
  onChange(): { key: string; value: any } {
    if (this.value != undefined) {
      this.value.updateValidity();
    }
    return { key: "housingSituation", value: this.value };
  }
}
</script>