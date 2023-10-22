import { create } from "zustand";
import { Coord } from "../types";

export type UpdateStore = {
    updateLand: Coord | undefined;
};

export const updateStore = create<UpdateStore>(() => ({
    updateLand: undefined
}));


