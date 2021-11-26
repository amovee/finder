<template>
  <div class="income">
    <h2>Einkommen</h2>
    <form>
      <div class="group">
        <h3>Wie hoch ist dein monatliches Bruttoeinkommen?</h3>
        <input
          type="number"
          placeholder="in EUR"
          id="gross"
          name="gross"
          v-model.number="value.gross"
          :class="value.gross != null ? 'active' : ''"
          @change="onChange"
        />
      </div>
      <div class="group">
        <h3>Beziehst du Erwerbsminderungs- oder Berufsunfähigkeitsrenten?</h3>
        <div class="group horizontal">
          <div class="radio">
            <input
              type="radio"
              id="disability_pension_exists_0"
              :value="true"
              name="disability_pension_exists"
              v-model="value.disabilityPensionExists"
              @change="onChange"
            />
            <label for="disability_pension_exists_0">Ja</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="disability_pension_exists_1"
              :value="false"
              name="disability_pension_exists"
              v-model="value.disabilityPensionExists"
              @change="onChange"
            />
            <label for="disability_pension_exists_1">Nein</label>
          </div>

          <transition name="fade">
            <input
              type="number"
              v-if="value.disabilityPensionExists"
              :class="value.disabilityPension != null ? 'active' : ''"
              placeholder="in EUR"
              id="disability_pension"
              name="disability_pension"
              :disabled="!value.disabilityPensionExists"
              v-model.number="value.disabilityPension"
              @change="onChange"
            />
          </transition>
        </div>
      </div>
      <div class="group">
        <h3>Erhältst du Unterhalt oder Unterhaltsvorschuss?</h3>
        <div class="group horizontal">
          <div class="radio">
            <input
              type="radio"
              id="entertains_exists_0"
              :value="true"
              name="entertains_exists"
              v-model="value.entertainsExists"
              @change="onChange"
            />
            <label for="entertains_exists_0">Ja</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="entertains_exists_1"
              :value="false"
              name="entertains_exists"
              v-model="value.entertainsExists"
              @change="onChange"
            />
            <label for="entertains_exists_1">Nein</label>
          </div>

          <transition name="fade">
            <input
              type="number"
              v-if="value.entertainsExists"
              placeholder="in EUR"
              id="entertains"
              name="entertains"
              :disabled="!value.entertainsExists"
              v-model.number="value.entertains"
              :class="value.entertains != null ? 'active' : ''"
              @change="onChange"
            />
          </transition>
        </div>
      </div>
      <div class="group">
        <h3>Beziehst du Kindergeld?</h3>
        <div class="group horizontal">
          <div class="radio">
            <input
              type="radio"
              id="child_benefit_exists_0"
              :value="true"
              name="child_benefit_exists"
              v-model="value.childBenefitExists"
              @change="onChange"
            />
            <label for="child_benefit_exists_0">Ja</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="child_benefit_exists_1"
              :value="false"
              name="child_benefit_exists"
              v-model="value.childBenefitExists"
              @change="onChange"
            />
            <label for="child_benefit_exists_1">Nein</label>
          </div>
          <transition name="fade">
            <input
              type="number"
              v-if="value.childBenefitExists"
              placeholder="in EUR"
              id="child-benefit"
              name="child-benefit"
              :disabled="!value.childBenefitExists"
              v-model.number="value.childBenefit"
              :class="value.childBenefit != null ? 'active' : ''"
              @change="onChange"
            />
          </transition>
        </div>
      </div>
      <div class="group">
        <h3>Hast du Mieteinnahmen?</h3>
        <div class="group horizontal">
          <div class="radio">
            <input
              type="radio"
              id="rental_income_exists_0"
              :value="true"
              name="rental_income_exists"
              v-model="value.rentalIncomeExists"
              @change="onChange"
            />
            <label for="rental_income_exists_0">Ja</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="rental_income_exists_1"
              :value="false"
              name="rental_income_exists"
              v-model="value.rentalIncomeExists"
              @change="onChange"
            />
            <label for="rental_income_exists_1">Nein</label>
          </div>

          <transition name="fade">
            <input
              type="number"
              v-if="value.rentalIncomeExists"
              placeholder="in EUR"
              id="rental-income"
              name="rental-income"
              :disabled="!value.rentalIncomeExists"
              v-model.number="value.rentalIncome"
              :class="value.rentalIncome != null ? 'active' : ''"
              @change="onChange"
            />
          </transition>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Dots from "@/components/Dots.vue"; // @ is an alias to /src
import { IncomeStatus } from "@/shared/status";

@Component({
  components: {
    Dots,
  },
})
export default class Income extends Vue {
  @Prop() value?: IncomeStatus;
  @Emit("change")
  onChange(): { key: string; value: any } {
    if (this.value != undefined) {
      this.value.updateValidity();
    }
    return { key: "income", value: this.value };
  }
}
</script>