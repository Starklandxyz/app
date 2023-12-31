import foodIcon from "../../../public/assets/icons/food.png"
import ironIcon from "../../../public/assets/icons/iron.png"
import goldIcon from "../../../public/assets/icons/gold.png"
import soldierIcon from "../../../public/assets/icons/soldier.png"
import { store } from "../../store/store";
import { useEffect, useMemo, useRef } from "react";
import { ComponentValue, Has, defineSystem, getComponentEntities, getComponentValue, setComponent } from "../../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../../dojo/parseEvent";
import { useComponentValue, useEntityQuery } from "../../../node_modules/@latticexyz/react";
import gifticon from "../../../public/assets//icons/gifticon.png"
import { toastError, toastSuccess } from "../../utils";
import { AirdropClaimButton } from "../components/AirdropClaimButton";

export default function Task2() {
    const airdropIndex = 2
    const { account, phaserLayer } = store();
    const {
        networkLayer: {
            systemCalls: { airdrop },
            components: sqlComponent,
        }
    } = phaserLayer!

    const userairdrop = useComponentValue(sqlComponent.Airdrop, getEntityIdFromKeys([1n, BigInt(account ? account.address : ""), BigInt(airdropIndex)]))

    const userWarrior = useComponentValue(sqlComponent.UserWarrior, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));

    const airdropConfig = useComponentValue(sqlComponent.AirdropConfig, getEntityIdFromKeys([1n, BigInt(airdropIndex)]))

    const claimairdrop = async () => {
        if (!account) {
            return
        }
        const result = await airdrop(account, 1, airdropIndex)
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
        if (userWarrior) {
            if (userairdrop) {
                return <div>Claimed</div>
            } else {
                if(userWarrior.balance>=30)
                return <AirdropClaimButton onClick={ claimairdrop}/>
                // <div style={{color:"yellow",cursor:"pointer"}} onClick={() => claimairdrop()}>
                // <img src={gifticon}  style={{ color: "green" }} />Claim</div>
            }
        }
        return <div>Not Satisfied</div>
    }, [userWarrior,userairdrop])


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
        <td>2. Have 30 Warriors</td>
        {getRewardDiv}
        <td>{taskButton}</td>
    </tr>
    )
}