import { Cathegory } from '@/shared/cathegory';
import { ChildrenStatus, FinderStatus, HousingSituationStatus, IncomeStatus, InsuranceStatus, LifeSituationStatus, WorkingStatus } from '@/shared/status';
import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

@Module({ namespaced: false, name: 'finder-service' })
class ResultsService extends VuexModule {
  public _cathegories: { [key: number]: Cathegory } = {};
  public _resultTypes: any = {};
  public _actions: any = {};
  public _answers: FinderStatus = new FinderStatus();
  // public _answers = {"children":{"alreadyChildren":true,"numberOfChildren":2,"birthDates":{"0":"2021-11-26","1":"2021-11-26"},"pregnant":false,"isValid":true},"lifeSituation":{"lifeSituationBasic":1,"lifeSituationDivorce":1,"violence":false,"isValid":true},"housingSituation":{"place":"10000","housingSituationType":1,"costs":2222,"isValid":true},"insurance":{"type":1,"privateInsurances":1,"publicInsurances":null,"isValid":true},"working":{"situation":1,"jobType":null,"partTimeType":null,"education":1,"socialBenefitType":null,"isValid":true},"income":{"gross":10,"disabilityPensionExists":true,"disabilityPension":20,"entertainsExists":true,"entertains":30,"childBenefitExists":true,"childBenefit":40,"rentalIncomeExists":true,"rentalIncome":50,"isValid":true},"isValid":false}

  @Mutation
  public setCategoryResults(data: { id: number, results: any[] }): void {
    this._cathegories[data.id].content = data.results;
  }
  @Mutation
  public setNumberOfResults(meta: { id: number, nor: number }): void {
    this._cathegories[meta.id].nor = meta.nor;
  }
  @Mutation
  public initResultTypes(resultTypes: []): void {
    resultTypes.forEach((rt: any) => {
      this._resultTypes[rt.id] = {
        id: rt.id,
        name: rt.name,
        weight: rt.weight,
      }
    });
  }
  @Mutation
  public initCathegories(cathegories: any[]): void {
    cathegories.forEach(cat => {
      this._cathegories[cat.id] = 
        new Cathegory(
          cat.id,
          cat.name,
          cat.description,
          cat.sort,
        )
      
    });
  }
  @Mutation
  public saveResults(results: []): void {
    results.forEach((result: any) => {
      if(result.id in this._cathegories){
        this._cathegories[result.id].content.push({
            id: result.id,
            actions: result.actions,
            description: result.description,
            end_date: result.end_date,
            start_date: result.start_date,
            name: result.name,
            short_description: result.short_description,
            type: this._resultTypes[result.type],
          })
        }
    });
  }
  @Mutation
  public initAnswers(answers: FinderStatus) {
    this._answers = answers;
  }

  public get cathegories(): { [key: number]: Cathegory } {
    return this._cathegories;
  }

  public get answers(): FinderStatus {
    return this._answers;
  }
}

export default ResultsService;