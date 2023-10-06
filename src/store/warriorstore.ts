import { create } from "zustand";
import { Warrior } from "../types/Warrior";

export type WarriorStore = {
    warriors: Array<Warrior>,
    userWarriors: Map<string, number>,
};

export const warriorStore = create<WarriorStore>(() => ({
    warriors: [],
    userWarriors: new Map()
}));
