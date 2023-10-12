import foodIcon from "../../../public/assets/icons/food.png"
import ironIcon from "../../../public/assets/icons/iron.png"
import goldIcon from "../../../public/assets/icons/gold.png"
import soldierIcon from "../../../public/assets/icons/soldier.png"
import { store } from "../../store/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { ComponentValue, Has, defineSystem, getComponentEntities, getComponentValue, setComponent } from "../../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../../dojo/parseEvent";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import gifticon from "../../../public/assets//icons/gifticon.png"
import { toastError, toastSuccess } from "../../utils";
import { BuildType } from "../../types/Build";
import { Coord } from "../../types";

export default function Task8() {
    const airdropIndex = 8
    const { account, phaserLayer } = store();
    const {
        networkLayer: {
            systemCalls: { airdrop },
            components: sqlComponent,
        }
    } = phaserLayer!

    const userairdrop = getComponentValue(sqlComponent.Airdrop, getEntityIdFromKeys([1n, BigInt(account ? account.address : ""), 2n]))
    const mapLands = useEntityQuery([Has(sqlComponent.Land)], { updateOnValueChange: true })

    const claimairdrop = async (x:number,y:number) => {
        if (!account) {
            return
        }
        const result = await airdrop(account, 1, airdropIndex,x,y)
        if (result && result.length > 0) {
            toastSuccess("Airdrop success")
        } else {
            toastError("Airdrop failed")
        }
    }

    const taskButton = useMemo(() => {
        if (!account) {
            return <div>Not Satisfied</div>
        }
        let has = false
        let x = 0
        let y = 0
        for (let index = 0; index < mapLands.length; index++) {
            const entity = mapLands[index];
            const land = getComponentValue(sqlComponent.Land,entity)
            if(land && land.owner == account.address && land.building == BuildType.Camp){
                has = true
                x = land.x
                y = land.y
                break
            }
        }

        if (has) {
            const airdrop = getComponentValue(sqlComponent.Airdrop, getEntityIdFromKeys([1n, BigInt(account.address), BigInt(airdropIndex)]))
            if (airdrop) {
                return <div>Claimed</div>
            } else {
                return <img src={gifticon} onClick={() => claimairdrop(x,y)} style={{ color: "green", cursor: "pointer" }} />
            }
        }
        return <div>Not Satisfied</div>
    }, [userairdrop, mapLands])

    return (
        <tr>
            <td>8. Build a Camp</td>
            <td>
                <img src={soldierIcon} />x20
                <img style={{ marginLeft: 5 }} src={foodIcon} />x1000
                <img style={{ marginLeft: 5 }} src={goldIcon} />x100
                <img style={{ marginLeft: 5 }} src={ironIcon} />x100
            </td>
            <td>{taskButton}</td>
        </tr>
    )
}