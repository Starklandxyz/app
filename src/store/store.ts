import { create } from "zustand";
import { PhaserLayer } from "../phaser";
import { Account, Provider } from "starknet";
import { Camera } from "../../node_modules/@latticexyz/phaserx/src/index";
// import { Player } from "../dojo/createSystemCalls";

export type Store = {
    phaserLayer: PhaserLayer | null;
    account: Account | null;
    camera:Camera|null
};

export const store = create<Store>(() => ({
    phaserLayer: null,
    account: null,
    camera:null
}));


