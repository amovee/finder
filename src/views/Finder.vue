<template>
  <div id="finder" v-if="value">
    <Aside
      :index="index"
      :pages="pages"
      :value="value"
      :open="openSidebar"
      @change="setIndex"
    />
    <main id="main">
      <OverlayScrollbarsComponent class="view" id="scroll" :extensions="[]">
        <div class="view-content">
          <Children
            v-if="pages[index].key == 'children'"
            :value="value.children"
            @change="onChange"
          />
          <LifeSituation
            v-if="pages[index].key == 'lifeSituation'"
            :value="value.lifeSituation"
            @change="onChange"
          />
          <HousingSituation
            v-if="pages[index].key == 'housingSituation'"
            :value="value.housingSituation"
            @change="onChange"
          />
          <Insurance
            v-if="pages[index].key == 'insurance'"
            :value="value.insurance"
            @change="onChange"
          />
          <Working
            v-if="pages[index].key == 'working'"
            :value="value.working"
            @change="onChange"
          />
          <Income
            v-if="pages[index].key == 'income'"
            :value="value.income"
            @change="onChange"
          />
          <!-- <InformationField
        v-if="pages[index].info != null"
        :text="pages[index].info"
      /> -->
          <footer>
            <button class="btn" :disabled="index == 0" @click="prev">
              ZURÜCK
            </button>
            <button
              class="btn primary"
              @click="next"
              :disabled="!currentIsValid"
            >
              WEITER
            </button>
          </footer>
        </div>
      </OverlayScrollbarsComponent>
    </main>
    <nav class="side-nav">
      <button class="btn primary" @click="openSidebar = !openSidebar">
        <div class="menu" :class="openSidebar ? 'open' : ''">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </button>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Children from "./finder/Children.vue";
import HousingSituation from "./finder/Habitat.vue";
import Insurance from "./finder/Insurance.vue";
import LifeSituation from "./finder/LifeSituation.vue";
import Working from "./finder/Working.vue";
import Income from "./finder/Income.vue";
import Aside from "../components/Aside.vue";
import InformationField from "../components/InformationField.vue";
import { FinderStatus } from "@/shared/status";
import { Page } from "@/shared/page";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

@Component({
  components: {
    Children,
    HousingSituation,
    Insurance,
    LifeSituation,
    Working,
    Income,
    Aside,
    InformationField,
    OverlayScrollbarsComponent,
  },
})
export default class Finder extends Vue {
  isValid = false;
  value?: FinderStatus;
  pages: Page[] = [];
  openSidebar = false;
  public $store: any;
  constructor() {
    super();
    if (this.$route.query.answers) {
      this.value = FinderStatus.fromJson(
        JSON.parse(this.$route.query.answers + "")
      );
      this.$store.commit("initAnswers", this.value);
    } else {
      this.value = this.$store.getters.answers;
    }
    if (this.value) {
      const text0 = `Viele Programme arbeiten mit Grenzwerten. Je genauer die Zahlen sind,
          die du bei uns eingibst, desto passgenauer die Ergebnisse, die wir dir
          anzeigen. Hast du nur ungefähre Werte zur Hand, trage diese ein. Das
          gibt dir zumindest eine erste Orientierung.`;
      this.pages = [
        new Page(
          "children",
          "Kinder",
          this.value.children,
          `In vielen Programmen richtet sich die Förderung nach der Anzahl oder dem Alter der Kinder. Einige Programme gelten nur für Schwangere.`
        ),
        new Page(
          "lifeSituation",
          "Lebenssituation",
          this.value.lifeSituation,
          text0
        ),
        new Page(
          "housingSituation",
          "Wohnsituation",
          this.value.housingSituation,
          text0
        ),
        new Page("insurance", "Versicherung", this.value.insurance),
        new Page("working", "Beschäftigung", this.value.working),
        new Page("income", "Einkommen", this.value.income, text0),
      ];
    }
  }
  index = 0;
  setIndex(index: number) {
    this.index = index;
  }
  updateIsValid() {
    this.isValid = this.pages[this.index].status.isValid;
  }
  onChange(change: { key: string; value: any }) {
    this.pages[this.index].status = change.value;
    this.updateIsValid();
  }
  get currentIsValid(): boolean {
    return this.pages[this.index].status.isValid;
  }
  next() {
    if (this.value) this.value.updateValidity();
    if (this.isValid) {
      if (this.index < this.pages.length - 1) {
        this.index++;
        if (document.getElementById("main-content")) {
          let a: any = document.getElementById("main-content");
          a.scrollTop = 0;
        }
      } else {
        if (this.value?.isValid) {
          this.$store.commit("initAnswers", this.value);
          this.$router.push("results");
        }
      }
    }
    this.updateIsValid();
  }
  prev() {
    if (this.index > 0) {
      this.index--;
      if (document.getElementById("main-content")) {
        let a: any = document.getElementById("main-content");
        a.scrollTop = 0;
      }
    }
    this.updateIsValid();
  }
}
</script>
<style lang="scss">
@import "./form.scss";
#finder {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  @media (min-width: 1024px) {
    display: flex;
    // flex-direction: row-reverse;
    // display: grid;
    // grid-template-columns: 392px 1fr;
  }
  aside {
    position: fixed;
    top: 0;
    left: -380px;
    height: 100vh;
    width: 380px;
    transition: left 400ms ease;
    &.open {
      left: 0;
    }
    @media (min-width: 1024px) {
      position: relative;
      width: 400px;
      top: inherit;
      left: inherit;
      transition: none;
    }
  }

  color: var(--body-text);

  main {
    flex-grow: 1;
    @media (min-width: 1024px) {
      width: calc(100% - 400px);
    }
    .view {
      .view-content {
        display: flex;
        flex-grow: 1;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        padding: 2rem 1rem;
        min-height: 100vh;
        > * {
          width: 100%;
          max-width: 700px;
        }
        @media (min-width: 512px) {
          padding: 2rem 5rem 3rem 5rem;
        }
        // overflow-y: auto;
        box-sizing: border-box;
        // height: 100vh;

        h2 {
          font-family: "Playfair Display";
          color: var(--accent-green);
          font-size: 2rem;
          margin-top: 0;
          margin-bottom: 3rem;
          @media (min-width: 400px) {
            font-size: 2.5rem;
          }
          @media (min-width: 512px) {
            font-size: 3rem;
          }
        }

        h3 {
          font-size: 18px;
          font-weight: 700;
          line-height: 22px;
          margin: 0 0 20px 0;
          @media (min-width: 512px) {
            font-size: 22px;
            line-height: 2rem;
          }
        }

        footer {
          display: flex;
          gap: 1rem;
          justify-content: center;
          @media (min-width: 512px) {
            justify-content: space-between;
          }
        }
      }
    }
  }
}
button.btn {
  font-weight: 500;
  font-size: 18px;
  padding: 1rem 40px;
  border-radius: 36px;
  background: var(--bright-primary);
  outline: 1px #e5e4e1 solid;
  border: none;
  cursor: pointer;
  font-weight: 700;

  &[disabled] {
    color: var(--gray);
    background: #f7f7f7;
    cursor: default;
  }

  &.primary {
    color: white;
    border-color: var(--accent-red);
    background: var(--accent-red);
    &[disabled] {
      color: var(--gray);
      background: #f7f7f7;
      cursor: default;
    }
  }
}
.side-nav {
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  padding: 24px;
  button.btn {
    display: block;
    padding: 10px 11px;
    height: 3rem;
    width: 3rem;

    @media (min-width: 1024px) {
      display: none;
    }
    div.menu {
      position: relative;
      display: block;
      width: 24px;
      height: 24px;
      span.bar {
        position: absolute;
        display: block;
        height: 4px;
        width: 100%;
        background: var(--bright-primary);
        border-radius: 2px;
        transition: 400ms ease transform, 400ms ease top;
        &:nth-child(1) {
          top: 0px;
        }
        &:nth-child(2) {
          top: 10px;
        }
        &:nth-child(3) {
          top: 20px;
        }
      }
      &.open {
        span.bar {
          &:nth-child(1) {
            top: 10px;
            transform: rotate(45deg);
          }
          &:nth-child(2) {
            transform: rotate(45deg);
          }
          &:nth-child(3) {
            top: 10px;
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
}
</style>