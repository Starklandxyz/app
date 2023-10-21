export enum BuildType{
    None,
    Base,
    Farmland,
    IronMine,
    GoldMine,
    Camp,
    Fort
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

export const getBuildName = (type:BuildType)=>{
    switch(type){
        case BuildType.None:return "Land";
        case BuildType.Base:return "Base";
        case BuildType.Farmland:return "Farmland";
        case BuildType.IronMine:return "IronMine";
        case BuildType.GoldMine:return "GoldMine";
        case BuildType.Camp:return "Camp";
        case BuildType.Fort:return "Fort";
    }
}