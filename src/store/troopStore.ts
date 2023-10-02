import { create } from "zustand";
import { Troop } from "../types/Troop";

export type TroopStore = {
    troops: Map<string, Troop>
};

export const troopStore = create<TroopStore>(() => ({
    troops: new Map()
}));
