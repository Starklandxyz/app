import { create } from "zustand";

export type PlayerStore = {
    rank: number;
    //owner => map(coord => warriors)
    territoryMap : Map<string, Map<string, number>>;
};

export const playerStore = create<PlayerStore>(() => ({
    rank: 0,
    territoryMap : new Map(),
}));