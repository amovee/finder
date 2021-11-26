<template>
  <div class="sharing-card">
    <div class="content">
      <article>
        <h1>Speicher deine Resultate</h1>
        <p>
          Kopiere und sichere dir einfach diesen Link oder setze für diese Seite
          ein Lesezeichen (Strg/cmd+D). So hast du deine persönlichen Resultate
          immer griffbereit.
        </p>
        <div class="link">
          <input
            type="text"
            :value="url"
            class="text-box"
            id="url-input"
            readonly="readonly"
          />
          <button class="btn primary" @click="copy">Kopieren</button>
        </div>
        <button class="btn" @click="onClose()">Schließen</button>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class SharingCard extends Vue {
  public url = window.location.origin+"/#/results";

  constructor() {
    super();
    if (this.$store.getters.answers) {
      this.url +=
        "?answers=" + JSON.stringify(this.$store.getters.answers.toJson());
    }
  }
  @Emit("close")
  onClose() {
    return;
  }
  copy(): void {
    /* Get the text field */
    const copyText: any = document.getElementById("url-input");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sharing-card {
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
      .link {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        margin-bottom: 4rem;
        @media (min-width: 800px) {
          flex-direction: row;
        }
        .text-box {
          flex-grow: 1;
          width: 100%;
          max-width: 400px;
          padding: 12px 1rem;
          border-radius: 4px;
          font-style: normal;
          font-size: 18px;
          font-weight: 700;
          line-height: 24px;
          text-align: center;
          background: #ffffff;
          border: 1px solid #e6e4e1;
          color: #aaadb3;
          line-height: 24px;
          outline: none;
        }
      }
    }
  }
}
</style>
