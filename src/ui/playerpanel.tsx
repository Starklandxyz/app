import { getTimestamp, hexToString, positionToCoorp } from "../utils";
import { playerStore } from "../store/playerStore";
import starklogo from "../../public/starkneticon.png"

import foodIcon from "../../public/assets/icons/food.png"
import ironIcon from "../../public/assets/icons/iron.png"
import goldIcon from "../../public/assets/icons/gold.png"
import soldierIcon from "../../public/assets/icons/soldier.png"
import flagIcon from "../../public/assets/icons/flag.png"
import landIcon from "../../public/assets/icons/landicon.png"
import { store } from "../store/store";
import { useEffect, useMemo, useRef } from "react";
import { Player2Player } from "../types";
import { Player as PlayerSQL } from "../generated/graphql";
import { Player } from "../dojo/createSystemCalls";
import { resourceStore } from "../store/resourcestore";
import { buildStore } from "../store/buildstore";
import { warriorStore } from "../store/warriorstore";
import { Warrior } from "../types/Warrior";

import styled from 'styled-components';


export default function PlayerPanel() {
    const { player: storePlayer, players, eths } = playerStore()
    const { account, phaserLayer } = store();
    const { bases } = buildStore()
    const { userWarriors, warriors } = warriorStore()
    const { food, gold, iron } = resourceStore()
    const accountRef = useRef<string>()

    const {
        networkLayer: {
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
        if (!storePlayer) {
            return
        }
        fetchResources()
        fetchUserWarrior()
        const base = bases.get(account?.address!)
        if (base) {
            const x = '0x' + (base.x).toString(16)
            const y = '0x' + (base.y).toString(16)
            fetchWarrior(x, y)
        }
    }, [storePlayer])

    useEffect(() => {
        fetchPlayersInfo()
    }, [])

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

    const fetchWarrior = async (x: string, y: string) => {
        const warrior = await graphSdk.getWarriorByLocation({ map_id: "0x1", x: x, y: y })
        console.log("fetchWarrior", warrior);
        const edges = warrior.data.entities?.edges

        if (edges) {
            for (let index = 0; index < edges.length; index++) {
                const element = edges[index];
                const components = element?.node?.components
                // const keys = element?.node?.keys
                if (components) {
                    for (let index = 0; index < components.length; index++) {
                        const node = components[index];
                        if (node?.__typename == "Warrior") {
                            const ws: Array<Warrior> = Array.from(warriors);
                            var has = false
                            for (let index = 0; index < ws.length; index++) {
                                const element = ws[index];
                                if (element.x == node.x && element.y == node.y) {
                                    ws[index].balance = node.balance;
                                    has = true
                                }
                            }
                            if (!has) {
                                const newW = new Warrior()
                                newW.balance = node.balance
                                newW.x = node.x
                                newW.y = node.y
                                ws.push(newW);
                            }
                            warriorStore.setState({ warriors: ws })
                        }
                    }
                }
            }
        }
    }

    const fetchUserWarrior = async () => {
        const userWarrior = await graphSdk.getUserWarriorByKey({ map_id: "0x1", key: account?.address })
        console.log("fetchUserWarrior", userWarrior);
        const edges = userWarrior.data.entities?.edges
        const ws = new Map(userWarriors);
        if (edges) {
            for (let index = 0; index < edges.length; index++) {
                const element = edges[index];
                const components = element?.node?.components
                if (components) {
                    for (let index = 0; index < components.length; index++) {
                        const node = components[index];
                        if (node?.__typename == "UserWarrior") {
                            ws.set(node.owner, node.balance)
                        }
                    }
                }
            }
        }
        warriorStore.setState({ userWarriors: ws })
    }

    const fetchResources = async () => {
        const resources = await graphSdk.getResoucesByKey({ map_id: "0x1", key: account?.address })
        console.log("fetchResources", resources);
        const edges = resources.data.entities?.edges
        if (edges) {
            for (let index = 0; index < edges.length; index++) {
                const element = edges[index];
                const components = element?.node?.components
                var gold = 0
                var food = 0
                var iron = 0
                if (components) {
                    for (let index = 0; index < components.length; index++) {
                        const node = components[index];
                        if (node?.__typename == "Gold") {
                            gold = node.balance
                        }
                        if (node?.__typename == "Food") {
                            food = node.balance
                        }
                        if (node?.__typename == "Iron") {
                            iron = node.balance
                        }
                    }
                    console.log("fetchResources", gold, food, iron);
                    resourceStore.setState({ gold: gold, food: food, iron: iron })
                }
            }
        }
    }

    const fetchPlayersInfo = async () => {
        const playerInfo = await graphSdk.getAllPlayers()
        console.log("fetchPlayersInfo", playerInfo);
        const edges = playerInfo.data.entities?.edges
        const map = new Map<string, Player>()
        const eths = new Map<string, bigint>()
        if (edges) {
            for (let index = 0; index < edges.length; index++) {
                const element = edges[index];
                const components = element?.node?.components
                const keys = element?.node?.keys
                var player = undefined
                var eth = 0n
                if (components && components[0] && components[0].__typename == "Player") {
                    console.log(components[0]);
                    const player_ = components[0] as PlayerSQL
                    player = Player2Player(player_)
                    map.set(keys?.[0]!, player)
                }
                if (components && components[1] && components[1].__typename == "ETH") {
                    const b: string = components[1].balance;
                    eth = BigInt(b)
                    eths.set(keys?.[0]!, eth)
                }
            }
        }
        playerStore.setState({ eths: eths, players: map })
    }

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
                    const player_ = components[0] as PlayerSQL
                    player = Player2Player(player_)
                }
                if (components && components[1] && components[1].__typename == "ETH") {
                    const b: string = components[1].balance;
                    eth = BigInt(b)
                }
                playerStore.setState({ eth: eth, player: player })
            }
        }
    }

    // const calWarrior = useMemo(() => {
    //     var result = 0
    //     for (let index = 0; index < warriors.length; index++) {
    //         const element = warriors[index];
    //         result += element.balance
    //     }
    //     return result
    // }, [warriors])

    const calUserWarrior = useMemo(() => {
        if (!account) {
            return 0
        }
        return userWarriors.get(account.address)
    }, [userWarriors])

    useEffect(() => {
        console.log("gold", gold);

    }, [gold])

    return (
        <TopBarWrapper>

            <LogoImage src={starklogo}>

            </LogoImage>
            <UsernameWrapper data-tooltip-id="my-tooltip"
                data-tooltip-content="user name"
                data-tooltip-place="top">
                {hexToString(storePlayer?.nick_name)}
            </UsernameWrapper>

            <ResourceItemWrapper data-tooltip-id="my-tooltip"
                data-tooltip-content="Food"
                data-tooltip-place="top">
                <ResourceIcon src={foodIcon} alt="food" />
                <ResourceValue>{food}</ResourceValue>
            </ResourceItemWrapper>

            <ResourceItemWrapper data-tooltip-id="my-tooltip"
                data-tooltip-content="Gold"
                data-tooltip-place="top" >
                <ResourceIcon src={goldIcon} alt="gold" />
                <ResourceValue>{gold}</ResourceValue>
            </ResourceItemWrapper>

            <ResourceItemWrapper data-tooltip-id="my-tooltip"
                data-tooltip-content="Iron"
                data-tooltip-place="top">
                <ResourceIcon src={ironIcon} alt="iron" />
                <ResourceValue>{iron}</ResourceValue>
            </ResourceItemWrapper>

            <ResourceItemWrapper data-tooltip-id="my-tooltip"
                data-tooltip-content="Land"
                data-tooltip-place="top">
                <ResourceIcon src={landIcon} alt="land" />
                <ResourceValue>1/10</ResourceValue>
            </ResourceItemWrapper>

            <ResourceItemWrapper data-tooltip-id="my-tooltip"
                data-tooltip-content="Soldiers"
                data-tooltip-place="top">
                <ResourceIcon src={soldierIcon} alt="soldier" />
                <ResourceValue>{calUserWarrior}/20</ResourceValue>
            </ResourceItemWrapper>

            <ResourceItemWrapper data-tooltip-id="my-tooltip"
                data-tooltip-content="Troops"
                data-tooltip-place="top">
                <ResourceIcon src={flagIcon} alt="flag" />
                <ResourceValue>1/1</ResourceValue>
            </ResourceItemWrapper>

        </TopBarWrapper>
    )
}


// 定义顶部横条容器
const TopBarWrapper = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const LogoImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 8px;
`;


const UsernameWrapper = styled.div`
  margin-right: 16px;
  font-size: 18px;
  font-weight: bold;
`;

// 定义资源项容器
const ResourceItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

// 定义资源图标
const ResourceIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 4px;
`;

// 定义资源数值
const ResourceValue = styled.span`
  font-size: 16px;
`;

// 定义创建按钮
const CreateButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;
