import foodIcon from "../../../public/assets/icons/food.png"
import ironIcon from "../../../public/assets/icons/iron.png"
import goldIcon from "../../../public/assets/icons/gold.png"
import soldierIcon from "../../../public/assets/icons/soldier.png"
import { store } from "../../store/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { ComponentValue, Has, defineSystem, getComponentEntities, getComponentValue, setComponent } from "../../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../../dojo/parseEvent";
import { useComponentValue, useEntityQuery } from "../../../node_modules/@latticexyz/react";
import gifticon from "../../../public/assets//icons/gifticon.png"
import { toastError, toastSuccess } from "../../utils";
import { BuildType } from "../../types/Build";
import { Coord } from "../../types";
import { AirdropClaimButton } from "../components/AirdropClaimButton";

export default function Task7() {
    const airdropIndex = 7
    const { account, phaserLayer } = store();
    const {
        networkLayer: {
            systemCalls: { airdrop },
            components: sqlComponent,
        }
    } = phaserLayer!

    const userairdrop = useComponentValue(sqlComponent.Airdrop, getEntityIdFromKeys([1n, BigInt(account ? account.address : ""), BigInt(airdropIndex)]))
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

    const airdropConfig = useComponentValue(sqlComponent.AirdropConfig, getEntityIdFromKeys([1n, BigInt(airdropIndex)]))

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
            if(land && land.owner == account.address && land.building == BuildType.IronMine){
                has = true
                x = land.x
                y = land.y
                break
            }
        }

        if (has) {
            // const airdrop = getComponentValue(sqlComponent.Airdrop, getEntityIdFromKeys([1n, BigInt(account.address), BigInt(airdropIndex)]))
            if (userairdrop) {
                return <div>Claimed</div>
            } else {
                // return <img src={gifticon} onClick={() => claimairdrop(x,y)} style={{ color: "green", cursor: "pointer" }} />
                return <AirdropClaimButton onClick={() => claimairdrop(x,y)}/>
                //  <div style={{color:"yellow",cursor:"pointer"}} onClick={() => claimairdrop(x,y)}>
                // <img src={gifticon}  style={{ color: "green" }} />Claim</div>
            }
        }
        return <div>Not Satisfied</div>
    }, [userairdrop, mapLands])

    const getRewardDiv = useMemo(() => {
        // console.log("getRewardDiv",airdropConfig);
        return <>
            {
                airdropConfig ?
                    <td>
                        {
                            airdropConfig.reward_warrior == 0 ? <></> : <><img src={soldierIcon} />x{airdropConfig.reward_warrior}</>
                        }
                        {
                            airdropConfig.reward_food == 0 ? <></> : <><img style={{ marginLeft: 5 }} src={foodIcon} />x{airdropConfig.reward_food/1_000_000}</>
                        }
                        {
                            airdropConfig.reward_gold == 0 ? <></> : <><img style={{ marginLeft: 5 }} src={goldIcon} />x{airdropConfig.reward_gold/1_000_000}</>
                        }
                        {
                            airdropConfig.reward_iron == 0 ? <></> : <><img style={{ marginLeft: 5 }} src={ironIcon} />x{airdropConfig.reward_iron/1_000_000}</>
                        }
                    </td> : <td></td>
            }</>

    }, [airdropConfig])

    return (
        <tr>
            <td>7. Build a IronMine</td>
            {getRewardDiv}
            <td>{taskButton}</td>
        </tr>
    )
}