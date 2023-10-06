import { WorldCoord } from "@latticexyz/phaserx/dist/types";
import { create } from "zustand";

export type WarriorStore = {
    // warriors: Array<Warrior>,
    userWarriors: Map<string, number>,
    landWarriors: Map<WorldCoord, number>,
};

export const warriorStore = create<WarriorStore>(() => ({
    // warriors: [],
    userWarriors: new Map(),
    landWarriors: new Map()
}));
