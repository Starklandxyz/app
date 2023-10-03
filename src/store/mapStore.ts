import { create } from "zustand";
import { Land } from "../types/Land";
// import { Player } from "../dojo/createSystemCalls";

export type MapStore = {
    //land id => land
    lands: Map<string, Land>,
};

export const mapStore = create<MapStore>(() => ({
    lands: new Map(),
}));


