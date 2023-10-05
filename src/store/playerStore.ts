import { create } from "zustand";
import { Player } from "../dojo/createSystemCalls";

export type PlayerStore = {
    player: Player | null;
    players: Map<string, Player>,
    eths: Map<string, bigint>,
    eth: bigint,
};

export const playerStore = create<PlayerStore>(() => ({
    player: null,
    players: new Map(),
    eths: new Map(),
    eth: 0n
}));


