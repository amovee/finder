<template>
  <div class="finder">
    <form>
      <!-- <h1>AFQ</h1> -->
      <!-- ---------- PAGE 00 ---------- -->

      <div class="page" v-if="page == 0">
        <h1>Wohnort</h1>
        <div class="field">
          <label for="postalcode">Postleitzahl:</label>
          <input
            type="tel"
            id="postalcode"
            v-model="postalcode"
            pattern="[0-9]*"
            maxlength="10"
          />
        </div>
        <div class="field">
          <p class="description">
            Anhand deiner Postleitzahl ordnen wir die für dich passenden
            Programme in deinem Bundesland und, wenn vorhanden, auch in deiner
            Stadt zu.
          </p>
        </div>
      </div>
      <!-- ---------- PAGE 01 ---------- -->
      <div class="page" v-if="page == 1">
        <h1>Kinder</h1>
        <div class="field horizontal checkbox">
          <label for="pregnant">Bist du schwanger?</label>
          <label
            for="pregnant"
            class="checkbox"
            :class="{ 'is-true': pregnant }"
            >{{ pregnant ? "Ja" : "Nein" }}</label
          >
          <input
            type="checkbox"
            name="pregnant"
            id="pregnant"
            v-model="pregnant"
          />
        </div>
        <div class="field horizontal">
          <label for="numberOfChildren">Weitere Kinder?</label>
          <input
            type="number"
            id="numberOfChildren"
            v-model="numberOfChildren"
            min="0"
            max="20"
            step="1"
          />
        </div>
        <div class="field">
          <p class="description">
            In vielen Programmen richtet sich die Förderung nach der Anzahl der
            Kinder und vor allem auch nach deren Alter. Deshalb ist eine genaue
            Alterseingabe notwendig. Einige Programme gelten nur für Schwangere.
          </p>
        </div>
        <div
          class="field select"
          v-for="(child, index) of getChildren()"
          :key="index"
        >
          <label for="numberOfChildren"
            >Wie alt ist Kind Nummer {{ index + 1 }}?</label
          >
          <!-- <label :for="'child' + index">Alter {{ index + 1 }}. Kind</label> -->
          <select :id="'child' + index" v-model.number="children[index]">
            <option value="0.5">0 - 12 Monate</option>
            <option value="1.25">12 - 18 Monate</option>
            <option value="1.75">18 - 24 Monate</option>
            <option value="2">2 Jahre</option>
            <option value="3">3 Jahre</option>
            <option value="4">4 Jahre</option>
            <option value="5">5 Jahre</option>
            <option value="6">6 Jahre</option>
            <option value="7">7 Jahre</option>
            <option value="8">8 Jahre</option>
            <option value="9">9 Jahre</option>
            <option value="10">10 Jahre</option>
            <option value="11">11 Jahre</option>
            <option value="12">12 Jahre</option>
            <option value="13">13 Jahre</option>
            <option value="14">14 Jahre</option>
            <option value="15">15 Jahre</option>
            <option value="16">16 Jahre</option>
            <option value="17">17 Jahre</option>
            <option value="18">ab 18 Jahre in Ausbildung</option>
          </select>
        </div>
      </div>
      <!-- ---------- PAGE 02 ---------- -->
      <div class="page" v-if="page == 2">
        <h1>Lebenssituation</h1>
        <div class="field select">
          <label for="mariageStatus">Familienstand und Lebenssituation</label>
          <select id="mariageStatus" v-model="mariageStatus">
            <option
              v-for="(mariageTypeOption, index) in mariageTypeOptions"
              :key="index"
              :value="mariageTypeOption"
            >
              {{ mariageTypeOption.name }}
            </option>
          </select>
        </div>
        <div class="field">
          <p class="description">
            Eigentlich gibt es nur drei Familienstände. Damit wir aber
            passgenauer arbeiten können, kannst du dich auch schon in der
            Trennungsphase informieren. Besonderes Augenmerk legen wir auf das
            Thema Sicherheit und Gewaltschutz.
          </p>
        </div>
      </div>
      <!-- ---------- PAGE 03 ---------- -->
      <div class="page" v-if="page == 3">
        <h1>Krankenversicherung</h1>
        <div class="field">
          <div class="field radio">
            <label for="insuranceTypZero"
              >Gesetzlich Versichert
              <span class="radio" :class="{ active: insuranceTyp == 1 }"></span
            ></label>
            <input
              type="radio"
              id="insuranceTypZero"
              v-model.number="insuranceTyp"
              value="1"
            />
          </div>
          <div class="field select" v-if="insuranceTyp == 1">
            <select id="insurancePrivate" v-model="insurancePublic">
              <option
                v-for="(publicInsurance, index) in publicInsurances"
                :key="index"
                :value="publicInsurance"
              >
                {{ publicInsurance.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="field">
          <div class="field radio">
            <label for="insuranceTypOne"
              >Privat Versichert
              <span class="radio" :class="{ active: insuranceTyp == 2 }"></span
            ></label>
            <input
              type="radio"
              id="insuranceTypOne"
              v-model.number="insuranceTyp"
              value="2"
            />
          </div>
          <div class="field select" v-if="insuranceTyp == 2">
            <select id="insurancePrivate" v-model="insurancePrivate">
              <option
                v-for="(privateInsurance, index) in privateInsurances"
                :key="index"
                :value="privateInsurance"
              >
                {{ privateInsurance.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="field">
          <div class="field radio">
            <label for="insuranceTypTwo"
              >nicht Versichert
              <span class="radio" :class="{ active: insuranceTyp == 0 }"></span
            ></label>
            <input
              type="radio"
              id="insuranceTypTwo"
              v-model.number="insuranceTyp"
              value="0"
            />
          </div>
        </div>

        <div class="field">
          <p class="description">
            Viele Krankenversicherungen haben spezielle Angebote. Diese sind im
            Finder aufgenommen.
          </p>
        </div>
      </div>
      <!-- ---------- PAGE 04 ---------- -->
      <div class="page" v-if="page == 4">
        <h1>Arbeit</h1>
        <div class="field select">
          <label for="jobStatus">Art der Beschäftigung</label>
          <select id="jobStatus" v-model.number="jobStatus">
            <option
              v-for="(job, jobIndex) in sortedJoblist"
              :key="jobIndex"
              :value="job.id"
            >
              {{ job.name }}
            </option>
          </select>
        </div>
        <div class="field">
          <p class="description">
            Gib bitte hier den aktuellen Stand deiner
            <b>beruflichen Situation</b> ein. Wenn du in Teilzeit arbeitest,
            achte bitte auf die richtige Wahl der Stunden.
          </p>
        </div>
      </div>
      <!-- ---------- PAGE 05 ---------- -->
      <div class="page" v-if="page == 5">
        <h1>Einkommen</h1>
        <div class="field number">
          <label for="income">Einkommen pro Monat</label>
          <input type="number" id="income" v-model="income" min="0" />
        </div>
        <div class="field">
          <p class="description">
            Hier gibst du dein durchschnittliches monatliches
            <b>Bruttoeinkommen</b> ein. Beziehst du <b>Geld vom Staat</b> dann
            gib auch das hier ein. Zum Bruttoeinkommen gehört auch
            <b>Unterhalt</b> für die Kinder, <b>Witwenrente</b>,
            <b>Mieteinnahmen</b>, sowie
            <b>Erwerbsminderungs- oder Berufsunfähigkeitsrenten</b>.
            <b>Kindergeld</b> kannst du <b>unberücksichtigt</b> lassen.
          </p>
        </div>
      </div>
      <!-- ---------- PAGE 06 ---------- -->
      <div class="page" v-if="page == 6">
        <h1>Wohnsituation</h1>
        <div class="field number">
          <label for="rent">Miete/ Kreditrate</label>
          <input type="number" id="rent" v-model="rent" min="0" />
        </div>
        <div class="field">
          <p class="description">
            Gib uns bitte deine <b>Nettomiete</b> (also ohne Nebenkosten) an. Du bist
            Eigentümerin und zahlst <b>Kreditraten</b> für dein Haus oder deine
            Wohnung? Gib diese bitte <b>inklusive Zins und Tilgung</b> an. Bei
            endfälligen Darlehen denke auch an die Ansparraten zum Tilgungsersatz.
          </p>
        </div>
      </div>
      <nav>
        <button type="button" v-on:click="prev()">Zurück</button>
        <button
          type="button"
          :class="{ primary: isLast }"
          :disabled="isDisabled"
          v-on:click="next()"
        >
          {{ isLast ? "Fertig" : "Weiter" }}
        </button>
      </nav>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Finder extends Vue {
  public page = 0;
  public postalcode: any = "";
  public numberOfChildren = 0;
  public children: any[] = [];
  public mariageStatus: number | null = null;
  public insuranceTyp = 1;
  public insurancePublic = null;
  public insurancePrivate = null;
  public jobStatus = null;
  public income = 0;
  public rent = 0;
  public pregnant = false;
  public currentValues: any = null;

  //options
  mariageTypeOptions = [];

  insurancesOptions = [];
  joblist = [];

  async mounted(): Promise<void> {
    this.insurancesOptions = (
      await axios.get("https://afq-t32f44ncfa-ey.a.run.app/items/insurance")
    ).data.data;
    this.mariageTypeOptions = (
      await axios.get("https://afq-t32f44ncfa-ey.a.run.app/items/mariage_types")
    ).data.data.sort((a: any, b: any) => b.weight - a.weight);
    this.joblist = (
      await axios.get("https://afq-t32f44ncfa-ey.a.run.app/items/joblist")
    ).data.data;
  }

  get sortedJoblist() {
    return this.joblist.sort((a: any, b: any) => b.weight - a.weight);
  }

  get privateInsurances() {
    return this.insurancesOptions
      .filter((ins: any) => ins.type == "2")
      .sort((insA: any, insB: any) => insB.weight - insA.weight);
  }
  get publicInsurances() {
    return this.insurancesOptions
      .filter((ins: any) => ins.type == "1")
      .sort((insA: any, insB: any) => insB.weight - insA.weight);
  }

  get isDisabled(): boolean {
    return [
      () =>
        this.postalcode.match(/^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/) ==
          null ||
        this.postalcode.match(/^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/)
          .length == 0,
      () => !this.checkAllChildren,
      () => this.mariageStatus == null,
      () =>
        !(
          this.insuranceTyp == 0 ||
          (this.insuranceTyp == 1 && this.insurancePublic != null) ||
          (this.insuranceTyp == 2 && this.insurancePrivate != null)
        ),
      () => this.jobStatus == null,
      () => false,
      () => false,
    ][this.page]();
  }

  public next() {
    if (!this.isLast) {
      this.page++;
    } else {

      this.currentValues = {
        postalCode: this.postalcode,
        numberOfChildren: this.numberOfChildren,
        children: this.children,
        mariageStatus: this.mariageStatus,
        insuranceTyp: this.insuranceTyp,
        insurance:
          this.insuranceTyp == 1
            ? this.insurancePublic
            : this.insuranceTyp == 2
            ? this.insurancePrivate
            : null,
        jobStatus: this.jobStatus,
        income: this.income,
        rent: this.rent,
        pregnant: this.pregnant,
      };

      // console.log( this.currentValues);

      this.$store.commit("formValues", this.currentValues );

      this.$cookies.set("finder_value",  this.currentValues);
      
      this.$router.push("/results");
    }
  }
  public prev() {
    this.page--;
  }

  get isLast(): boolean {
    return this.page == 6;
  }

  getChildren() {
    this.numberOfChildren = Math.round(this.numberOfChildren);
    this.children.length = this.numberOfChildren;
    for (let i = 0; i < this.numberOfChildren; i++) {
      if (!this.children[i]) {
        this.children[i] = null;
      }
    }
    return this.children;
  }

  get checkAllChildren() {
    if (this.numberOfChildren == 0 && !this.pregnant) {
      return false;
    }
    for (let i = 0; i < this.numberOfChildren; i++) {
      if (this.children[i] == null) return false;
    }
    return true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.finder {
  display: block;
  overflow-y: auto;
  min-height: calc(100vh - 150px);
  form {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-height: 100%;
    .page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      .field {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--light-orange);
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        @media (min-width: 450px) {
          width: 450px;
        }
        justify-content: center;
        &.horizontal {
          flex-direction: row;
          justify-content: space-around;
          gap: 1rem;
          label {
            margin: 0;
            text-align: left;
          }
          input,
          select {
            margin: 0;
          }
        }
        label {
          margin-bottom: 1rem;
          font-weight: bold;
          text-align: center;
          // width: 100%;
          // text-align: center;
          font-size: 1rem;
          &.checkbox {
            background-color: var(--orange);
            padding: 0.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            color: white;
            margin: 0;
            min-width: 100px;
            text-align: center;
            &.is-true {
              background-color: var(--cyan);
            }
          }
        }
        input,
        select {
          margin-bottom: 0.75rem;
          border: none;
          outline: none;
          padding: 0.25rem;
          border-radius: 0.5rem;
          text-align: center;
          font-size: 0.75rem;
          color: var(--blue);
          font-weight: bold;
          width: 100%;

          option {
            // text-align: center;;
          }
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
        &.radio {
          input[type="radio"] {
            display: none;
          }
          label {
            margin: 0;
            cursor: pointer;
          }
          span.radio {
            display: inline-block;
            width: 24px;
            height: 24px;
            border: 3px var(--cyan) solid;
            border-radius: 50%;
            margin-bottom: -4px;
            margin-left: 5px;
            &.active {
              background-color: var(--cyan);
            }
          }
        }
        &.checkbox {
          input[type="checkbox"] {
            display: none;
          }
        }
        p.description {
          // margin: 0;
          font-size: 0.75rem;
        }
      }
    }
    nav {
      position: sticky;
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 1rem;
      bottom: 0px;
      flex-direction: column;

      @media (min-width: 450px) {
        flex-direction: row;
      }
      button {
        // background-color: var(--bright-orange);
        // color: var(--blue);
        // border: none;
        // padding: 0.25rem 0.5rem;
        // border-radius: 8px;
        // cursor: pointer;
        // font-weight: 500;
        // transition: 200ms background-color, 200ms color;
        &.primary {
          // background: var(--orange);
        }
        &:disabled {
          // color: #888;
          // background: #eee;
        }
      }
    }
  }
}
</style>
