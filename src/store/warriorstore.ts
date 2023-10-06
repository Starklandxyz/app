import { create } from "zustand";

export type WarriorStore = {
    userWarriors: Map<string, number>,
    
    //key : x_y => value : balance
    landWarriors: Map<string, number>,
};

export const warriorStore = create<WarriorStore>(() => ({
    // warriors: [],
    userWarriors: new Map(),
    landWarriors: new Map()
}));
