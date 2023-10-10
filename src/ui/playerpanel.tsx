import { getTimestamp, hexToString, positionToCoorp, toastError, toastSuccess } from "../utils";
import starklogo from "../../public/starkneticon.png"
import foodIcon from "../../public/assets/icons/food.png"
import ironIcon from "../../public/assets/icons/iron.png"
import goldIcon from "../../public/assets/icons/gold.png"
import soldierIcon from "../../public/assets/icons/soldier.png"
import flagIcon from "../../public/assets/icons/flag.png"
import landIcon from "../../public/assets/icons/landicon.png"
import { store } from "../store/store";
import { useEffect, useMemo, useRef } from "react";
import styled from 'styled-components';
import { ComponentValue, Has, defineSystem, getComponentEntities, getComponentValue, setComponent } from "../../node_modules/@latticexyz/recs/src/index";
import { handleSQLResult } from "../utils/handleutils";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";

export default function PlayerPanel() {
    const { account, phaserLayer } = store();
    const {
        networkLayer: {
            systemCalls: { airdrop },
            world,
            components: sqlComponent,
            network: { graphSdk, wsClient }
        }
    } = phaserLayer!

    const food = useComponentValue(sqlComponent.Food, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]), { balance: 0 });
    const gold = useComponentValue(sqlComponent.Gold, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]), { balance: 0 });
    const iron = useComponentValue(sqlComponent.Iron, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]), { balance: 0 });
    const userWarrior = useComponentValue(sqlComponent.UserWarrior, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]), { balance: 0 });

    const player = useComponentValue(sqlComponent.Player, getEntityIdFromKeys([BigInt(account ? account.address : "")]));

    const troops = useEntityQuery([Has(sqlComponent.Troop)], { updateOnValueChange: true })

    const airdropClaimed = useComponentValue(sqlComponent.Airdrop, getEntityIdFromKeys([BigInt(account ? account.address : "")]))

    const claimairdrop = async () => {
        if (!account) {
            return
        }
        const base = getComponentValue(sqlComponent.Base,getEntityIdFromKeys([1n,BigInt(account.address)]))
        if(!base){
            toastError("Build a base first")
            return
        }
        const result = await airdrop(account, 1)
        if (result && result.length > 0) {
            toastSuccess("Airdrop success")
        } else {
            toastError("Airdrop failed")
        }
    }

    useEffect(() => {
        if (!account) {
            return
        }
        fetchAirdrop()
        fetchResources()
        fetchUserWarrior()
    }, [account])

    useEffect(() => {
        fetchPlayersInfo()
    }, [])

    const fetchAirdrop = async () => {
        const resources = await graphSdk.getAirdropByKey({key: account?.address })
        console.log("fetchAirdrop", resources);
        const edges = resources.data.entities?.edges
        handleSQLResult(edges, sqlComponent)
    }

    const fetchUserWarrior = async () => {
        const userWarrior = await graphSdk.getUserWarriorByKey({ map_id: "0x1", key: account?.address })
        console.log("fetchUserWarrior", userWarrior);
        const edges = userWarrior.data.entities?.edges
        handleSQLResult(edges, sqlComponent)
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
        handleSQLResult(edges, sqlComponent)
    }

    const getMyTroopSize = useMemo(() => {
        // console.log("getMyTroopSize",account,troops);
        if (!account) {
            return 0
        }
        var size = 0

        troops.map(entity => {
            const troop = getComponentValue(sqlComponent.Troop, entity)
            // console.log("getMyTroopSize",entity,troop);
            if (troop?.owner == account.address && troop?.start_time != 0) {
                size++
            }
        })
        return size
    }, [account, troops])

    const getPlayerName = useMemo(() => {
        console.log("getPlayerName", player?.nick_name);
        return hexToString(player?.nick_name)
    }, [player])

    useEffect(()=>{
        console.log("airdropClaimed",airdropClaimed);
    },[airdropClaimed])

    const hasAirdrop = useMemo(()=>{
        if(!account){
            return false
        }
        if(airdropClaimed){
            return false
        }else{
            return true
        }
    },[airdropClaimed,account])

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
                    food && food.balance / 1000000
                }</ResourceValue>
            </ResourceItemWrapper>

            <ResourceItemWrapper data-tooltip-id="my-tooltip"
                data-tooltip-content="Gold"
                data-tooltip-place="top" >
                <ResourceIcon src={goldIcon} alt="gold" />
                <ResourceValue>{gold && gold.balance / 1000000}</ResourceValue>
            </ResourceItemWrapper>

            <ResourceItemWrapper data-tooltip-id="my-tooltip"
                data-tooltip-content="Iron"
                data-tooltip-place="top">
                <ResourceIcon src={ironIcon} alt="iron" />
                <ResourceValue>{iron && iron.balance / 1000000}</ResourceValue>
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

            {
                !airdropClaimed && <button style={{}} onClick={(() => claimairdrop())}>Airdrop</button>
            }

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
