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

export default function Task2() {
    const { account, phaserLayer } = store();
    const {
        networkLayer: {
            systemCalls: { airdrop },
            components: sqlComponent,
        }
    } = phaserLayer!

    const userairdrop = getComponentValue(sqlComponent.Airdrop, getEntityIdFromKeys([1n, BigInt(account ? account.address : ""), 2n]))

    const myBase = useComponentValue(sqlComponent.Base, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));

    const claimairdrop = async () => {
        if (!account) {
            return
        }
        const result = await airdrop(account, 1, 2)
        if (result && result.length > 0) {
            toastSuccess("Airdrop success")
        } else {
            toastError("Airdrop failed")
        }
    }

    //have a base
    const taskButton = useMemo(() => {
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
        <td>2. Have 20 Warriors</td>
        <td>
            <img style={{ marginLeft: 5 }} src={foodIcon} />x2000
            <img style={{ marginLeft: 5 }} src={goldIcon} />x500
            <img style={{ marginLeft: 5 }} src={ironIcon} />x500
        </td>
        <td>{taskButton}</td>
    </tr>
    )
}