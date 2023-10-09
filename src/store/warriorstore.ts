import { create } from "zustand";

export type WarriorStore = {
    //key : x_y => value : balance
    landWarriors: Map<string, number>,
};

export const warriorStore = create<WarriorStore>(() => ({
    landWarriors: new Map()
}));
