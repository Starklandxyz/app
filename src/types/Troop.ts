import { Coord } from "../../node_modules/@latticexyz/utils/src/index"

export class Troop {
    //id => owner + "_" + index
    public id: string = ""
    public owner: string = ""
    public index = 0
    public from: Coord = { x: 0, y: 0 }
    public to: Coord = { x: 0, y: 0 }
    public startTime: number = 0
    public totalTime: number = 0
    public amount: number = 0;
    public distance = 0
    public retreat = false

    constructor(owner_: string, from_: Coord, to_: Coord, startTime_: number) {
        this.owner = owner_;
        this.from = from_;
        this.to = to_;
        this.startTime = startTime_;
    }
}

export function Troop2Troop(t:any){
    const owner = t.owner
    const index = t.index
    const from = {x:t.from_x,y:t.from_y}
    const to = {x:t.to_x,y:t.to_y}
    const startTime = t.start_time
    const balance = t.balance
    const retreat = t.retreat
    const troop = new Troop(owner,from,to,startTime)
    troop.amount = balance
    troop.retreat = retreat
    troop.id = owner +"_"+index
    troop.distance = t.distance
    return troop
}