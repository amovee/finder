<template>
  <div class="result">
      <h2>{{ result.name }}</h2>
      <h3>Typ: {{ result.type.name }}</h3>
      <h4>
        Zeitraum von {{ result.start_date }} bis
        {{ result.start_date }}
      </h4>
      <div class="short_description" v-html="result.description"></div>
      <div class="actions">
        <ul v-if="result.actions != null && result.actions.length > 0">
        <li v-for="(action, actionIndex) in sortedActions" :key="actionIndex">
          <h4>{{action.name}}</h4>
          <h5 v-if="action.date">bis zum {{action.date}}</h5>
          <h5>Typ: {{actionTypes[action.type]}}</h5>
          <p v-html="action.description"></p>
          {{action.file}}
          {{action.link}}
        </li>
      </ul>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Result extends Vue {
  @Prop() private result!: any;
  @Prop() private actions!: any;
  
  public actionTypes = {
    900: "Berechtigung ermitteln",
    800: "Unterlagen kopieren",
    700: "Beratungstermin ausmachen",
    600: "Antrag stellen",
    500: "Antrag abschicken",
    400: "Termin ausmachen",
    0: "Sonstiges",
  };

  get sortedActions() {
    return this.actions.sort((a: any, b: any) => b.type - a.type)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.result {
}
</style>
