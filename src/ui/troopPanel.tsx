import { useCallback, useEffect, useMemo, useState } from "react";
import { ClickWrapper } from "./clickWrapper";
import styled from "styled-components";
import { store } from "../store/store";
import TroopItem from "./components/TroopItem";
import { Has, defineSystem, getComponentValue } from "../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { handleSQLResult } from "../utils/handleutils";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { Troop, Troop2Troop } from "../types/Troop";

export default function TroopPanel() {
    const { account, phaserLayer } = store()
    const [showContent, setShowContent] = useState(true);
    const toggleContent = useCallback(() => {
        setShowContent(!showContent);
    }, [showContent]);

    const {
        networkLayer: {
            components,
            network: { graphSdk }
        }
    } = phaserLayer!
    const myBase = useComponentValue(components.Base, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));

    const [myTroops,setMyTroops] = useState<Array<Troop>>([])
    const troops = useEntityQuery([Has(components.Troop)],{updateOnValueChange:true})

    useEffect(() => {
        fetchTroops()
    }, [])

    const fetchTroops = async () => {
        const ts = await graphSdk.getAllTroops({ map_id: "0x1" })
        const edges = ts.data.entities?.edges
        console.log("fetchTroops",edges);
        handleSQLResult(edges,components)
    }

    useEffect(()=>{
        if(!account){
            return
        }
        const array:Array<Troop> = []
        troops.map(entity=>{
            const troop = getComponentValue(components.Troop,entity)
            if(troop?.owner == account.address && troop?.start_time!=0){
                array.push(Troop2Troop(troop))
            }
        })
        setMyTroops(array)
    },[account,troops])

    return (<ClickWrapper>
        <Container>
            {
                account &&
                <div style={{ overflow: "auto", width: 220, maxHeight: 420, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                    <div style={{display:"flex"}}>
                        <p style={{ flex:1, fontSize: 20, color: "pink" }}>Troops - <span style={{ fontSize: "17px", color: "lightblue" }}> {myTroops.length}</span></p>
                        <button style={{ height:"22px", alignSelf:"center", justifyContent:"flex-end"}} onClick={toggleContent}>Show/Hide</button>
                    </div>
                    {showContent && (
                        <div>
                            {[...myTroops.values()].map(value => (
                                (value.owner == account.address && value.startTime!=0 ) && <TroopItem key={value.id} base={myBase} troop={value} />
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
    top: 15%;
    right: 1%;
    color:white;
`;
