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