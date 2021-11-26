<template>
  <div class="result-card">
    <div class="content">
      <header>
        <h2>{{ content.name }}</h2>
        <nav>
          <button class="btn" @click="close">
            <img src="@/assets/close.svg" /><span class="text">Schließen</span>
          </button>
          <button class="btn" @click="fav()" :class="content.isFavorite ? 'fav' : ''">
            <Heart :class="content.isFavorite ? 'fav' : ''" /><span
              class="text"
              >Merken</span
            >
          </button>
        </nav>
      </header>

      <div class="steps" v-if="actions && actions.length">
        <h3>Dein Weg zum Ziel</h3>
        <div class="step" v-for="(action, i) in actions" :key="i">
          <span class="number">{{ i + 1 }}</span>
          <article>
            <h4 v-if="action.name" v-html="action.name" />
            <p v-if="action.description" v-html="action.description" />
          </article>
        </div>
      </div>
      <article v-html="content.description"></article>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Heart from "./Heart.vue";

@Component({
  components: {
    Heart,
  },
})
export default class ResultCard extends Vue {
  @Prop() content: any;

  @Emit("fav")
  fav(): { id: number; activ: boolean } {
    this.content.isFavorite = !this.content.isFavorite;
    return { id: this.content.id, activ: this.content.isFavorite };
  }

  get actions() {
    return this.content.actions
      .filter((action: any) => !!action && !!action.action_id)
      .map((action: any) => {
        const a = action.action_id;
        return {
          description: a.description,
          date: a.date,
          file: a.file,
          id: a.id,
          link: a.link,
          name: a.name,
          sort: a.sort,
          type: a.type,
        };
      });
  }

  @Emit("close")
  close() {
    return;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.result-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  &.full-size {
    @media (max-width: 800px) {
      // background: red;
      .btn {
        .text {
          display: none;
        }
      }
    }
    @media (max-width: 600px) {
      .content {
        border: none;
        header {
          h2 {
            font-size: 2rem;
          }
          nav {
            // flex-direction: column;
          }
        }
      }
    }
    @media (max-width: 450px) {
      .content {
        padding: 18px;
        border: none;
        header {
          flex-direction: column-reverse;
          gap: 8px;
          margin-bottom: 2rem;
          h2 {
          }
          nav {
            justify-content: end;
            width: 100%;
          }
        }
        .steps {
          h3 {
            padding: 0;
          }
          .step {
            padding: 24px 0;
          }
        }
      }
    }
  }
  .content {
    max-width: 700px;
    background: white;
    border-left: 2px solid var(--accent-green);
    box-shadow: 0px 6px 8px rgba(70, 132, 140, 0.7);
    padding: 2rem;
    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4rem;
      h2 {
        font-family: "Playfair Display";
        color: var(--accent-red);
        font-size: 40px;
        font-weight: 700;
        margin: 0;
      }
      nav {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: end;
        gap: 24px;
        .btn {
          display: flex;
          align-items: center;
          padding: 13px 18px 12px 18px;
          gap: 8px;
          color: var(--dark-primary);
          transition: 1s outline-color ease;
          &:hover {
            outline-width: 2px;
          }
          &.fav {
            outline-color: #fa6d5a;
            outline-width: 2px;
          }
        }
      }
    }
    .steps {
      margin-bottom: 4rem;
      h3 {
        font-weight: 700;
        font-size: 22px;
        line-height: 30px;
        padding: 24px 0 24px 84px;
      }
      .step {
        display: grid;
        grid-template-columns: 84px 1fr;
        border-top: 1px solid var(--accent-red);
        padding: 24px 2rem 24px 0;
        .number {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 84px;
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent-red);
        }
        article {
          h4 {
            margin: 0 0 1rem 0;
          }
          p {
            color: var(--body-text);
            margin: 0;
            font-size: 1rem;
            line-height: 24px;
            a {
              color: var(--accent-red);
              cursor: pointer;
            }
          }
        }
      }
    }
    & > article {
      line-height: 24px;
      font-size: 1rem;
    }
  }
}
</style>
