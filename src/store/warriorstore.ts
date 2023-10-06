import { create } from "zustand";

export type WarriorStore = {
    // warriors: Array<Warrior>,
    userWarriors: Map<string, number>,
    landWarriors: Map<string, number>,
};

export const warriorStore = create<WarriorStore>(() => ({
    // warriors: [],
    userWarriors: new Map(),
    landWarriors: new Map()
}));
