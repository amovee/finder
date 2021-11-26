<template>
  <div class="insurance">
    <h2>Krankenversicherung</h2>
    <form>
      <div class="group">
        <h3>Wie bist du versichert?</h3>
        <div class="group horizontal">
          <div class="radio">
            <input
              type="radio"
              id="type_0"
              value="0"
              name="type"
              v-model.number="value.type"
              @change="onChange"
            />
            <label for="type_0">Gesetzlich</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="type_1"
              value="1"
              name="type"
              v-model.number="value.type"
              @change="onChange"
            />
            <label for="type_1">Privat</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="type_2"
              value="2"
              name="type"
              v-model.number="value.type"
              @change="onChange"
            />
            <label for="type_2">Gar nicht</label>
          </div>
        </div>
      </div>

      <transition name="fade">
        <div class="group" v-if="value.type == 0">
          <h3>Bei welcher Versicherung bist du versichert?</h3>
          <div class="group horizontal">
            <div class="radio">
              <input
                type="radio"
                id="public_0"
                value="0"
                name="public"
                v-model.number="value.publicInsurances"
                @change="onChange"
              />
              <label for="public_0">AOK</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="public_1"
                value="1"
                name="public"
                v-model.number="value.publicInsurances"
                @change="onChange"
              />
              <label for="public_1">Techniker Krankenkasse (TK)</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="public_2"
                value="2"
                name="public"
                v-model.number="value.publicInsurances"
                @change="onChange"
              />
              <label for="public_2">Barmer GEK</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="public_3"
                value="3"
                name="public"
                v-model.number="value.publicInsurances"
                @change="onChange"
              />
              <label for="public_3">DAK</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="public_4"
                value="4"
                name="public"
                v-model.number="value.publicInsurances"
                @change="onChange"
              />
              <label for="public_4">Sonstige</label>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="group" v-if="value.type == 1">
          <h3>Bei welcher Versicherung bist du versichert?</h3>
          <div class="group horizontal">
            <div class="radio">
              <input
                type="radio"
                id="private_0"
                value="0"
                name="private"
                v-model.number="value.privateInsurances"
                @change="onChange"
              />
              <label for="private_0">debeka</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="private_1"
                value="1"
                name="private"
                v-model.number="value.privateInsurances"
                @change="onChange"
              />
              <label for="private_1">DKV (Viktoria)</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="private_2"
                value="2"
                name="private"
                v-model.number="value.privateInsurances"
                @change="onChange"
              />
              <label for="private_2">Allianz private Krankenversicherung</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="private_3"
                value="3"
                name="private"
                v-model.number="value.privateInsurances"
                @change="onChange"
              />
              <label for="private_3">AXA (Colonia, DBV Winterthur)</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="private_4"
                value="4"
                name="private"
                v-model.number="value.privateInsurances"
                @change="onChange"
              />
              <label for="private_4">Sonstige</label>
            </div>
          </div>
        </div>
      </transition>

      <!-- <transition name="fade">
        <div class="group" v-if="value.type == 2">
          <p>Text</p>
        </div>
      </transition> -->
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Dots from "@/components/Dots.vue"; // @ is an alias to /src
import { InsuranceStatus } from "@/shared/status";

@Component({
  components: {
    Dots,
  },
})
export default class Insurance extends Vue {
  @Prop() value?: InsuranceStatus;
  @Emit("change")
  onChange(): { key: string; value: any } {
    if (this.value != undefined) {
      this.value.updateValidity();
    }
    return { key: "insurance", value: this.value };
  }
}
</script>