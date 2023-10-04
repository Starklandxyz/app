import { ObjectPool } from "@latticexyz/phaserx/dist/types";
import { buildStore } from "../store/buildstore";
import { store } from "../store/store";
import { ClickWrapper } from "./clickWrapper";
import styled from "styled-components";
import { controlStore } from "../store/controlStore";
import { Coord } from "@latticexyz/utils";
import { Troop } from "../types/Troop";
import { troopStore } from "../store/troopStore";
import { getTimestamp } from "../utils";
import { TilesetZone } from "../artTypes/world";
import { useMemo, useState } from "react";

export default function SendTroopPanel() {
    const { bases } = buildStore()
    const { account,phaserLayer } = store()
    const { sendTroop } = controlStore()
    const { troops } = troopStore()
    const [inputValue,setInputValue] = useState(1)
    const {
        scenes: {
            Main: {
                maps: {
                    Main: { putTileAt },
                },
            },
        }
    } = phaserLayer!;

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        try {
            if(parseInt(value)<1){
                return
            }
            setInputValue(parseInt(value))
        } catch (error) {
            
        }

    }

    const cancel = ()=>{
        controlStore.setState({sendTroop:{troop:sendTroop.troop,show:false}})
        setInputValue(1)
    }

    const confirm = ()=>{
        addTroop(sendTroop?.troop!.to)
        putTileAt(sendTroop?.troop!.to, TilesetZone.MyZoneWait, "Occupy");
        cancel()
    }

    const addTroop = (end: Coord) => {
        console.log("addTroopArrow");
        if(!account){
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
        if (!sendTroop.troop) {
            return 0
        }
        const dis = Math.abs(base.x - sendTroop.troop.to.x) + Math.abs(base.y - sendTroop.troop.to.y)
        return dis
    }

    const calFood = useMemo(()=>{
        const result = 10 * calDistance() * inputValue
        return result
    },[sendTroop,inputValue])

    return (
        sendTroop.show &&
        <ClickWrapper>
            <Container>
                <div style={{ width: 340, height: 260, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                    <p style={{ color: "pink" }}>Send Troop</p>
                    <table cellSpacing={13}>
                        <tr>
                            <td>Position : ({sendTroop.troop!.to.x},{sendTroop.troop!.to.y})</td>
                            <td>Owner : None</td>
                        </tr>
                        <tr>
                            <td>
                                Soldier : 1
                            </td>
                            <td>
                                Distance : {calDistance()}
                            </td>
                        </tr>
                        <tr>
                            <td>Win : 10%</td>
                            <td>Consume : {calFood} Food</td>
                        </tr>
                        <tr>
                            <td>
                                Send Soldier:
                            </td>
                            <td>
                                <input onChange={inputChange} type="number" style={{ width: 50 }} value={inputValue} /> / 10
                            </td>
                        </tr>
                    </table>
                    <button onClick={()=>cancel()} style={{ marginLeft: 10, marginRight: 10 }}>Cancel</button>
                    <button onClick={()=>confirm()}>Confirm</button>
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