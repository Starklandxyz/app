import { getTimestamp, hexToString, positionToCoorp } from "../utils";
import { playerStore } from "../store/playerStore";
import foodIcon from "../../public/assets/icons/food.png"
import ironIcon from "../../public/assets/icons/iron.png"
import goldIcon from "../../public/assets/icons/gold.png"
import soldierIcon from "../../public/assets/icons/soldier.png"
import flagIcon from "../../public/assets/icons/flag.png"
import landIcon from "../../public/assets/icons/landicon.png"
import { store } from "../store/store";
import { EntityIndex } from "@latticexyz/recs";
import { useEffect, useRef } from "react";

export default function PlayerPanel() {
    const { player: storePlayer } = playerStore()
    const { account, phaserLayer } = store();

    const accountRef = useRef<string>()

    const {
        scenes: {
            Main: { maps: {
                Main: { putTileAt },
            } },
        },
        networkLayer: {
            components: {
                Player: PlayerComponent,
            },
            network: { graphSdk, wsClient }
        }
    } = phaserLayer!

    useEffect(() => {
        if (!account) {
            return
        }
        console.log("account change ", account?.address);
        accountRef.current = account?.address

        fetchPlayerInfo(account.address)
    }, [account])

    useEffect(() => {
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
                        } else if (entityUpdated.componentNames == "Townhall,Land" || entityUpdated.componentNames == "Townhall") {
                            // fetchTreasury()
                        }
                        console.log("We got something!", data);
                    }
                },
            });
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const fetchPlayerInfo = async (entity: string) => {
        const playerInfo = await graphSdk.getPlayerByKey({ key: entity })
        console.log("fetchPlayerInfo", playerInfo);
        const edges = playerInfo.data.entities?.edges

        if (edges) {
            // console.log("fetchPlayerInfo game total players:" + edges.length);
            for (let index = 0; index < edges.length; index++) {
                // console.log("fetchPlayerInfo length", edges.length);
                const element = edges[index];
                const players = element?.node?.components
                // console.log(element?.node?.keys![0], element?.node?.components![0]?.__typename);
                if (players && players[0] && players[0].__typename == "Player") {
                    console.log(players[0]);
                    if (element.node?.keys![0] == "0x0" || element.node?.keys![0] == accountRef.current) {
                        continue
                    }
                    const player = players[0] as any
                    const entityId = parseInt(element.node?.keys![0]!) as EntityIndex

                    // setComponent(PlayerComponent, entityId, {
                    //     banks: player.banks,
                    //     position: player.position,
                    //     joined_time: player.joined_time,
                    //     direction: player.direction,
                    //     nick_name: player.nick_name,
                    //     gold: player.gold,
                    //     steps: player.steps,
                    //     last_point: player.last_point,
                    //     last_time: player.last_time,
                    //     total_steps: player.total_steps,
                    //     total_used_eth:player.total_used_eth
                    // })
                }
            }
        }
    }

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <div
                data-tooltip-id="my-tooltip"
                data-tooltip-content="user name"
                data-tooltip-place="top"
            >{hexToString(storePlayer?.nick_name)}</div>
            <div data-tooltip-id="my-tooltip"
                data-tooltip-content="Food"
                data-tooltip-place="top" style={{ marginTop: -5, marginRight: 4 }}>
                <img src={foodIcon} width={30} height={30} style={{ marginRight: 5 }} />100
            </div>
            <div data-tooltip-id="my-tooltip"
                data-tooltip-content="Gold"
                data-tooltip-place="top" style={{ marginTop: -5, marginRight: 4 }}>
                <img src={goldIcon} width={30} height={30} style={{ marginRight: 5 }} />100
            </div>
            <div data-tooltip-id="my-tooltip"
                data-tooltip-content="Iron"
                data-tooltip-place="top" style={{ marginTop: -5, marginRight: 4 }}>
                <img src={ironIcon} width={30} height={30} style={{ marginRight: 5 }} />100
            </div>
            <div data-tooltip-id="my-tooltip"
                data-tooltip-content="Land"
                data-tooltip-place="top" style={{ marginTop: -5, marginRight: 4 }}>
                <img src={landIcon} width={30} height={30} style={{ marginRight: 5 }} />1/10
            </div>
            <div data-tooltip-id="my-tooltip"
                data-tooltip-content="Soldiers"
                data-tooltip-place="top" style={{ marginTop: -5, marginRight: 4 }}>
                <img src={soldierIcon} width={30} height={30} style={{ marginRight: 5 }} />6/10
            </div>
            <div data-tooltip-id="my-tooltip"
                data-tooltip-content="Troops"
                data-tooltip-place="top" style={{ marginTop: -5, marginRight: 4 }}>
                <img src={flagIcon} width={30} height={30} style={{ marginRight: 5 }} />1/1
            </div>
        </div>)
}