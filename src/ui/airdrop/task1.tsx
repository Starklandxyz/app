import foodIcon from "../../../public/assets/icons/food.png"
import ironIcon from "../../../public/assets/icons/iron.png"
import goldIcon from "../../../public/assets/icons/gold.png"
import soldierIcon from "../../../public/assets/icons/soldier.png"
import { store } from "../../store/store";
import { useEffect, useMemo, useRef } from "react";
import { ComponentValue, Has, defineSystem, getComponentEntities, getComponentValue, setComponent } from "../../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../../dojo/parseEvent";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import gifticon from "../../../public/assets//icons/gifticon.png"
import { toastError, toastSuccess } from "../../utils";

export default function Task1() {
    const { account, phaserLayer } = store();
    const {
        networkLayer: {
            systemCalls: { airdrop },
            components: sqlComponent,
        }
    } = phaserLayer!

    const userairdrop = getComponentValue(sqlComponent.Airdrop, getEntityIdFromKeys([1n, BigInt(account ? account.address : ""), 1n]))

    const myBase = useComponentValue(sqlComponent.Base, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));

    const claimairdrop = async () => {
        if (!account) {
            return
        }
        const result = await airdrop(account, 1, 1)
        if (result && result.length > 0) {
            toastSuccess("Airdrop success")
        } else {
            toastError("Airdrop failed")
        }
    }

    //have a base
    const task1Button = useMemo(() => {
        if (!account) {
            return <div>Not Satisfied</div>
        }
        if (myBase) {
            if (userairdrop) {
                return <div>Claimed</div>
            } else {
                return <img src={gifticon} onClick={() => claimairdrop()} style={{ color: "green",cursor:"pointer" }} />
            }
        }
        return <div>Not Satisfied</div>
    }, [myBase,userairdrop])

    return (
        <tr>
            <td>1. Build a Base</td>
            <td>
                <img src={soldierIcon} />x10
                <img style={{ marginLeft: 5 }} src={foodIcon} />x4000
                <img style={{ marginLeft: 5 }} src={goldIcon} />x500
                <img style={{ marginLeft: 5 }} src={ironIcon} />x500
            </td>
            <td>{task1Button}</td>
        </tr>
    )
}