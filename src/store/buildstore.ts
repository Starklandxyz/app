import { create } from "zustand";
import { Coord } from "../../node_modules/@latticexyz/utils/src/index";

export type BuildStore = {
    //wallet => coord
    bases: Map<string, Coord>,
    // setBase: (key: string, coord: Coord) => void;
};

export const buildStore = create<BuildStore>((set) => ({
    bases: new Map(),
    // setBase: (key, coord) => set((state) => {
    //     const newBases = new Map(state.bases);
    //     newBases.set(key, coord);
    //     return { bases: newBases };
    // })
}));
