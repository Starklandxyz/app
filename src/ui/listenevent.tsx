import { useEffect, useRef } from "react";
import { store } from "../store/store";
import { handleSQLResult } from "../utils/handleutils";


export default function ListenEvent() {
    const { account, phaserLayer } = store();

    //id+component => bool
    const updateMapRef = useRef<Map<string, boolean>>(new Map())

    const {
        world,
        networkLayer: {
            components,
            network: { graphSdk, wsClient }
        }
    } = phaserLayer!

    useEffect(() => {
        console.log("subscription");

        const query = `subscription {
            entityUpdated{
                id
                keys
                componentNames
                updatedAt
            }
          }`;
        const subscription = wsClient
            .request({ query })
            // so lets actually do something with the response
            .subscribe({
                next({ data }: any) {
                    if (data) {
                        let entityUpdated = data.entityUpdated;
                        console.log("We got something", entityUpdated.componentNames);
                        console.log(entityUpdated);
                        let id = entityUpdated.id
                        let keys = entityUpdated.keys
                        let cs = entityUpdated.componentNames.split(",")

                        for (let index = 0; index < cs.length; index++) {
                            const element = cs[index];
                            console.log("We got something", element,id);
                            switch (element) {
                                case "Land": handleLandUpdated(id + "Land", keys); break;
                                case "LandMiner": handleLandMinerUpdated(id + "LandMiner", keys); break;
                                case "Player": handlePlayerUpdated(id + "Player", keys); break;
                                case "Troop": handleTroopUpdated(id + "Troop", keys); break;
                                case "Warrior": handleWarriorUpdated(id + "Warrior", keys); break;
                            }
                        }
                    }
                },
            });
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const handleLandUpdated = async (id: string, keys: Array<string>) => {
        if (updateMapRef.current.has(id)) {
            return
        }
        console.log("handleLandUpdated",id);
        updateMapRef.current.set(id, true)
        const ls = await graphSdk.getLand({ keys: keys })
        const edges = ls.data.entities?.edges
        handleSQLResult(edges, components)
    }

    const handleLandMinerUpdated = async (id: string, keys: Array<string>) => {
        if (updateMapRef.current.has(id)) {
            return
        }
        console.log("handleLandMinerUpdated",id);
        updateMapRef.current.set(id, true)
        const ls = await graphSdk.getLandMiner({ keys: keys })
        const edges = ls.data.entities?.edges
        handleSQLResult(edges, components)
    }
    const handlePlayerUpdated = async (id: string, keys: Array<string>) => {
        if (updateMapRef.current.has(id)) {
            return
        }
        console.log("handlePlayerUpdated",id);
        updateMapRef.current.set(id, true)
        const ls = await graphSdk.getPlayer({ keys: keys })
        const edges = ls.data.entities?.edges
        handleSQLResult(edges, components)
    }
    const handleTroopUpdated = async (id: string, keys: Array<string>) => {
        if (updateMapRef.current.has(id)) {
            return
        }
        console.log("handleTroopUpdated",id);
        updateMapRef.current.set(id, true)
        const ls = await graphSdk.getTroop({ keys: keys })
        const edges = ls.data.entities?.edges
        handleSQLResult(edges, components)
    }
    const handleWarriorUpdated = async (id: string, keys: Array<string>) => {
        if (updateMapRef.current.has(id)) {
            return
        }
        console.log("handleWarriorUpdated",id);
        updateMapRef.current.set(id, true)
        const ls = await graphSdk.getWarrior({ keys: keys })
        const edges = ls.data.entities?.edges
        handleSQLResult(edges, components)
    }

    return (<></>)
}