import { useEffect, useRef } from "react";
import { playerStore } from "../store/playerStore";
import { store } from "../store/store";
import { buildStore } from "../store/buildstore";
import { warriorStore } from "../store/warriorstore";
import { resourceStore } from "../store/resourcestore";
import { Has, defineSystem, getComponentValue } from "@latticexyz/recs";

export default function ListenEvent() {
    // const { player: storePlayer, players, eths } = playerStore()
    const { account, phaserLayer } = store();
    const { bases } = buildStore()
    const { userWarriors } = warriorStore()
    // const { food, gold, iron } = resourceStore()
    const accountRef = useRef<string>()

    useEffect(() => {
        if (!account) {
            return
        }
        console.log("account change ", account?.address);
        accountRef.current = account?.address
    }, [account])

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
                        console.log("We got something:" + entityUpdated.componentNames);
                        console.log(entityUpdated);

                        if (entityUpdated.componentNames == "") {
                            // fetchSingleBuilding(entityUpdated.keys[0])
                        } else if (entityUpdated.componentNames == "Player") {
                            // console.log("We got something player my account:" + accountRef.current + ",change account:" + entityUpdated.keys[0]);

                            if (entityUpdated.keys[0] != "0x0" && entityUpdated.keys[0] != accountRef.current) {
                                // fetchAllPlayers()
                                // fetchPlayerInfo(entityUpdated.keys[0])
                            }
                        }
                        // console.log("We got something!", data);
                    }
                },
            });
        return () => {
            subscription.unsubscribe()
        }
    }, [])
    return (<></>)
}