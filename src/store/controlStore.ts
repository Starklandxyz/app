import { create } from "zustand";
import { Troop } from "../types/Troop";
import { Coord } from "../../node_modules/@latticexyz/utils/src/index";

export type ControlStore = {
    sendTroopCtr: { troop: Troop | undefined, show: boolean },
    buildLand: Coord | undefined
};

export const controlStore = create<ControlStore>(() => ({
    sendTroopCtr: { troop: undefined, show: false },
    buildLand: undefined
}));
