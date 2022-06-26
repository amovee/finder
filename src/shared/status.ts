import { states } from "../shared/helpers";

export interface Status {
  updateValidity(): void;
  getQueryFilters(): string[];
  getResultFilter(result: any): boolean;
  isValid: boolean;
  status: FinderStatus;
  toJson(): any;
}

export class ParentStatus implements Status {
  public status!: FinderStatus;
  constructor(
    public gender: string | null = null,
    public birthDate: string | null = null,
    public isValid: boolean = false
  ) {}
  public toJson(): any {
    return Object.assign(
      {},
      this.gender === null ? null : { gen: this.gender },
      this.birthDate === null ? null : { bd: this.birthDate },
      this.isValid === null ? null : { iV: this.isValid }
    );
  }

  public static fromJson(json: any): ParentStatus {
    return new ParentStatus(
      json.gen != null ? json.gen : null,
      json.bd != null ? json.bd : null,
      json.iV != null ? json.iV : false
    );
  }
  public updateValidity(): void {
    this.isValid = !!this.gender && !!this.birthDate;
  }
  public getQueryFilters(): string[] {
    const filters: string[] = [];
    if (this.gender) {
      filters.push(`{"_or":[{"parent_gender":{"_null":true}},{"parent_gender":{"_eq":"${this.gender}"}}]}`);
    }
    if(this.birthDate) {
      const years: number = new Date().getFullYear() - new Date(this.birthDate).getFullYear();
      filters.push(`{"_or":[{"min_age_parent":{"_null":true}},{"min_age_parent":{"_lte":${years}}}]}`);
      filters.push(`{"_or":[{"max_age_parent":{"_null":true}},{"max_age_parent":{"_gte":${years}}}]}`);
    }
    return filters;
  }
  public getResultFilter(result: any): boolean {
    return true;
  }
}
export class PrivacyStatus implements Status {
  public status!: FinderStatus;
  constructor(
    public accept: boolean = false,
    public isValid: boolean = false
  ) {}
  public toJson(): any {
    return Object.assign(
      {},
      this.accept === null ? null : { ac: this.accept },
      this.isValid === null ? null : { iV: this.isValid }
    );
  }

  public static fromJson(json: any): PrivacyStatus {
    return new PrivacyStatus(
      json.ac != null ? json.ac : null,
      json.iV != null ? json.iV : false
    );
  }
  public updateValidity(): void {
    this.isValid = this.accept;
  }
  public getQueryFilters(): string[] {
    return [];
  }
  public getResultFilter(result: any): boolean {
    return true;
  }
}
export class ChildrenStatus implements Status {
  public status!: FinderStatus;
  constructor(
    public alreadyChildren: boolean | null = null,
    public numberOfChildren: number | null = null,
    public birthDates: string[] = [],
    public pregnant: boolean | null = null,
    public isValid: boolean = false
  ) {}
  public toJson(): any {
    return Object.assign(
      {},
      this.alreadyChildren === null ? null : { aC: this.alreadyChildren },
      this.numberOfChildren === null ? null : { nOC: this.numberOfChildren },
      this.birthDates === null ? null : { bD: this.birthDates },
      this.pregnant === null ? null : { p: this.pregnant },
      this.isValid === null ? null : { iV: this.isValid }
    );
  }

  public static fromJson(json: any): ChildrenStatus {
    return new ChildrenStatus(
      json.aC != null ? json.aC : null,
      json.nOC != null ? json.nOC : null,
      json.bD != null ? json.bD : {},
      json.p != null ? json.p : null,
      json.iV != null ? json.iV : false
    );
  }
  public updateValidity(): void {
    const cantBePregnant = this.status.parent.gender == "male";
    if(cantBePregnant && this.numberOfChildren != null) {
      this.alreadyChildren = true;
    }
    if (this.alreadyChildren == false) {
      this.isValid = !!this.pregnant && !cantBePregnant;
      return;
    }
    this.isValid = false;
    if (this.alreadyChildren == null) return;
    if (this.numberOfChildren == null) return;
    if (this.birthDates.length < this.numberOfChildren) return;
    this.isValid = true;
    for (let i = 0; i < this.numberOfChildren; i++) {
      if (!this.birthDates[i]) {
        this.isValid = false;
        return;
      }
    }
  }
  public getQueryFilters(): string[] {
    const cantBePregnant = this.status.parent.gender == "male";
    const filters: string[] = [];
    if (this.numberOfChildren) {
      filters.push(
        `{"_or":[{"min_children_count":{"_null":true}},{"min_children_count":{"_lte":${this.numberOfChildren}}}]}`
      );
      filters.push(
        `{"_or":[{"max_children_count":{"_null":true}},{"max_children_count":{"_gte":${this.numberOfChildren}}}]}`
      );
    }
    if (!this.pregnant || cantBePregnant) {
      filters.push(`{"is_pregnant":{"_eq":false}}`);
    }
    // max_age: 17
    // min_age: 0

    return filters;
  }
  public getResultFilter(result: any): boolean {
    if (
      (result.min_age == null && result.max_age == null) ||
      (this.alreadyChildren && this.birthDates == null)
    ) {
      return true;
    }

    const minAgeYear = Math.floor(result.min_age);
    const minAgeMonth = result.min_age - Math.floor(result.min_age);
    const maxAgeYear = Math.floor(result.max_age);
    const maxAgeMonth = result.max_age - Math.floor(result.max_age);
    for (let i = 0; i < this.birthDates.length; i++) {
      const year: number =
        new Date().getFullYear() - new Date(this.birthDates[i]).getFullYear();
      const month: number =
        new Date().getMonth() - new Date(this.birthDates[i]).getMonth();
      // const day: number = new Date().getDate() - new Date(this.birthDates[i]).getDate();
      const minCondition =
        result.min_age == null || result.min_age < year + month / 12;
      const maxCondition =
        result.max_age == null || result.max_age > year + month / 12;
      if (minCondition && maxCondition) {
        return true;
      }
    }
    return false;
  }
}
export class LifeSituationStatus implements Status {
  public status!: FinderStatus;
  constructor(
    public lifeSituationBasic: number | null = null,
    public lifeSituationDivorce: number | null = null,
    public violence: boolean | null = null,
    public isValid: boolean = false
  ) {}

  public static fromJson(json: any): LifeSituationStatus {
    return new LifeSituationStatus(
      json.lSB != null ? json.lSB : null,
      json.lSD != null ? json.lSD : null,
      json.v != null ? json.v : null,
      json.iV != null ? json.iV : false
    );
  }

  public toJson(): any {
    return Object.assign(
      {},
      this.lifeSituationBasic === null
        ? null
        : { lSB: this.lifeSituationBasic },
      this.lifeSituationDivorce === null
        ? null
        : { lSD: this.lifeSituationDivorce },
      this.violence === null ? null : { v: this.violence },
      this.isValid === null ? null : { iV: this.isValid }
    );
  }
  public updateValidity(): void {
    if (this.lifeSituationBasic != null && this.violence != null) {
      if (this.lifeSituationBasic == 1) {
        this.isValid = this.lifeSituationDivorce != null;
      } else {
        this.isValid = true;
      }
    } else {
      this.isValid = false;
    }
  }
  public getQueryFilters(): string[] {
    const filters: string[] = [];
    if (!this.violence) {
      filters.push(`{"victim_of_violence":{"_eq":false}}`);
    }
    // max_age: 17
    // min_age: 0

    return filters;
    return [];
  }

  public getResultFilter(result: any): boolean {
    return result.has_relationship == null ||
      result.has_relationship.length == 0
      ? true
      : result.has_relationship
          .map((r: any) => r.relationship_types_id)
          .includes(this.relationshipType);
  }
  get relationshipType(): number | null {
    switch (this.lifeSituationBasic) {
      case 0:
        return 1;
      case 1:
        switch (this.lifeSituationDivorce) {
          case 0:
            return 2;
          case 1:
            return 3;
          case 2:
            return 4;
          default:
            return null;
        }
      case 2:
        return 5;
      case 3:
        return 6;
      default:
        return null;
    }
    return 0;
  }
}
export class HousingSituationStatus implements Status {
  public status!: FinderStatus;
  constructor(
    public place: string | null = null,
    public housingSituationType: number | null = null,
    public costs: number | null = null,
    public isValid: boolean = false
  ) {}

  public static fromJson(json: any): HousingSituationStatus {
    return new HousingSituationStatus(
      json.p != null ? json.p : null,
      json.hST != null ? json.hST : null,
      json.c != null ? json.c : null,
      json.iV != null ? json.iV : false
    );
  }

  public toJson(): any {
    return Object.assign(
      {},
      this.place === null ? null : { p: this.place },
      this.housingSituationType === null
        ? null
        : { hST: this.housingSituationType },
      this.costs === null ? null : { c: this.costs },
      this.isValid === null ? null : { iV: this.isValid }
    );
  }
  public updateValidity(): void {
    if (
      this.place != null &&
      new RegExp("[0-9]{5}").test(this.place) &&
      this.housingSituationType != null &&
      this.costs != null
    ) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }
  public getQueryFilters(): string[] {
    const filters: string[] = [];
    if (this.costs) {
      filters.push(
        `{"_or":[{"min_rent":{"_null":true}},{"min_rent":{"_lte":${this.costs}}}]}`
      );
      filters.push(
        `{"_or":[{"max_rent":{"_null":true}},{"max_rent":{"_gte":${this.costs}}}]}`
      );
    }
    return filters;
  }

  public getResultFilter(result: any): boolean {
    let postalCodesFilter = false;
    let code = null;
    if (result.zip) {
      // TODO: only one replaceAll with regex
      code = result.zip.replaceAll("\n", "").replaceAll(" ", "");
    } else if (result.postalcodes) {
      code = result.postalcodes.replaceAll("\n", "").replaceAll(" ", "");
    }
    if (code != null) {
      code.split(",").forEach((codes: any) => {
        if (!this.place || this.place.startsWith(codes)) {
          postalCodesFilter = true;
        }
      });
    } else {
      postalCodesFilter = true;
    }

    let inRegionFilter = true;
    if (result.region != null) {
      inRegionFilter = states[+result.region].postalCodes.includes(this.place);
    }
    return inRegionFilter && postalCodesFilter;
  }
}
export class InsuranceStatus implements Status {
  public status!: FinderStatus;
  constructor(
    public type: number | null = null,
    public privateInsurances: number | null = null,
    public publicInsurances: number | null = null,
    public isValid: boolean = false
  ) {}

  public static fromJson(json: any): InsuranceStatus {
    return new InsuranceStatus(
      json.t != null ? json.t : null,
      json.prI != null ? json.prI : null,
      json.puI != null ? json.puI : null,
      json.iV != null ? json.iV : false
    );
  }

  public toJson(): any {
    return Object.assign(
      {},
      this.type === null ? null : { t: this.type },
      this.privateInsurances === null ? null : { prI: this.privateInsurances },
      this.publicInsurances === null ? null : { puI: this.publicInsurances },
      this.isValid === null ? null : { iV: this.isValid }
    );
  }
  public updateValidity() {
    if (
      (this.type == 0 && this.publicInsurances != null) ||
      (this.type == 1 && this.privateInsurances != null) ||
      this.type == 2
    ) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }
  public getQueryFilters(): string[] {
    return [];
  }

  public getResultFilter(result: any): boolean {
    if (result.has_insurance == null || result.has_insurance.length == 0) {
      return true;
    } else {
      const ids = result.has_insurance.map((r: any) => r.insurance_id);
      switch (this.type) {
        case 0:
          return ids.includes(this.publicInsurances);
        case 1:
          return ids.includes(this.privateInsurances);
        case 2:
          return false;
      }
    }
    return true;
    // has_insurance: []
  }
}

export class WorkingStatus implements Status {
  public status!: FinderStatus;
  constructor(
    public situation: number | null = null,
    public jobType: number | null = null,
    public partTimeType: number | null = null,
    public education: number | null = null,
    public socialBenefitType: number | null = null,
    public isValid: boolean = false
  ) {}

  public static fromJson(json: any): WorkingStatus {
    return new WorkingStatus(
      json.s != null ? json.s : null,
      json.jT != null ? json.jT : null,
      json.pTT != null ? json.pTT : null,
      json.e != null ? json.e : null,
      json.sBT != null ? json.sBT : null,
      json.iV != null ? json.iV : false
    );
  }

  public toJson(): any {
    return Object.assign(
      {},
      this.situation === null ? null : { s: this.situation },
      this.jobType === null ? null : { jT: this.jobType },
      this.partTimeType === null ? null : { pTT: this.partTimeType },
      this.education === null ? null : { e: this.education },
      this.socialBenefitType === null ? null : { sBT: this.socialBenefitType },
      this.isValid === null ? null : { iV: this.isValid }
    );
  }
  public updateValidity(): void {
    if (this.situation != null) {
      if (this.situation == 0) {
        if (this.jobType != null) {
          if (this.jobType == 1) {
            this.isValid = this.partTimeType != null;
          } else {
            this.isValid = true;
          }
        } else {
          this.isValid = false;
        }
      } else if (this.situation == 1) {
        this.isValid = this.education != null;
      } else if (this.situation == 2) {
        this.isValid = this.socialBenefitType != null;
      } else {
        this.isValid = true;
      }
    } else {
      this.isValid = false;
    }
  }
  public getQueryFilters(): string[] {
    return [];
  }
  public getResultFilter(result: any): boolean {
    return result.has_job_related_situation == null ||
      result.has_job_related_situation.length == 0
      ? true
      : result.has_job_related_situation
          .map((r: any) => r.job_related_situations_id)
          .includes(this.jobRelatedSituationType);
  }

  get jobRelatedSituationType(): number | null {
    switch (this.situation) {
      case 0:
        switch (this.jobType) {
          case 0:
            return 1;
          case 1:
            switch (this.partTimeType) {
              case 0:
                return 2;
              case 1:
                return 3;
              default:
                return null;
            }
          case 2:
            return 4;
          case 3:
            return 5;
          default:
            return null;
        }
      case 1:
        switch (this.education) {
          case 0:
            return 6;
          case 1:
            return 7;
          case 2:
            return 8;
          default:
            return null;
        }
      case 2:
        switch (this.socialBenefitType) {
          case 0:
            return 9;
          case 1:
            return 10;
          case 2:
            return 11;
          case 3:
            return 12;
          default:
            return null;
        }
      case 3:
        return 13;
      case 4:
        return 14;
      default:
        return null;
    }
  }
}
export class IncomeStatus implements Status {
  public status!: FinderStatus;
  constructor(
    public gross: number | null = null,
    public disabilityPensionExists: boolean | null = null,
    public disabilityPension: number | null = null,
    public entertainsExists: boolean | null = null,
    public entertains: number | null = null,
    public childBenefitExists: boolean | null = null,
    public childBenefit: number | null = null,
    public rentalIncomeExists: boolean | null = null,
    public rentalIncome: number | null = null,
    public isValid: boolean = false
  ) {}
  public static fromJson(json: any): IncomeStatus {
    return new IncomeStatus(
      json.g != null ? json.g : null,
      json.dPE != null ? json.dPE : null,
      json.dP != null ? json.dP : null,
      json.eE != null ? json.eE : null,
      json.e != null ? json.e : null,
      json.cBE != null ? json.cBE : null,
      json.cB != null ? json.cB : null,
      json.rIE != null ? json.rIE : null,
      json.rI != null ? json.rI : null,
      json.iV != null ? json.iV : false
    );
  }

  public toJson(): any {
    return Object.assign(
      {},
      this.gross === null ? null : { g: this.gross },
      this.disabilityPensionExists === null
        ? null
        : { dPE: this.disabilityPensionExists },
      this.disabilityPension === null ? null : { dP: this.disabilityPension },
      this.entertainsExists === null ? null : { eE: this.entertainsExists },
      this.entertains === null ? null : { e: this.entertains },
      this.childBenefitExists === null
        ? null
        : { cBE: this.childBenefitExists },
      this.childBenefit === null ? null : { cB: this.childBenefit },
      this.rentalIncomeExists === null
        ? null
        : { rIE: this.rentalIncomeExists },
      this.rentalIncome === null ? null : { rI: this.rentalIncome },
      this.isValid === null ? null : { iV: this.isValid }
    );
  }
  public updateValidity() {
    if (
      this.gross != null &&
      this.disabilityPensionExists != null &&
      this.entertainsExists != null &&
      this.rentalIncomeExists != null &&
      this.childBenefitExists != null &&
      (this.rentalIncomeExists == false ||
        (this.rentalIncome != null && this.rentalIncome > 0)) &&
      (this.childBenefitExists == false ||
        (this.childBenefit != null && this.childBenefit > 0)) &&
      (this.disabilityPensionExists == false ||
        (this.disabilityPension != null && this.disabilityPension > 0)) &&
      (this.entertainsExists == false ||
        (this.entertains != null && this.entertains > 0))
    ) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }
  public getQueryFilters(): string[] {
    const filters: string[] = [];
    if (this.gross) {
      let money: number = this.gross;
      if (
        this.disabilityPensionExists == true &&
        this.disabilityPension != null
      ) {
        money += this.disabilityPension;
      }
      if (this.entertainsExists == true && this.entertains != null) {
        money += this.entertains;
      }
      if (this.childBenefitExists == true && this.childBenefit != null) {
        money += this.childBenefit;
      }
      if (this.rentalIncomeExists == true && this.rentalIncome != null) {
        money += this.rentalIncome;
      }
      filters.push(
        `{"_or":[{"min_income":{"_null":true}},{"min_income":{"_lte":${money}}}]}`
      );
      filters.push(
        `{"_or":[{"max_income":{"_null":true}},{"max_income":{"_gte":${money}}}]}`
      );
    }
    return filters;
  }

  public getResultFilter(result: any): boolean {
    return true;
  }
}
export class FinderStatus {
  constructor(
    public privacy: PrivacyStatus = new PrivacyStatus(),
    public parent: ParentStatus = new ParentStatus(),
    public children: ChildrenStatus = new ChildrenStatus(),
    public lifeSituation: LifeSituationStatus = new LifeSituationStatus(),
    public housingSituation: HousingSituationStatus = new HousingSituationStatus(),
    public insurance: InsuranceStatus = new InsuranceStatus(),
    public working: WorkingStatus = new WorkingStatus(),
    public income: IncomeStatus = new IncomeStatus(),
    public isValid: boolean = false
  ) {
    this.privacy.status = this;
    this.parent.status = this;
    this.children.status = this;
    this.lifeSituation.status = this;
    this.housingSituation.status = this;
    this.insurance.status = this;
    this.working.status = this;
    this.income.status = this;
  }

  public static fromJson(json: any): FinderStatus {
    return new FinderStatus(
      json.pr != null ? PrivacyStatus.fromJson(json.pr) : new PrivacyStatus(),
      json.pa != null ? ParentStatus.fromJson(json.pa) : new ParentStatus(),
      json.ch != null ? ChildrenStatus.fromJson(json.ch) : new ChildrenStatus(),
      json.lS != null
        ? LifeSituationStatus.fromJson(json.lS)
        : new LifeSituationStatus(),
      json.hS != null
        ? HousingSituationStatus.fromJson(json.hS)
        : new HousingSituationStatus(),
      json.ins != null
        ? InsuranceStatus.fromJson(json.ins)
        : new InsuranceStatus(),
      json.wo != null ? WorkingStatus.fromJson(json.wo) : new WorkingStatus(),
      json.inc != null ? IncomeStatus.fromJson(json.inc) : new IncomeStatus(),
      json.iV != null ? json.iV : false
    );
  }

  public toJson(): any {
    return {
      pr: this.privacy.toJson(),
      pa: this.parent.toJson(),
      ch: this.children.toJson(),
      lS: this.lifeSituation.toJson(),
      hS: this.housingSituation.toJson(),
      ins: this.insurance.toJson(),
      wo: this.working.toJson(),
      inc: this.income.toJson(),
      iV: this.isValid,
    };
  }
  updateValidity(): void {
    this.isValid =
      this.privacy.isValid &&
      this.parent.isValid &&
      this.children.isValid &&
      this.lifeSituation.isValid &&
      this.housingSituation.isValid &&
      this.insurance.isValid &&
      this.working.isValid &&
      this.income.isValid;
  }
}
