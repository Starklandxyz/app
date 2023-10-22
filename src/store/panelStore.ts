import { create } from "zustand";
import { Troop } from "../types/Troop";
import { Coord } from "../../node_modules/@latticexyz/utils/src/index";
import { ReactNode } from "react";

export type PanelStore = {
    showTask: boolean,

    showLuckyPack: boolean,

    showBoard: boolean,

    fightResult: { show: boolean, status: "win" | "lose" | "loading" | undefined },

    monsterResult: { show: boolean, status: "loading" | "win"|"fail"|undefined, pack: number },
};

export const panelStore = create<PanelStore>(() => ({
    showTask: false,
    showLuckyPack: false,
    showBoard: false,
    fightResult: { show: false, status: "loading" },
    monsterResult: { show: false, status: "loading", pack: 0 },
}));
