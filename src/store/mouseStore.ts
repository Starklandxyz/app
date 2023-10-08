import { create } from "zustand";

export type MouseStore = {
    x: number,
    y: number,
    down: boolean
};

export const mouseStore = create<MouseStore>(() => ({
    x: 0,
    y: 0,
    down: false
}));