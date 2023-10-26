import { create } from "zustand";
import { Land } from "../types/Land";

export type PlayerBuildStore = {
    bases:Array<Land>,
    camps:Array<Land>,
    farmlands:Array<Land>,
    goldmines:Array<Land>,
    ironmines:Array<Land>,
};

export const playerBuildStore = create<PlayerBuildStore>(() => ({
    bases:[],
    camps:[],
    farmlands:[],
    goldmines:[],
    ironmines:[],
}));