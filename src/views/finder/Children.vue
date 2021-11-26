<template>
  <div class="children">
    <h2>Kinder</h2>
    <form>
      <div class="group">
        <h3>Hast du bereits Kinder?</h3>
        <div class="group horizontal">
          <div class="radio">
            <input
              type="radio"
              id="radio_0_0"
              :value="true"
              name="alreadyChildren"
              v-model="value.alreadyChildren"
              @change="onChange"
            />
            <label for="radio_0_0">Ja</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="radio_0_1"
              :value="false"
              name="alreadyChildren"
              v-model="value.alreadyChildren"
              @change="onChange"
            />
            <label for="radio_0_1">Nein</label>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="group" v-if="value.alreadyChildren == true">
          <h3>Wie viele Kinder hast du?</h3>
          <div class="group horizontal">
            <div class="radio">
              <input
                type="radio"
                id="radio_1_0"
                value="1"
                name="numberOfChildren"
                v-model.number="value.numberOfChildren"
                @change="onChange"
              />
              <label for="radio_1_0">1</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="radio_1_1"
                value="2"
                name="numberOfChildren"
                v-model.number="value.numberOfChildren"
                @change="onChange"
              />
              <label for="radio_1_1">2</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="radio_1_2"
                value="3"
                name="numberOfChildren"
                v-model.number="value.numberOfChildren"
                @change="onChange"
              />
              <label for="radio_1_2">3</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="radio_1_3"
                value="4"
                name="numberOfChildren"
                v-model.number="value.numberOfChildren"
                @change="onChange"
              />
              <label for="radio_1_3">4</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="radio_1_4"
                value="5"
                name="numberOfChildren"
                v-model.number="value.numberOfChildren"
                @change="onChange"
              />
              <label for="radio_1_4">5</label>
            </div>
            <div class="radio">
              <input
                type="radio"
                id="radio_1_5"
                value="6"
                name="numberOfChildren"
                v-model.number="value.numberOfChildren"
                @change="onChange"
              />
              <label for="radio_1_5">mehr</label>
            </div>
          </div>
        </div>
      </transition>
      
      <transition name="fade">
      <div
        class="group"
        v-if="value.alreadyChildren == true && value.numberOfChildren > 0"
      >
        <h3>
          {{
            value.numberOfChildren > 1
              ? "Wann sind deine Kinder geboren?"
              : "Wann ist dein Kind geboren?"
          }}
        </h3>
        <ul class="loop-list">
          <li v-for="i in Math.min(value.numberOfChildren, 5)" :key="i">
            <label :for="'date_0_' + (i - 1)" v-if="value.numberOfChildren > 1"
              >Kind {{ i }}</label
            >
            <input
              type="date"
              :id="'date_0_' + (i - 1)"
              placeholder="tt.mm.jjjj"
              v-model="value.birthDates[i - 1]"
              :class="value.birthDates[i - 1] != null ? 'active' : ''"
              @change="onChange"
            />
          </li>
        </ul>
      </div>
      </transition>
      
      <transition name="fade">
      <div class="group" v-if="value.alreadyChildren != null">
        <h3>Bist du schwanger?</h3>
        <div class="group horizontal">
          <div class="radio">
            <input
              type="radio"
              id="radio_2_0"
              :value="true"
              name="pregnant"
              v-model="value.pregnant"
              @change="onChange"
            />
            <label for="radio_2_0">Ja</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="radio_2_1"
              :value="false"
              name="pregnant"
              v-model="value.pregnant"
              @change="onChange"
            />
            <label for="radio_2_1">Nein</label>
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
import { ChildrenStatus } from "@/shared/status";

@Component({
  components: {
    Dots,
  },
})
export default class Children extends Vue {
  @Prop() value?: ChildrenStatus;

  @Emit("change")
  onChange(): { key: string; value: any } {
    if (this.value != undefined) {
      this.value.updateValidity();
    }
    return { key: "children", value: this.value };
  }
}
</script>