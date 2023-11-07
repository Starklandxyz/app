import { useEffect, useRef } from "react";
import { store } from "../store/store";
import { handleSQLResult, handleWssResult } from "../utils/handleutils";


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
                model_names
                created_at
                updated_at
                event_id
                models{
                __typename
          ... on Player{
            owner
            nick_name
            joined_time
          }
          __typename
          ... on HBase {
            map_id
            owner
            x
            y
          }
          __typename
          ... on LandOwner {
            owner
            map_id
            total
          }
          __typename
          ... on RewardPoint {
            map_id
            owner
            balance
          }
          __typename
          ... on UserWarrior {
            map_id
            owner
            balance
          }
          __typename
          ... on LandMiner {
            map_id,
            x,
            y,
            miner_x,
            miner_y
          }
          __typename
          ... on Troop{
            map_id
            owner
            index
            balance
            from_x
            from_y
            to_x
            to_y
            start_time
            distance
            retreat
          }
          __typename
          ... on Land {
            map_id,
            x,
            y,
            owner,
            building,
            level
          }
          __typename
          ... on Warrior {
            map_id
            x,
            y,
            balance
          }
                }
            }
          }`;
        const subscription = wsClient
            .request({ query })
            // so lets actually do something with the response
            .subscribe({
                next({ data }: any) {
                    if (data) {
                        let entityUpdated = data.entityUpdated;
                        // console.log("We got something", entityUpdated.model_names);
                        // console.log(entityUpdated);
                        let id = entityUpdated.id + "_" + entityUpdated.updated_at
                        let keys = entityUpdated.keys
                        let models = entityUpdated.models
                        let cs = entityUpdated.model_names.split(",")
                        handleWssResult(models,keys,components)
                    }
                },
            });
        return () => {
            subscription.unsubscribe()
        }
    }, [])
    return (<></>)
}