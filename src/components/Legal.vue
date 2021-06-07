<template>
  <div class="legal">
    <h2>Haftungsausschluss</h2>
    <div class="short_description">
      <p>
        Die Plattform amuvee. bietet lediglich einen kostenfreien und
        unverbindlichen Informationszugang für alle, die Alleinerziehend sind.
      </p>
      <p>
        Tool informiert dich schnell und umfassend über Geld-, Sach - Beratungs-
        und Gesundheitsleistungen und gibt Dir einen Überblick über wesentliche
        Angebote und Leistungen bietet.
      </p>
      <p>
        Für die Vollständigkeit und Richtigkeit der Angaben übernehmen wir keine
        Haftung. Nach der Beantwortung der Fragen erhältst du von uns eine
        unverbindliche Zusammenstellung, inwieweit eine Programme, Angebote und
        Leistungen für dich in Frage kommen. Wir bieten weder Rechts- noch
        Steuerberatung an. Bei Fragen rechtlicher, steuerlicher oder
        finanzplanerischer Natur sollten Experten der jeweiligen Themenfelder
        oder der Leistungsträger selbst konsultiert werden. Wir sind ein
        gemeinnütziges Unternehmen. Gewinne, die wir erzielen werden für die
        Verbesserung der Lebensumstände und der Information für Alleinerziehende
        verwendet.
      </p>
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.legal {
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
