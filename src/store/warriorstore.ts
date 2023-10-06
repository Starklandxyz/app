import { create } from "zustand";
import { Warrior } from "../types/Warrior";

export type WarriorStore = {
    warriors: Array<Warrior>
};

export const warriorStore = create<WarriorStore>(() => ({
    warriors: []
}));
