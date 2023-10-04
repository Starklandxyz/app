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
import { Player2Player } from "../types";
import { Player } from "../generated/graphql";

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
            for (let index = 0; index < edges.length; index++) {
                const element = edges[index];
                const components = element?.node?.components
                var player = undefined
                var eth = 0n
                if (components && components[0] && components[0].__typename == "Player") {
                    console.log(components[0]);
                    const player_ = components[0] as Player
                    player = Player2Player(player_)
                }
                if(components && components[1] && components[1].__typename=="ETH"){
                    const b: string = components[1].balance;
                    eth = BigInt(b)
                }
                playerStore.setState({ eth: eth,player:player})
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