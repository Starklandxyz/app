import { ObjectPool } from "@latticexyz/phaserx/dist/types";
import { buildStore } from "../store/buildstore";
import { store } from "../store/store";
import { ClickWrapper } from "./clickWrapper";
import styled from "styled-components";
import { controlStore } from "../store/controlStore";
import { Coord } from "@latticexyz/utils";
import { Troop } from "../types/Troop";
import { troopStore } from "../store/troopStore";
import { getTimestamp, toastError, toastSuccess } from "../utils";
import { TilesetZone } from "../artTypes/world";
import { useMemo, useState } from "react";
import { Troop_Food, Troop_Speed } from "../contractconfig";
import { resourceStore } from "../store/resourcestore";
import { warriorStore } from "../store/warriorstore";

export default function SendTroopPanel() {
    const { bases } = buildStore()
    const { account, phaserLayer, networkLayer } = store()
    const { sendTroopCtr } = controlStore()
    const { userWarriors } = warriorStore()
    const { food } = resourceStore()
    const { troops } = troopStore()
    const [inputValue, setInputValue] = useState(1)
    const {
        scenes: {
            Main: {
                maps: {
                    Main: { putTileAt },
                },
            },
        }
    } = phaserLayer!;
    const {
        systemCalls: { sendTroop },
    } = networkLayer!

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!account) {
            return 0
        }
        const value = event.target.value
        try {
            const w = userWarriors.get(account.address)
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
        const w = userWarriors.get(account.address)
        if (!w || inputValue > w) {
            toastError("Warrior is not enough")
            return
        }
        const troop = sendTroopCtr.troop
        if (!troop) {
            toastError("Send failed")
            return
        }
        const troop_id = 1
        const result = await sendTroop(account, 1, inputValue, troop_id, troop.from.x, troop.from.y, troop.to.x, troop.to.y);
        if (result && result.length > 0) {
            toastSuccess("Troop Success")
            addTroop(sendTroopCtr?.troop!.to)
            putTileAt(sendTroopCtr?.troop!.to, TilesetZone.MyZoneWait, "Occupy");
        } else {
            toastError("Troop failed")
        }
        cancel()
    }

    const addTroop = (end: Coord) => {
        console.log("addTroopArrow");
        if (!account) {
            return
        }
        const baseCoord = bases.get(account.address)
        if (!baseCoord) {
            return
        }
        const x = baseCoord.x + 1
        const y = baseCoord.y + 1

        const start = { x, y }

        const newTroops = new Map(troops)
        const troop = new Troop(account.address, start, end, getTimestamp())
        const tid = troop.owner + "_" + troop.startTime
        troop.amount = inputValue;
        troop.id = tid
        troop.totalTime = 10
        newTroops.set(tid, troop)
        troopStore.setState({
            troops: newTroops
        })
    }

    const calDistance = () => {
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
        const dis = Math.abs(base.x - sendTroopCtr.troop.to.x) + Math.abs(base.y - sendTroopCtr.troop.to.y)
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

    const getWarrior = useMemo(() => {
        if (!account) {
            return 0
        }
        const w = userWarriors.get(account.address)
        if (w) {
            return w
        } else {
            return 0
        }
    }, [account, userWarriors])

    return (
        sendTroopCtr.show &&
        <ClickWrapper>
            <Container>
                <div style={{ width: 340, height: 260, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
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