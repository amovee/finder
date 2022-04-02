<template>
  <div class="privacy">
    <h2>Datenschutz</h2>
    <p>
      Zurzeit speichern wir
      <b>keine deiner Daten</b>
      .
      <br />
      Wir benötigen sie nur um während deines Besuchs die
      <br />
      für dich
      <b>passenden Resultate</b>
      zu suchen.
    </p>
    <p>
      Mehr Informationen findest du unter:
      <br />
      <a href="https://amuvee.de/datenschutz">www.amuvee.de/datenschutz</a>
    </p>
    <form>
      <div class="group">
        <h3>Ist das in Ordnung?</h3>
        <div class="group horizontal">
          <div class="radio">
            <input
              type="radio"
              id="radio_0_1"
              :value="false"
              name="accept"
              v-model="value.accept"
              @change="onChange"
            />
            <label for="radio_0_1">Nein</label>
          </div>
          <div class="radio">
            <input
              type="radio"
              id="radio_0_0"
              :value="true"
              name="accept"
              v-model="value.accept"
              @change="onChange"
            />
            <label for="radio_0_0">Ja</label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import Dots from '@/components/Dots.vue' // @ is an alias to /src
import { PrivacyStatus } from '@/shared/status'

@Component({
  components: {
    Dots,
  },
})
export default class Privacy extends Vue {
  @Prop() value?: PrivacyStatus

  @Emit('change')
  onChange(): { key: string; value: any } {
    if (this.value != undefined) {
      this.value.updateValidity()
    }
    return { key: 'privacy', value: this.value }
  }
}
</script>
<style lang="scss" scoped>
p {
  font-size: 18px;
  line-height: 1.5em;
  max-width: 500px;
  a {
    color: var(--accent-red);
    cursor: pointer;
  }
}
</style>
