<template>
  <div class="single-result">
    <h2>{{ result.name }}</h2>
    <!-- <h3>Typ: {{ result.type.name }}</h3> -->
    <Timestamp
      v-if="result.start_date != null || result.end_date != null"
      class="time"
      :start_date="result.start_date"
      :end_date="result.end_date"
    />
    <div class="short_description" v-html="result.description"></div>
    <div class="actions">
      <h3>Dein Weg zum Ziel</h3>
      <ul v-if="result.actions != null && result.actions.length > 0">
        <li v-for="(action, actionIndex) in sortedActions" :key="actionIndex">
          <h4>
            <span class="number">{{ actionIndex + 1 }}.</span>
            {{ action.name }}:
          </h4>
          <h5 v-if="action.date">bis zum {{ action.date }}</h5>
          <!-- <h5>Typ: {{ actionTypes[action.type] }}</h5> -->
          <div class="action-description" v-html="action.description"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Timestamp from "./Timestamp.vue";

@Component({
  components: {
    Timestamp,
  },
})
export default class Result extends Vue {
  @Prop() private result!: any;

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
    return this.result.actions
      .map((action: any) => action.action_id)
      .filter((action: any) => !!action)
      .sort((a: any, b: any) => +b.type - +a.type);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.single-result {
  max-width: 50ch;
  padding: 0 calc(50% - 25ch);
  h3 {
    text-align: center;
  }
  h4 {
    margin: 0;
    margin-bottom: 0.75rem;
    text-align: center;
    .number {
      // color: var(--orange);
    }
  }
  .short_description {
    margin-bottom: 3rem;
    ul {
      li {
        margin-bottom: 1rem;
        &::marker {
          color: var(--orange);
        }
      }
    }
  }
  .actions {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 0.75rem;
      max-width: 50ch;
      padding: 0 calc(50% - 25ch);
      li {
        margin-bottom: 1.25rem;
        background-color: var(--light-orange);
        padding: 1rem;
        .action-description {
          p {
          }
          a {
            color: var(--orange);
          }
        }
      }
    }
  }
}
</style>
