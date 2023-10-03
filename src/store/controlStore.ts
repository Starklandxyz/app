import { create } from "zustand";
import { Troop } from "../types/Troop";

export type ControlStore = {
    sendTroop: { troop: Troop | undefined, show: boolean }
};

export const controlStore = create<ControlStore>(() => ({
    sendTroop: { troop: undefined, show: false }
}));
