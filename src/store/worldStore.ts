import { create } from "zustand";

export type WorldStore = {
    map_id: number;
};

export const worldStore = create<WorldStore>(() => ({
    map_id: 9999
}));