import { store } from "../store/store";
import { ClickWrapper } from "./clickWrapper";
import styled from "styled-components";
import { controlStore } from "../store/controlStore";
import { Troop } from "../types/Troop";
import { calDistanceFromBase, calDistanceToBase, getTimestamp, toastError, toastSuccess } from "../utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { Troop_Speed } from "../contractconfig";
import { Has, defineSystem, getComponentValue } from "../../node_modules/@latticexyz/recs/src/index";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import LoadingButton from "./components/LoadingButton";
import { mouseStore } from "../store/mouseStore";

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

    const troops = useEntityQuery([Has(components.Troop)], { updateOnValueChange: true })

    const warriors = useEntityQuery([Has(components.Warrior)], { updateOnValueChange: true })

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
        if (!sendTroopCtr.troop) {
            return
        }

        const warrior_config = getComponentValue(components.WarriorConfig, getEntityIdFromKeys([1n]))
        const food_need = warrior_config?.Troop_Food! * calDistance() * inputValue

        const entityIndex = getEntityIdFromKeys([1n, BigInt(account.address)])
        const balance = getComponentValue(components.Food, entityIndex)?.balance!
        // console.log("confirm",food_need,balance);
        if (balance < food_need) {
            toastError("Food is not enough")
            return
        }

        const iron_need = warrior_config?.Troop_Iron! * calDistance() * inputValue
        const ironbalance = getComponentValue(components.Iron, entityIndex)?.balance!
        // console.log("confirm",food_need,balance);
        if (ironbalance < iron_need) {
            toastError("Iron is not enough")
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

    const calDistance = () => {
        if (!sendTroopCtr.troop) {
            return 0
        }
        if (!myBase) {
            return 0
        }
        const from = sendTroopCtr.troop.from
        const to = sendTroopCtr.troop.to
        //从base出发
        if (from.x == myBase.x && from.y == myBase.y) {
            return calDistanceFromBase(myBase, to)
        }
        //回base
        if (to.x == myBase.x && to.y == myBase.y) {
            return calDistanceToBase(myBase, from)
        }
        return 0
    }

    const getDistance = useMemo(() => {
        return calDistance()
    }, [myBase, sendTroopCtr])

    const calConsume = useMemo(() => {
        if (!sendTroopCtr.troop) {
            return 0
        }

        const config = getComponentValue(components.WarriorConfig, getEntityIdFromKeys([1n]))
        console.log("calConsume", config);

        const food = config?.Troop_Food! * calDistance() * inputValue / 1_000_000
        const iron = config?.Troop_Iron! * calDistance() * inputValue / 1_000_000
        // const result = Troop_Food * calDistance() * inputValue
        return food + " Food, " + iron + " Iron"
    }, [sendTroopCtr, inputValue])

    const calTime = useMemo(() => {
        if (!sendTroopCtr.troop) {
            return "0s"
        }
        const result = Troop_Speed * calDistance()
        return result + "s"
    }, [sendTroopCtr, inputValue])

    const calWarrior = () => {
        // console.log("calWarrior", myBase);
        if (!myBase) {
            return 0
        }
        if (!sendTroopCtr || !sendTroopCtr.troop) {
            return 0
        }
        const from = sendTroopCtr.troop.from
        const w = getComponentValue(components.Warrior, getEntityIdFromKeys([1n, BigInt(from.x), BigInt(from.y)]))
        // console.log("calWarrior", myBase, w);
        if (w) {
            return w.balance
        } else {
            return 0
        }
    }

    const getWarrior = useMemo(() => {
        return calWarrior()
    }, [account, myBase, warriors, sendTroopCtr])

    const getAvailableTroopId = () => {
        // console.log("getMyTroopSize",account,troops);
        if (!account) {
            return 1
        }
        var size = 1

        for (let index = 0; index < troops.length; index++) {
            const entity = troops[index];
            const troop = getComponentValue(components.Troop, entity)
            // console.log("getMyTroopSize",entity,troop);
            if (troop?.owner == account.address) {
                if (troop?.start_time != 0) {
                    size++
                } else {
                    size = troop.index
                    break
                }
            }

        }
        return size
    }

    const max = () => {
        setInputValue(calWarrior())
    }

    const maxButton = useMemo(() => {
        return <span onClick={() => max()} style={{ marginLeft: 20, cursor: "pointer" }}>max</span>
    }, [account, troops, sendTroopCtr])

    const getTroopID = useMemo(() => {
        return getAvailableTroopId()
    }, [account, troops, sendTroopCtr])

    useEffect(() => {
        if (sendTroopCtr.show) {
            mouseStore.setState({ frozen: true })
        } else {
            mouseStore.setState({ frozen: false })
        }
    }, [sendTroopCtr.show])

    return (
        <ClickWrapper>
            <Container>
                {
                    sendTroopCtr.show && <div style={{ width: 340, zIndex: 100, height: 260, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.8)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
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
                                <td>Consume : {calConsume}</td>
                            </tr>
                            <tr>
                                <td>
                                    Send Soldier:
                                </td>
                                <td>
                                    <input onChange={inputChange} type="number" style={{ width: 50 }} value={inputValue} /> / {getWarrior}
                                    {maxButton}
                                </td>
                            </tr>
                        </table>
                        <button onClick={() => cancel()} style={{ marginLeft: 10, marginRight: 10 }}>Cancel</button>
                        <LoadingButton initialText="Confirm" loadingText="Confirm..." onClick={confirm} />
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