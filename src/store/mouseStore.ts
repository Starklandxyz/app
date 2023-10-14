import { create } from "zustand";
import { Coord } from "../types";
import { Queue } from "../types/Queue";

export type MouseStore = {
    // x: number,
    // y: number,
    coord:Coord
    down: boolean
    coords:Queue<Coord>
};

export const mouseStore = create<MouseStore>(() => ({
    // x: 0,
    // y: 0,
    coord:{x:0,y:0},
    down: false,
    coords:new Queue<Coord>()
}));