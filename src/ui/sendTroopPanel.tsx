import { buildStore } from "../store/buildstore";
import { store } from "../store/store";
import { ClickWrapper } from "./clickWrapper";
import styled from "styled-components";
import { controlStore } from "../store/controlStore";
import { Troop } from "../types/Troop";
import { troopStore } from "../store/troopStore";
import { getTimestamp, toastError, toastSuccess } from "../utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { Troop_Food, Troop_Speed } from "../contractconfig";
import { resourceStore } from "../store/resourcestore";
import { warriorStore } from "../store/warriorstore";
import { Has, defineSystem, getComponentValue } from "../../node_modules/@latticexyz/recs/src/index";

export default function SendTroopPanel() {
    const { bases } = buildStore()
    const { account, phaserLayer, networkLayer } = store()
    const { sendTroopCtr } = controlStore()
    const { landWarriors } = warriorStore()
    const { food } = resourceStore()
    const { troops } = troopStore()
    const [inputValue, setInputValue] = useState(1)

    const troopsRef = useRef<Map<string, Troop>>(new Map())

    useEffect(() => {
        troopsRef.current = troops
    }, [troops])

    const {
        networkLayer: {
            world,
            components,
        }
    } = phaserLayer!

    const {
        systemCalls: { sendTroop },
    } = networkLayer!

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
        const food_need = Troop_Food * calDistance() * inputValue
        if (food < food_need) {
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
        const troop_id = calTroopID()
        const result = await sendTroop(account, 1, inputValue, troop_id, troop.from.x, troop.from.y, troop.to.x, troop.to.y);
        if (result && result.length > 0) {
            toastSuccess("Troop Success")
        } else {
            toastError("Troop failed")
        }
        cancel()
    }

    const addTroop = (t: any) => {
        console.log("addTroop", t);
        const newTroops = new Map(troopsRef.current)
        const balance = t.balance as number
        const from_x = t.from_x as number
        const from_y = t.from_y as number
        const index = t.index as number
        const to_x = t.to_x as number
        const to_y = t.to_y as number
        const retreat = t.retreat as boolean
        const owner = t.owner as string
        const distance = t.distance as number
        const start_time = t.start_time as number
        const from = { x: from_x, y: from_y }
        const to = { x: to_x, y: to_y }
        const troop = new Troop(owner, from, to, start_time)
        const tid = troop.owner + "_" + index
        troop.amount = balance;
        troop.retreat = retreat
        troop.id = tid
        troop.index = index
        troop.distance = distance
        troop.totalTime = distance * Troop_Speed
        newTroops.set(tid, troop)
        troopStore.setState({
            troops: newTroops
        })
    }

    useEffect(() => {
        defineSystem(world, [Has(components.Troop)], ({ value }) => {
            console.log("Troop change", value);
            const t = value[0]
            if (t) {
                addTroop(t)
            }
        })
    }, [])

    const calDistance = () => {
        console.log("calDistance");

        if (!account) {
            return 0
        }
        const base = bases.get(account.address)
        if (!base) {
            return 0
        }
        if (!sendTroopCtr.troop) {
            return 0
        }
        const dis1 = Math.abs(base.x - sendTroopCtr.troop.to.x) + Math.abs(base.y - sendTroopCtr.troop.to.y)
        let dis = dis1
        const dis2 = Math.abs(base.x + 1 - sendTroopCtr.troop.to.x) + Math.abs(base.y - sendTroopCtr.troop.to.y)
        if (dis > dis2) {
            dis = dis2
        }
        const dis3 = Math.abs(base.x + 1 - sendTroopCtr.troop.to.x) + Math.abs(base.y + 1 - sendTroopCtr.troop.to.y)
        if (dis > dis3) {
            dis = dis3
        }
        const dis4 = Math.abs(base.x - sendTroopCtr.troop.to.x) + Math.abs(base.y + 1 - sendTroopCtr.troop.to.y)
        if (dis > dis4) {
            dis = dis4
        }
        return dis
    }

    const calFood = useMemo(() => {
        const result = Troop_Food * calDistance() * inputValue
        return result
    }, [sendTroopCtr, inputValue])

    const calTime = useMemo(() => {
        const result = Troop_Speed * calDistance() * inputValue
        return result + "s"
    }, [sendTroopCtr, inputValue])

    const calWarrior = () => {
        if (!account) {
            return 0
        }
        const base = bases.get(account.address)
        if (!base) {
            return 0
        }
        const key = base.x + "_" + base.y
        // console.log("calWarrior", key);
        const w = landWarriors.get(key)
        // console.log("calWarrior", bases);
        // console.log("calWarrior", base, w, account.address);
        if (w) {
            return w
        } else {
            return 0
        }
    }

    const getWarrior = useMemo(() => {
        return calWarrior()
    }, [account, landWarriors.values()])

    const calTroopID = () => {
        if (!account) {
            return 1
        }
        let id = 1
        troops.forEach((value, key) => {
            const ks = key.split("_")
            // console.log("calTroopID",ks,account.address);
            if (ks[0] == account.address) {
                if (value.startTime == 0) {
                    id = parseInt(ks[1])
                    return
                }
                id++
            }
        })
        console.log("calTroopID", id);
        return id
    }

    const getTroopID = useMemo(() => {
        return calTroopID()
    }, [account, troops.keys()])

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
                                    Distance : {calDistance()}
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