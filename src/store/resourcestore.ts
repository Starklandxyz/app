import { create } from "zustand";

export type ResourceStore = {
    food: number,
    gold: number,
    iron: number
};

export const resourceStore = create<ResourceStore>(() => ({
    food: 0,
    gold: 0,
    iron: 0
}));
