<template>
  <div class="life-situation">
    <h2>Lebenssituation</h2>
    <form>
      <div class="group">
        <h3>Wie lebst du?</h3>
        <div class="group horizontal">
          <div class="radio">
            <input
              type="radio"
              id="life-situation-basic_0"
              value="0"
              name="life-situation-basic"
              v-model.number="value.lifeSituationBasic"
              @change="onChange"
            />
            <label for="life-situation-basic_0">Alleinstehend</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="life-situation-basic_1"
              value="1"
              name="life-situation-basic"
              v-model.number="value.lifeSituationBasic"
              @change="onChange"
            />
            <label for="life-situation-basic_1">In Trennung</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="life-situation-basic_2"
              value="2"
              name="life-situation-basic"
              v-model.number="value.lifeSituationBasic"
              @change="onChange"
            />
            <label for="life-situation-basic_2">Geschieden</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="life-situation-basic_3"
              value="3"
              name="life-situation-basic"
              v-model.number="value.lifeSituationBasic"
              @change="onChange"
            />
            <label for="life-situation-basic_3">Verwitwet</label>
          </div>
        </div>
      </div>

      <transition name="fade">
        <div class="group" v-if="value.lifeSituationBasic == 1">
          <h3>In Trennung ...</h3>
          <div class="group horizontal">
            <div class="radio">
              <input
                type="radio"
                id="life-situation-divorce_0"
                value="0"
                name="life-situation-divorce"
                v-model.number="value.lifeSituationDivorce"
                @change="onChange"
              />
              <label for="life-situation-divorce_0">Verheiratet</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="life-situation-divorce_1"
                value="1"
                name="life-situation-divorce"
                v-model.number="value.lifeSituationDivorce"
                @change="onChange"
              />
              <label for="life-situation-divorce_1">Verpartnert</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="life-situation-divorce_2"
                value="2"
                name="life-situation-divorce"
                v-model.number="value.lifeSituationDivorce"
                @change="onChange"
              />
              <label for="life-situation-divorce_2">Liiert</label>
            </div>
          </div>
        </div>
      </transition>
      <div class="group">
        <h3>
          Hast du Gewalterfahrungen in deiner Beziehunggemacht, sei es
          psychisch, physisch oder finanziell?
        </h3>
        <div class="group horizontal">
          <div class="radio">
            <input
              type="radio"
              id="violence_0"
              :value="true"
              name="violence"
              v-model="value.violence"
              @change="onChange"
            />
            <label for="violence_0">Ja</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="violence_1"
              :value="false"
              name="violence"
              v-model="value.violence"
              @change="onChange"
            />
            <label for="violence_1">Nein</label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Dots from "@/components/Dots.vue"; // @ is an alias to /src
import { LifeSituationStatus } from "@/shared/status";

@Component({
  components: {
    Dots,
  },
})
export default class LifeSituation extends Vue {
  @Prop() value?: LifeSituationStatus;

  @Emit("change")
  onChange(): { key: string; value: any } {
    if (this.value != undefined) {
      this.value.updateValidity();
    }
    return { key: "lifeSituation", value: this.value };
  }
}
</script>