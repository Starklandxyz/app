import { create } from "zustand";
import { Coord } from "../types";
import { Queue } from "../types/Queue";

export type MouseStore = {
    // x: number,
    // y: number,
    frozen:boolean,
    coord:Coord
    down: boolean
    downCoord:Coord|undefined,
    upCoord:Coord|undefined,
    coords:Queue<Coord>
};

export const mouseStore = create<MouseStore>(() => ({
    // x: 0,
    // y: 0,
    frozen:false,
    coord:{x:0,y:0},
    down: false,
    downCoord:undefined,
    upCoord:undefined,
    coords:new Queue<Coord>()
}));