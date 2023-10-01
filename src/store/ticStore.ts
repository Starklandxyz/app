import { create } from "zustand";

export type TicStore = {
    timenow: number
};

export const ticStore = create<TicStore>(() => ({
    timenow: 0
}));
