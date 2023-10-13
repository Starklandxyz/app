import { create } from "zustand";
import { Coord } from "../types";

export type LoadingStore = {
    progress: number;
};

export const loadingStore = create<LoadingStore>(() => ({
    progress: 0
}));