import { create } from "zustand";
import { Troop } from "../types/Troop";

export type TroopStore = {
    //key : owner_index
    troops: Map<string, Troop>
};

export const troopStore = create<TroopStore>(() => ({
    troops: new Map(),
}));
