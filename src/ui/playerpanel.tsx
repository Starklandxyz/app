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
import { warriorStore } from "../store/warriorstore";
import styled from 'styled-components';
import { ComponentValue, Has, defineSystem, getComponentValue, setComponent } from "../../node_modules/@latticexyz/recs/src/index";
import { troopStore } from "../store/troopStore";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { getEntityIdFromKeys } from "@dojoengine/utils";

export default function PlayerPanel() {
    const { player: storePlayer, players, eths } = playerStore()
    const { account, phaserLayer } = store();
    const { userWarriors, landWarriors } = warriorStore()
    const { troops } = troopStore()
    const accountRef = useRef<string>()

    const userWarriorsRef = useRef<typeof userWarriors>(new Map())
    useEffect(() => {
        userWarriorsRef.current = userWarriors
    }, [userWarriors])

    const landWarriorsRef = useRef<typeof landWarriors>(new Map())
    useEffect(() => {
        landWarriorsRef.current = landWarriors
    }, [landWarriors])

    const {
        networkLayer: {
            world,
            components: sqlComponent,
            network: { graphSdk, wsClient }
        }
    } = phaserLayer!

    const food = useComponentValue(sqlComponent.Food, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));
    const gold = useComponentValue(sqlComponent.Gold, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));
    const iron = useComponentValue(sqlComponent.Iron, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));

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
    }, [storePlayer])

    useEffect(() => {
        fetchPlayersInfo()
    }, [])


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
        handleSQLResult(edges, sqlComponent)
        // if (edges) {
        //     for (let index = 0; index < edges.length; index++) {
        //         const element = edges[index];
        //         const components = element?.node?.components
        //         const keys = element?.node?.keys
        //         if (components && keys) {
        //             const nkeys = keys.map((key) => BigInt(key!));
        //             let has = false
        //             for (let index = 0; index < components.length; index++) {
        //                 const node = components[index];
        //                 if (node?.__typename == "Gold") {
        //                     has = true
        //                     gold = node.balance
        //                 }
        //                 if (node?.__typename == "Food") {
        //                     food = node.balance
        //                 }
        //                 if (node?.__typename == "Iron") {
        //                     iron = node.balance
        //                 }
        //             }
        //             if (has) {
        //                 console.log("fetchResources", gold, food, iron);
        //                 resourceStore.setState({ gold: gold, food: food, iron: iron })
        //                 return
        //             }
        //         }
        //     }
        // }
    }

    const handleSQLResult = (edges: any, contractComponents: any) => {
        if (!edges) { return }

        for (let index = 0; index < edges.length; index++) {
            const element = edges[index];
            const components = element?.node?.components
            const keys = element?.node?.keys
            const nkeys = keys.map((key: any) => BigInt(key));
            for (let j = 0; j < components.length; j++) {
                const component = components[j];
                const propertyCount = Object.keys(component).length;
                if (propertyCount == 1) {
                    continue
                }
                const contractComponent = contractComponents[component.__typename]
                const componentValues = Object.keys(contractComponent.schema).reduce((acc: ComponentValue, key, _) => {
                    acc[key] = component[key]
                    return acc;
                }, {});

                // console.log("handleSQLResult",component.__typename);
                setComponent(contractComponent, getEntityIdFromKeys(nkeys), componentValues)
                // console.log("handleSQLResult finish",component.__typename);
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

    const calUserWarrior = useMemo(() => {
        if (!account) {
            return 0
        }
        if (!userWarriors.has(account.address)) {
            return 0
        }
        return userWarriors.get(account.address)
    }, [userWarriors])


    useEffect(() => {
        // defineSystem(world, [Has(sqlComponent.Gold)], ({ entity, value }) => {
        //     const gold = value[0]?.balance as number
        //     resourceStore.setState({ gold: gold })
        // })
        // defineSystem(world, [Has(sqlComponent.Food)], ({ entity }) => {
        //     const r = getComponentValue(sqlComponent.Food, entity);
        //     if (r) {
        //         resourceStore.setState({ food: r.balance })
        //     }
        // })
        // defineSystem(world, [Has(sqlComponent.Iron)], ({ entity }) => {
        //     const r = getComponentValue(sqlComponent.Iron, entity);
        //     if (r) {
        //         resourceStore.setState({ iron: r.balance })
        //     }

        // })
        defineSystem(world, [Has(sqlComponent.UserWarrior)], ({ entity }) => {
            const r = getComponentValue(sqlComponent.UserWarrior, entity);
            console.log("UserWarrior", r);
            if (!r || !accountRef.current) {
                return
            }
            console.log("userWarriors size", userWarriorsRef.current.size);

            const uw = new Map(userWarriorsRef.current)
            uw.set(accountRef.current, r.balance)
            warriorStore.setState({ userWarriors: uw })
        })
        defineSystem(world, [Has(sqlComponent.Warrior)], ({ entity, value }) => {
            console.log("Warrior", entity, value);
            const w = value[0]
            if (w) {
                const ls = new Map(landWarriorsRef.current)
                ls.set(w.x + "_" + w.y, w.balance as number)
                warriorStore.setState({ landWarriors: ls })
            }
        })
    }, [])


    const getMyTroopSize = useMemo(() => {
        var size = 0
        troops.forEach((value, _) => {
            if (value.owner == account?.address && value.startTime != 0) {
                size++
            }
        })
        return size
    }, [troops, account])


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
                <ResourceValue>{
                    food && food.balance
                }</ResourceValue>
            </ResourceItemWrapper>

            <ResourceItemWrapper data-tooltip-id="my-tooltip"
                data-tooltip-content="Gold"
                data-tooltip-place="top" >
                <ResourceIcon src={goldIcon} alt="gold" />
                <ResourceValue>{gold && gold.balance}</ResourceValue>
            </ResourceItemWrapper>

            <ResourceItemWrapper data-tooltip-id="my-tooltip"
                data-tooltip-content="Iron"
                data-tooltip-place="top">
                <ResourceIcon src={ironIcon} alt="iron" />
                <ResourceValue>{iron && iron.balance}</ResourceValue>
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
                <ResourceValue>{getMyTroopSize}/1</ResourceValue>
            </ResourceItemWrapper>

        </TopBarWrapper>
    )
}


// 定义顶部横条容器
const TopBarWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-self: center;

`;

const LogoImage = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 2px;
`;


const UsernameWrapper = styled.div`
  margin-left: 4px;
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
