import { store } from "../store/store";
import { ClickWrapper } from "./clickWrapper";
import styled from "styled-components";
import { controlStore } from "../store/controlStore";
import { Troop } from "../types/Troop";
import { calDistanceFromBase, getTimestamp, toastError, toastSuccess } from "../utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { Troop_Food, Troop_Speed } from "../contractconfig";
import { Has, defineSystem, getComponentValue } from "../../node_modules/@latticexyz/recs/src/index";
import { Coord } from "../../node_modules/@latticexyz/utils/src/index";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { getEntityIdFromKeys } from "../dojo/parseEvent";

export default function SendTroopPanel() {
    const { account, phaserLayer } = store()
    const { sendTroopCtr } = controlStore()
    const [inputValue, setInputValue] = useState(1)

    const {
        networkLayer: {
            world,
            components,
            systemCalls: { sendTroop },
        }
    } = phaserLayer!

    const troops = useEntityQuery([Has(components.Troop)],{updateOnValueChange:true})

    const myBase = useComponentValue(components.Base, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));
    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!account) {
            return 0
        }
        const value = event.target.value
        try {
            // const w = userWarriors.get(account.address)
            const w = calWarrior()
            if (w) {
                if (parseInt(value) > w) {
                    return
                }
            } else {
                return 0
            }
            if (parseInt(value) < 1) {
                return
            }
            setInputValue(parseInt(value))
        } catch (error) {

        }

    }

    const cancel = () => {
        controlStore.setState({ sendTroopCtr: { troop: sendTroopCtr.troop, show: false } })
        setInputValue(1)
    }

    const confirm = async () => {
        if (!account) {
            return
        }
        if(!sendTroopCtr.troop){
            return
        }
        const food_need = Troop_Food * calDistanceFromBase(myBase,sendTroopCtr.troop.to) * inputValue

        const entityIndex = getEntityIdFromKeys([1n,BigInt(account.address)])
        if (getComponentValue(components.Food,entityIndex)?.balance! < food_need) {
            toastError("Food is not enough")
            return
        }
        const w = calWarrior()
        console.log("confirm", w, inputValue);

        if (!w || inputValue > w) {
            toastError("Warrior is not enough")
            return
        }
        const troop = sendTroopCtr.troop
        if (!troop) {
            toastError("Send failed")
            return
        }
        const troop_id = getAvailableTroopId()
        const result = await sendTroop(account, 1, inputValue, troop_id, troop.from.x, troop.from.y, troop.to.x, troop.to.y);
        if (result && result.length > 0) {
            toastSuccess("Troop Success")
        } else {
            toastError("Troop failed")
        }
        cancel()
    }

    const getDistance = useMemo(()=>{
        if(!sendTroopCtr.troop){
            return 0
        }
        return calDistanceFromBase(myBase,sendTroopCtr.troop.to)
    },[myBase,sendTroopCtr])

    const calFood = useMemo(() => {
        if(!sendTroopCtr.troop){
            return 0
        }
        const result = Troop_Food * calDistanceFromBase(myBase,sendTroopCtr.troop.to) * inputValue
        return result
    }, [sendTroopCtr, inputValue])

    const calTime = useMemo(() => {
        if(!sendTroopCtr.troop){
            return "0s"
        }
        const result = Troop_Speed * calDistanceFromBase(myBase,sendTroopCtr.troop.to)
        return result + "s"
    }, [sendTroopCtr, inputValue])

    const calWarrior = () => {
        if(!myBase){
            return 0 
        }
        const w = getComponentValue(components.Warrior,getEntityIdFromKeys([1n,BigInt(myBase.x),BigInt(myBase.y)]))
        if(w){
            return w.balance
        }else{
            return 0 
        }
    }

    const getWarrior = useMemo(() => {
        return calWarrior()
    }, [account,myBase])

    // const calTroopID = () => {
    //     if (!account) {
    //         return 1
    //     }
    //     let id = 1

    //     troops.forEach((value, key) => {
    //         const ks = key.split("_")
    //         // console.log("calTroopID",ks,account.address);
    //         if (ks[0] == account.address) {
    //             if (value.startTime == 0) {
    //                 id = parseInt(ks[1])
    //                 return
    //             }
    //             id++
    //         }
    //     })
    //     console.log("calTroopID", id);
    //     return id
    // }


    const getAvailableTroopId = () => {
        // console.log("getMyTroopSize",account,troops);
        if(!account){
            return 0 
        }
        var size = 0

        troops.map(entity=>{
            const troop = getComponentValue(components.Troop,entity)
            // console.log("getMyTroopSize",entity,troop);
            if(troop?.owner == account.address){
                if(troop?.start_time!=0){
                    size++
                }else{
                    return troop.index
                }
            }
        })
        return size
    }

    const getTroopID = useMemo(() => {
        return getAvailableTroopId()
    }, [account, troops]) 

    return (
        <ClickWrapper>
            <Container>
                {
                    sendTroopCtr.show && <div style={{ width: 340, height: 260, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                        <p style={{ color: "pink" }}>Send Troop</p>
                        <table cellSpacing={13}>
                            <tr>
                                <td>Position : ({sendTroopCtr.troop!.to.x},{sendTroopCtr.troop!.to.y})</td>
                                <td>Owner : None</td>
                            </tr>
                            <tr>
                                <td>
                                    Distance : {getDistance}
                                </td>
                                <td>
                                    TroopID : {getTroopID}
                                </td>
                            </tr>
                            <tr>
                                <td>Time : {calTime}</td>
                                <td>Consume : {calFood} Food</td>
                            </tr>
                            <tr>
                                <td>
                                    Send Soldier:
                                </td>
                                <td>
                                    <input onChange={inputChange} type="number" style={{ width: 50 }} value={inputValue} /> / {getWarrior}
                                </td>
                            </tr>
                        </table>
                        <button onClick={() => cancel()} style={{ marginLeft: 10, marginRight: 10 }}>Cancel</button>
                        <button onClick={() => confirm()}>Confirm</button>
                    </div>
                }
            </Container>
        </ClickWrapper>
    )
}

const Container = styled.div`
    position: absolute;
    top:40%;
    left: 40%;
    color:white;
`;