export class Cathegory {
    public allreadyRequested: boolean;
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public sort: number,
        public nor: number = 0,
        public content: any[] = [],
    ){
        this.allreadyRequested = false;
    }
}