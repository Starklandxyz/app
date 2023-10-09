import { useEffect, useRef } from "react";
import { store } from "../store/store";
import { handleSQLResult } from "../utils/handleutils";

export default function ListenEvent() {
    const { account, phaserLayer } = store();
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
                        let keys = entityUpdated.keys
                        switch (entityUpdated.componentNames) {
                            case "Land": handleLandUpdated(keys); break;
                            case "Base": handleBaseUpdated(keys); break;
                        }
                    }
                },
            });
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const handleLandUpdated = async (keys: Array<string>) => {
        const ls = await graphSdk.getLandByKey({ map_id: keys[0], x: keys[1], y: keys[2] })
        console.log("handleLandUpdated", keys, ls);
        const edges = ls.data.entities?.edges
        handleSQLResult(edges,components)
        // const mLands = new Map(mapLands)
        // if (edges) {
        //     for (let index = 0; index < edges.length; index++) {
        //         const element = edges[index];
        //         const components = element?.node?.components
        //         if(components)
        //         for (let index = 0; index < components.length; index++) {
        //             const component = components[index];
        //             if(component){
        //                 if(component.__typename=="Land"){
        //                     const x = component.x
        //                     const y = component.y
        //                     const l = Land2Land(component)
        //                     mLands.set(x+"_"+y,l)
        //                 }
        //                 if(component.__typename=="LandCost"){

        //                 }
        //             }
        //         }
        //     }
        // }
        // mapStore.setState({lands:mLands})
    }

    const handleBaseUpdated = async (keys: Array<string>) => {
        const base = await graphSdk.getBaseByKey({ map_id: keys[0], key: keys[1] })
        console.log("handleLandUpdated", keys, base);
        const edges = base.data.entities?.edges
        handleSQLResult(edges,components)
        // const mbase = new Map(bases)
        // if (edges) {
        //     for (let index = 0; index < edges.length; index++) {
        //         const element = edges[index];
        //         const components = element?.node?.components
        //         if(components)
        //         for (let index = 0; index < components.length; index++) {
        //             const component = components[index];
        //             if(component){
        //                 if(component.__typename=="Base"){
        //                     const x = component.x
        //                     const y = component.y
        //                     const owner = component.owner
        //                     mbase.set(owner,{x,y})
        //                 }
        //             }
        //         }
        //     }
        // }
        // buildStore.setState({bases:mbase})
    }

    return (<></>)
}