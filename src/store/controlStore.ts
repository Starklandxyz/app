import { create } from "zustand";
import { Troop } from "../types/Troop";
import { Coord } from "../../node_modules/@latticexyz/utils/src/index";

export type ControlStore = {
    sendTroopCtr: { troop: Troop | undefined, show: boolean },

    //需要修建时，这就是需要修建的land
    buildLand: Coord | undefined,

    //需要选择挖矿的区域时，这个land就是矿场所在地
    startMiningLand:Coord|undefined,
};

export const controlStore = create<ControlStore>(() => ({
    sendTroopCtr: { troop: undefined, show: false },
    buildLand: undefined,
    startMiningLand:undefined
}));
