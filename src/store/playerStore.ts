import { create } from "zustand";
import { Coord } from "../types";

export type PlayerStore = {
    rank: number;
};

export const playerStore = create<PlayerStore>(() => ({
    rank: 0
}));