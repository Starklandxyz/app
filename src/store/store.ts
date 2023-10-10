import { create } from "zustand";
import { PhaserLayer } from "../phaser";
import { Account, Provider } from "starknet";
import { Camera } from "../../node_modules/@latticexyz/phaserx/src/index";
// import { Player } from "../dojo/createSystemCalls";

export type Store = {
    phaserLayer: PhaserLayer | null;
    account: Account | null;
    actions: Array<string>;
    treasury: 0,
    camera:Camera|null
};

export const store = create<Store>(() => ({
    phaserLayer: null,
    account: null,
    actions: new Array(),
    treasury: 0,
    camera:null
}));


