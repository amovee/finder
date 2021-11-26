<template>
  <div class="cookie-card">
    <div class="content">
      <article>
        <h1>Speicher der Favoriten</h1>
        <p>
          Um Resultate favoritisieren zu können, brauchen wir die Erlaubnis
          einen Cookie zu speichern. Dieser enthält nur die Erlaubnis und die
          Nummern der favoritisierten Resultate. Deine Daten bleiben auf deinem
          Computer und werden nicht von uns verarbeitet.
        </p>
        <div class="vertical-group">
          <button class="btn" @click="Confirm(true)">Ja</button>
          <button class="btn" @click="Confirm(false)">Nein</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class CookieCard extends Vue {
  @Emit("confirm")
  Confirm(a: boolean) {
    return a;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cookie-card {
  display: block;
  .content {
    background: white;
    padding: 1rem;
    article {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #e4f2f2;
      padding: 4rem 3rem;
      h1 {
        font-family: "Playfair Display";
        font-style: normal;
        font-weight: normal;
        font-size: 40px;
        line-height: 3rem;
        margin: 0;
        text-align: center;
        margin-bottom: 4rem;
      }
      p {
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 1rem;
        line-height: 24px;
        margin: 0 0 20px 0;
        max-width: 70ch;

        /* or 150% */
        text-align: center;
      }
      .vertical-group {
        display: flex;
        gap: 1rem;
      }
      .link {
        display: flex;
        justify-content: center;
        gap: 1rem;
        width: 100%;
        margin-bottom: 4rem;
        .text-box {
          width: 50%;
        }
      }
    }
  }
}
</style>
