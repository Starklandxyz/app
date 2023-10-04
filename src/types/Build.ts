export enum BuildType{
    None,
    Base,
    Farmland,
    IronMine,
    GoldMine,
    Camp
}

export class BuildInfo{
    public desc = ""
    public output = ""
    public foodNeed = 0
    public goldNeed = 0
    public ironNeed = 0

    constructor(desc_:string,output_:string,food_:number,gold_:number,iron_:number){
        this.desc = desc_;
        this.output = output_;
        this.foodNeed = food_;
        this.goldNeed = gold_;
        this.ironNeed = iron_;
    }
}