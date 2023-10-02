import { create } from "zustand";
import { Building } from "../types";
import { Coord } from "@latticexyz/utils";
// import { Player } from "../dojo/createSystemCalls";

export type BuildStore = {
    //position=>buidings
    buildings: Map<number, Building>,
    //wallet => coord
    bases:Map<string,Coord>,
};

export const buildStore = create<BuildStore>(() => ({
    buildings: new Map(),
    bases:new Map()
}));


