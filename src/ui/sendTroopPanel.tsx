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
import closeicon from "../../public/assets//icons/closeicon.png"
import { BuildType, getBuildName } from "../types/Build";
import { Land } from "../generated/graphql";

export default function SendTroopPanel() {
    const { account, phaserLayer } = store()
    const { sendTroopCtr } = controlStore()
    const [inputValue, setInputValue] = useState(1)
    const [fromArray, setFromArray] = useState<Array<Land>>([])
    const [toArray, setToArray] = useState<Array<Land>>([])

    const {
        networkLayer: {
            world,
            components,
            systemCalls: { sendTroop },
        }
    } = phaserLayer!

    const troops = useEntityQuery([Has(components.Troop)], { updateOnValueChange: true })

    const lands = useEntityQuery([Has(components.Land)], { updateOnValueChange: true })

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

        if(sendTroopCtr.troop.to.x==sendTroopCtr.troop.from.x && sendTroopCtr.troop.to.y==sendTroopCtr.troop.from.y){
            toastError("Can not send to same land")
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
        return Math.abs(to.x - from.x) + Math.abs(to.y - from.y)
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

    useEffect(() => {
        if (!myBase) { return }
        if (!sendTroopCtr.show) {
            setFromArray([])
            setToArray([])
            return
        }
        const arr: Array<Land> = []
        const baseLand: Land = {}
        baseLand.x = myBase.x
        baseLand.y = myBase.y
        baseLand.owner = account?.address!
        baseLand.building = BuildType.Base
        arr.push(baseLand)
        for (let index = 0; index < lands.length; index++) {
            const entity = lands[index];
            const land = getComponentValue(components.Land, entity)
            if (!land) { continue }
            console.log("setFromArray", land);
            if (land.owner == account?.address!) {
                if (land.building == BuildType.Fort) {
                    console.log("setFromArray set");
                    arr.push(land)
                }
            }
        }
        console.log("sendTroopCtr", sendTroopCtr, myBase);

        if (sendTroopCtr.troop?.from.x == myBase.x && sendTroopCtr.troop?.from.y == myBase.y) {
            setFromArray(arr)
        }
        if (sendTroopCtr.troop?.to.x == myBase.x && sendTroopCtr.troop?.to.y == myBase.y) {
            setToArray(arr)
        }
    }, [lands, myBase, sendTroopCtr.show])

    const selectAccount = (e: any, from: boolean) => {
        // select(e.target.value);
        const coord = e.target.value
        const x = coord.split(",")[0]
        const y = coord.split(",")[1]

        const troop = sendTroopCtr.troop
        if (!troop) { return }
        if (from) { troop.from = { x, y } }
        else {
            troop.to = { x, y }
        }

        const ctr = {
            troop: troop,
            show: true
        }
        controlStore.setState({ sendTroopCtr: ctr })
    };

    return (
        <ClickWrapper>
            <Container>
                {
                    sendTroopCtr.show && <div style={{ width: 400, zIndex: 100, height: 270, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.8)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                        <div style={{ color: "pink", width: 400, textAlign: "center", fontSize: 20, padding: 10, paddingTop: 15 }}>Send Troop</div>
                        <img src={closeicon} style={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }} onClick={() => cancel()} />
                        <table cellSpacing={13}>
                            <tr>
                                <td>From : ({sendTroopCtr.troop!.from.x},{sendTroopCtr.troop!.from.y})</td>
                                <td>
                                    {
                                        fromArray.length > 1 && <select
                                            className="nes-select"
                                            onChange={(e) => selectAccount(e,true)}
                                            value={sendTroopCtr.troop?.from.x + "," + sendTroopCtr.troop?.from.y}
                                        >
                                            {fromArray.map((value, index) => {
                                                return (
                                                    <option value={value.x + "," + value.y} key={index}>
                                                        {
                                                            getBuildName(value.building) + `(${value.x},${value.y})`
                                                        }
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>To : ({sendTroopCtr.troop!.to.x},{sendTroopCtr.troop!.to.y})</td>
                                <td>
                                    {
                                        toArray.length > 1 && <select
                                            className="nes-select"
                                            onChange={(e) => selectAccount(e,false)}
                                            value={sendTroopCtr.troop?.to.x + "," + sendTroopCtr.troop?.to.y}
                                        >
                                            {toArray.map((value, index) => {
                                                return (
                                                    <option value={value.x + "," + value.y} key={index}>
                                                        {
                                                            getBuildName(value.building) + `(${value.x},${value.y})`
                                                        }
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    }
                                </td>
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
                        <LoadingButton style={{ marginLeft: 150 }} initialText="Confirm" loadingText="Confirm..." onClick={confirm} />
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