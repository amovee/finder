<template>
  <div class="working">
    <h2>Beschäftigung</h2>
    <form>
      <div class="group">
        <h3>Wie ist deine berufliche Situation?</h3>
        <div class="group horizontal">
          <div class="radio">
            <input
              type="radio"
              id="situation_0"
              value="0"
              name="situation"
              v-model.number="value.situation"
              @change="onChange"
            />
            <label for="situation_0">Berufstätig</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="situation_1"
              value="1"
              name="situation"
              v-model.number="value.situation"
              @change="onChange"
            />
            <label for="situation_1">In Ausbildung</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="situation_2"
              value="2"
              name="situation"
              v-model.number="value.situation"
              @change="onChange"
            />
            <label for="situation_2">Sozialleistungen</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="situation_3"
              value="3"
              name="situation"
              v-model.number="value.situation"
              @change="onChange"
            />
            <label for="situation_3">Arbeitslosigkeit</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="situation_4"
              value="4"
              name="situation"
              v-model.number="value.situation"
              @change="onChange"
            />
            <label for="situation_4">Ohne Tätigkeit</label>
          </div>
        </div>
      </div>

      <transition name="fade">
        <div class="group" v-if="value.situation == 0">
          <h3>Wie bist du beschäftigt?</h3>
          <div class="group horizontal">
            <div class="radio">
              <input
                type="radio"
                id="jobType_0"
                value="0"
                name="jobType"
                v-model.number="value.jobType"
                @change="onChange"
              />
              <label for="jobType_0">Vollzeit</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="jobType_1"
                value="1"
                name="jobType"
                v-model.number="value.jobType"
                @change="onChange"
              />
              <label for="jobType_1">Teilzeit</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="jobType_2"
                value="2"
                name="jobType"
                v-model.number="value.jobType"
                @change="onChange"
              />
              <label for="jobType_2">Geringfügig (450 EUR)</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="jobType_3"
                value="3"
                name="jobType"
                v-model.number="value.jobType"
                @change="onChange"
              />
              <label for="jobType_3">Selbstständig</label>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="group" v-if="value.situation == 0 && value.jobType == 1">
          <h3>Wie viele Stunden arbeitest du in der Woche?</h3>
          <div class="group horizontal">
            <div class="radio">
              <input
                type="radio"
                id="partTimeType_0"
                value="0"
                name="partTimeType"
                v-model.number="value.partTimeType"
                @change="onChange"
              />
              <label for="partTimeType_0">unter 30 Stunden</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="partTimeType_1"
                value="1"
                name="partTimeType"
                v-model.number="value.partTimeType"
                @change="onChange"
              />
              <label for="partTimeType_1">30 oder mehr Stunden</label>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="group" v-if="value.situation == 1">
          <h3>Welche berufliche education absolvierst du?</h3>
          <div class="group horizontal">
            <div class="radio">
              <input
                type="radio"
                id="education_0"
                value="0"
                name="education"
                v-model.number="value.education"
                @change="onChange"
              />
              <label for="education_0">(Duales) Studium</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="education_1"
                value="1"
                name="education"
                v-model.number="value.education"
                @change="onChange"
              />
              <label for="education_1">Ausbildung / Lehre</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="education_2"
                value="2"
                name="education"
                v-model.number="value.education"
                @change="onChange"
              />
              <label for="education_2">Freiwilliges Soziales Jahr</label>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="group" v-if="value.situation == 2">
          <h3>Welche Leistungen beziehst du?</h3>
          <div class="group horizontal">
            <div class="radio">
              <input
                type="radio"
                id="socialBenefitType_0"
                value="0"
                name="socialBenefitType"
                v-model.number="value.socialBenefitType"
                @change="onChange"
              />
              <label for="socialBenefitType_0">Sozialgeld</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="socialBenefitType_1"
                value="1"
                name="socialBenefitType"
                v-model.number="value.socialBenefitType"
                @change="onChange"
              />
              <label for="socialBenefitType_1">Sozialhilfe</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="socialBenefitType_2"
                value="2"
                name="socialBenefitType"
                v-model.number="value.socialBenefitType"
                @change="onChange"
              />
              <label for="socialBenefitType_2">ALG II</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="socialBenefitType_3"
                value="3"
                name="socialBenefitType"
                v-model.number="value.socialBenefitType"
                @change="onChange"
              />
              <label for="socialBenefitType_3">ALG II-Aufstocker</label>
            </div>
          </div>
        </div>
      </transition>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Dots from "@/components/Dots.vue"; // @ is an alias to /src
import { WorkingStatus } from "@/shared/status";

@Component({
  components: {
    Dots,
  },
})
export default class Working extends Vue {
  @Prop() value?: WorkingStatus;
  @Emit("change")
  onChange(): { key: string; value: any } {    
    if (this.value != undefined) {
      this.value.updateValidity();
    }
    return { key: "insurance", value: this.value };
  }
}
</script>