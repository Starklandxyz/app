import { create } from "zustand";
import { Troop } from "../types/Troop";
import { Coord } from "../../node_modules/@latticexyz/utils/src/index";
import { ReactNode } from "react";

export type ControlStore = {
    sendTroopCtr: { troop: Troop | undefined, show: boolean },

    //需要修建时，这就是需要修建的land
    buildLand: Coord | undefined,

    //玩家此刻点击的地块位置
    clickedLand: Coord | undefined,

    //用来控制是否显示点击地块后弹出来的buttons
    tipButtonShow: { show: boolean, x: number, y: number },

    //用来给其他地方定义点击地块会弹出的button
    showTipButtons: ReactNode | undefined,

    addTipButton: ReactNode | undefined,

    removeBuild:Coord|undefined,

};

export const controlStore = create<ControlStore>(() => ({
    sendTroopCtr: { troop: undefined, show: false },
    buildLand: undefined,
    clickedLand: undefined,
    showTipButtons: undefined,
    tipButtonShow: { show: false, x: 0, y: 0 },
    addTipButton: undefined,
    removeBuild:undefined,

}));
