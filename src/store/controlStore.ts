import { create } from "zustand";
import { Troop } from "../types/Troop";
import { Coord } from "@latticexyz/utils";

export type ControlStore = {
    sendTroop: { troop: Troop | undefined, show: boolean },
    buildLand: Coord | undefined
};

export const controlStore = create<ControlStore>(() => ({
    sendTroop: { troop: undefined, show: false },
    buildLand: undefined
}));
