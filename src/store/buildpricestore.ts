import { create } from "zustand";

export type BuildPriceStore = {
    goldprices: Map<number,number>,
    foodprices: Map<number,number>,
    ironprices: Map<number,number>,
};

export const buildPriceStore = create<BuildPriceStore>(() => ({
    goldprices: new Map(),
    foodprices: new Map(),
    ironprices: new Map(),
}));