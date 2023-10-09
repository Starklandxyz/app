import { getTimestamp, hexToString, positionToCoorp } from "../utils";
import starklogo from "../../public/starkneticon.png"
import foodIcon from "../../public/assets/icons/food.png"
import ironIcon from "../../public/assets/icons/iron.png"
import goldIcon from "../../public/assets/icons/gold.png"
import soldierIcon from "../../public/assets/icons/soldier.png"
import flagIcon from "../../public/assets/icons/flag.png"
import landIcon from "../../public/assets/icons/landicon.png"
import { store } from "../store/store";
import { useEffect, useMemo, useRef } from "react";
import { warriorStore } from "../store/warriorstore";
import styled from 'styled-components';
import { ComponentValue, Has, defineSystem, getComponentValue, setComponent } from "../../node_modules/@latticexyz/recs/src/index";
// import { useComponentValue } from "../../node_modules/@latticexyz/react/src/index";
import { troopStore } from "../store/troopStore";
// import { useComponentValue, useEntityQuery } from "@dojoengine/react"
import { handleSQLResult } from "../utils/handleutils";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { useComponentValue } from "@dojoengine/react";

export default function PlayerPanel() {
    // const { player: storePlayer, players, eths } = playerStore()
    const { account, phaserLayer } = store();
    const { landWarriors } = warriorStore()

    const { troops } = troopStore()
    const accountRef = useRef<string>()

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

    const food = useComponentValue(sqlComponent.Food, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]),{balance:0});
    const gold = useComponentValue(sqlComponent.Gold, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]),{balance:0});
    const iron = useComponentValue(sqlComponent.Iron, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]),{balance:0});
    const userWarrior = useComponentValue(sqlComponent.UserWarrior, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]),{balance:0});

    const player = useComponentValue(sqlComponent.Player, getEntityIdFromKeys([BigInt(account ? account.address : "")]));

    useEffect(() => {
        if (!account) {
            return
        }
        console.log("account change ", account?.address);
        accountRef.current = account?.address
    }, [account])

    useEffect(() => {
        if (!account) {
            return
        }
        fetchResources()
        fetchUserWarrior()
    }, [account])

    useEffect(() => {
        fetchPlayersInfo()
    }, [])


    const fetchUserWarrior = async () => {
        const userWarrior = await graphSdk.getUserWarriorByKey({ map_id: "0x1", key: account?.address })
        console.log("fetchUserWarrior", userWarrior);
        const edges = userWarrior.data.entities?.edges
        handleSQLResult(edges,sqlComponent)
    }

    const fetchResources = async () => {
        const resources = await graphSdk.getResoucesByKey({ map_id: "0x1", key: account?.address })
        console.log("fetchResources", resources);
        const edges = resources.data.entities?.edges
        handleSQLResult(edges, sqlComponent)
    }

    const fetchPlayersInfo = async () => {
        const playerInfo = await graphSdk.getAllPlayers()
        console.log("fetchPlayersInfo", playerInfo);
        const edges = playerInfo.data.entities?.edges
        handleSQLResult(edges,sqlComponent)
    }

    useEffect(() => {
        defineSystem(world, [Has(sqlComponent.Warrior)], ({ entity, value }) => {
            console.log("Warrior", entity, value);
            const w = value[0]
            if (w) {
                const ls = new Map(landWarriorsRef.current)
                ls.set(w.x + "_" + w.y, w.balance as number)
                warriorStore.setState({ landWarriors: ls })
            }
        })
        defineSystem(world, [Has(sqlComponent.Food)], ({ entity, value }) => {
            console.log("Food change", entity, value);
        })
    }, [])

    useEffect(()=>{
        console.log("food",food);
        
    },[food])


    const getMyTroopSize = useMemo(() => {
        var size = 0
        troops.forEach((value, _) => {
            if (value.owner == account?.address && value.startTime != 0) {
                size++
            }
        })
        return size
    }, [troops, account])

    useEffect(()=>{
        console.log("player change",player);
    },[player])

    const getPlayerName = useMemo(()=>{
        console.log("getPlayerName",player);
        // 0x61736466
        return hexToString(player?.nick_name)
    },[player])

    return (
        <TopBarWrapper>

            <LogoImage src={starklogo}>

            </LogoImage>
            <UsernameWrapper data-tooltip-id="my-tooltip"
                data-tooltip-content="user name"
                data-tooltip-place="top">
                {getPlayerName}
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
                <ResourceValue>{userWarrior && userWarrior.balance}/20</ResourceValue>
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
