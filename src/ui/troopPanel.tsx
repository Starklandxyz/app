import { useCallback, useEffect, useMemo, useState } from "react";
import { ClickWrapper } from "./clickWrapper";
import styled from "styled-components";
import { troopStore } from "../store/troopStore";
import { store } from "../store/store";
import { Troop } from "../types/Troop";
import TroopItem from "./components/TroopItem";
import { playerStore } from "../store/playerStore";
import { mapStore } from "../store/mapStore";
import { buildStore } from "../store/buildstore";
import { Troop_Speed } from "../contractconfig";

export default function TroopPanel() {
    const { troops } = troopStore()
    const { account, phaserLayer } = store()
    const { player } = playerStore()
    const { bases } = buildStore()
    const [showContent, setShowContent] = useState(true);
    const toggleContent = useCallback(() => {
        setShowContent(!showContent);
    }, [showContent]);
    // const [userTroop, setUserTroop] = useState<Array<Troop>>([])

    const {
        networkLayer: {
            components,
            network: { graphSdk }
        }
    } = phaserLayer!

    // useEffect(() => {
    //     if (!account) {
    //         return
    //     }
    // const pTroops: Array<Troop> = []
    // troops.forEach((value, _) => {
    //     if (value.owner == account.address)
    //         pTroops.push(value)
    // })
    // setUserTroop(pTroops)
    // }, [troops.values()])

    // useEffect(() => {
    //     if (!player || !account) {
    //         return
    //     }
    //     fetchTroops()
    // }, [player])

    useEffect(() => {
        fetchTroops()
    }, [])

    const fetchTroops = async () => {
        const ts = await graphSdk.getAllTroops({ map_id: "0x1" })
        // console.log("fetchTroops", ts);
        const edges = ts.data.entities?.edges
        const tt = new Map(troops)
        if (edges) {
            for (let index = 0; index < edges.length; index++) {
                const element = edges[index];
                const components = element?.node?.components
                if (components) {
                    for (let index = 0; index < components.length; index++) {
                        const element = components[index];
                        if (element?.__typename == "Troop") {
                            const t = new Troop(element.owner, { x: element.from_x, y: element.from_y },
                                { x: element.to_x, y: element.to_y }, element.start_time);
                            t.amount = element.balance
                            t.distance = element.distance
                            t.totalTime = element.distance * Troop_Speed
                            t.index = element.index
                            t.id = t.owner + "_" + t.index
                            console.log("fetchTroops",t);
                            
                            tt.set(t.id, t)
                        }
                    }
                }
            }
        }
        troopStore.setState({ troops: tt })
    }

    return (<ClickWrapper>
        <Container>
            {
                account &&
                <div style={{ overflow: "auto", width: 220, maxHeight: 420, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                    <div style={{display:"flex"}}>
                        <p style={{ flex:1, fontSize: 20, color: "pink" }}>Troops - <span style={{ fontSize: "17px", color: "lightblue" }}> {troops.size}</span></p>
                        <button style={{ height:"22px", alignSelf:"center", justifyContent:"flex-end"}} onClick={toggleContent}>Show/Hide</button>
                    </div>
                    {showContent && (
                        <div>
                            {[...troops.values()].map(value => (
                                (value.owner == account.address) && <TroopItem key={value.id} base={bases.get(account.address)} troop={value} />
                            ))}
                        </div>
                    )}
                </div>
            }

        </Container>
    </ClickWrapper>)
}

const Container = styled.div`
    position: absolute;
    top: 20%;
    right: 2%;
    color:white;
`;
