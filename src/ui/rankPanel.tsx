import styled from "styled-components";
import { ClickWrapper } from "./clickWrapper";
import closeicon from "../../public/assets//icons/closeicon.png"
import { panelStore } from "../store/panelStore";
import { useEffect, useMemo, useState } from "react";
import { mouseStore } from "../store/mouseStore";
import { useEntityQuery } from "../../node_modules/@latticexyz/react";
import {
    ComponentValue,
    Has,
    defineSystem,
    getComponentEntities,
    getComponentValue,
    setComponent,
} from "../../node_modules/@latticexyz/recs/src/index";
import { store } from "../store/store";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { Coord } from "../types";
import { hexToString } from "../utils";
import { playerStore } from "../store/playerStore";
import { get_land_barbarians } from "../types/Land";
import { BuildType } from "../types/Build";
type SortOrder = 'asc' | 'desc';

class RankInfo {
    public username = ""
    public owner = ""
    public point = 0
    public domination = 0
    public base: Coord = { x: 0, y: 0 }
    public level = 0
    public lands = 0
}

export default function RankPanel() {
    const { showBoard } = panelStore()
    const { account, phaserLayer } = store()
    const [page, setPage] = useState(1)
    const { territoryMap } = playerStore()
    const {
        networkLayer: {
            world,
            components,
            systemCalls: { sendTroop },
        }
    } = phaserLayer!

    const [sortField, setSortField] = useState<keyof RankInfo | null>("point");
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [sortedData, setsortedData] = useState<RankInfo[]>([])

    useEffect(() => {
        if (showBoard) {
            mouseStore.setState({ coord: { x: 0, y: 0 }, frozen: true })
        } else {
            mouseStore.setState({ frozen: false })
        }
    }, [showBoard])

    const bases = useEntityQuery([Has(components.HBase)], { updateOnValueChange: true })
    const lands = useEntityQuery([Has(components.Land)], { updateOnValueChange: true })

    useEffect(() => {
        if (territoryMap.size == 0) { return }
        const ranks: Array<RankInfo> = []
        for (let index = 0; index < bases.length; index++) {
            const entity = bases[index];
            const base = getComponentValue(components.HBase, entity)
            if (!base) { return }
            const player = getComponentValue(components.Player, getEntityIdFromKeys([BigInt(base.owner)]))
            if (!player) { return }
            const point = getComponentValue(components.RewardPoint, getEntityIdFromKeys([1n, BigInt(base.owner)]))
            // const warrior = getComponentValue(components.UserWarrior, getEntityIdFromKeys([1n, BigInt(base.owner)]))
            const land = getComponentValue(components.Land, getEntityIdFromKeys([1n, BigInt(base.x), BigInt(base.y)]))
            const lands = getComponentValue(components.LandOwner, getEntityIdFromKeys([1n, BigInt(base.owner)]))
            const rank = new RankInfo()
            rank.base = { x: base.x, y: base.y }
            rank.owner = base.owner
            rank.username = hexToString(player.nick_name)
            rank.point = point ? point.balance : 0
            const map = territoryMap.get(base.owner)
            if (map) {
                let total = 0
                map.forEach((value, key) => {
                    total += value
                })
                rank.domination = total
            }
            // rank.warriors = warrior ? warrior.balance : 0
            rank.level = land ? land.level : 1
            rank.lands = lands ? lands.total : 0
            ranks.push(rank)
        }

        const sortedData = Array.from(ranks.values()).sort((a, b) => {
            if (sortField) {
                if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
                if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setsortedData(sortedData)
    }, [showBoard, bases, territoryMap])

    useEffect(() => {
        const territoryMap: Map<string, Map<string, number>> = new Map()
        for (let index = 0; index < lands.length; index++) {
            const entity = lands[index];
            const land = getComponentValue(components.Land, entity)
            if (land) {
                if (land.building == BuildType.Base) {
                    continue
                }
                let map = territoryMap.get(land.owner)
                if (!map) {
                    map = new Map()
                }

                const warrior = getComponentValue(components.Warrior, getEntityIdFromKeys([1n, BigInt(land.x), BigInt(land.y)]))
                const baba = get_land_barbarians(1, land.x, land.y)
                let warrior_balance = warrior ? warrior.balance : 0
                warrior_balance += parseInt(baba.toString())

                //选取周围所有地块
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        let x = land.x + i
                        let y = land.y + j
                        const id = x + "_" + y
                        if (map.has(id)) {
                            if (warrior_balance > map.get(id)!) {
                                map.set(id, warrior_balance)
                            }
                        } else {
                            map.set(id, warrior_balance)
                        }
                    }
                }
                territoryMap.set(land.owner, map)
            }
        }
        playerStore.setState({ territoryMap: territoryMap })
    }, [showBoard, lands])


    const getYourRank = useMemo(() => {
        if (!account) {
            return <span>0</span>
        }

        for (let index = 0; index < sortedData.length; index++) {
            const row = sortedData[index];
            if (row.owner == (account.address)) {
                // console.log("is same ", (row.entity), parseInt(account.address).toString());
                // console.log(index);
                playerStore.setState({ rank: index + 1 })
                return <span>{index + 1}</span>
            }
        }
        return <span>0</span>
    }, [sortedData, account])

    const add = () => {
        setPage(pre => pre + 1)
    }

    const sub = () => {
        if (page == 1) {
            return
        }
        setPage(pre => pre - 1)
    }

    return (<ClickWrapper>
        {
            showBoard &&
            <Container>
                <div style={{ width: 700, zIndex: 100, height: 520, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.8)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                    <div style={{ color: "pink", width: 700, textAlign: "center", fontSize: 20, padding: 10, paddingTop: 15 }}>Billboard</div>
                    <img src={closeicon} style={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }} onClick={() => panelStore.setState({ showBoard: false })} />

                    <table border={1} cellPadding={7} style={{ marginLeft: 15, marginTop: 10, color: "yellow" }}>
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>Rank</th>
                                <th style={{ width: '120px' }}>Name</th>
                                <th style={{ width: '80px' }}>Points</th>
                                <th style={{ width: '80px' }}>Domination</th>
                                <th style={{ width: '80px' }}>Base</th>
                                <th style={{ width: '80px' }}>Level</th>
                                <th style={{ width: '80px' }}>Lands</th>
                            </tr>
                        </thead>
                    </table>
                    <table border={1} cellPadding={7} style={{ marginLeft: 15, textAlign: 'center' }}>
                        <tbody>
                            {page && sortedData.map((row, index) => (
                                (index > 10 * (page - 1) - 1 && index < 10 * page) &&
                                <tr key={row.owner}>
                                    <td style={{ width: '50px' }}>{index + 1}</td>
                                    <td style={{ width: '120px' }}>{row.username}</td>
                                    <td style={{ width: '80px' }}>{row.point}</td>
                                    <td style={{ width: '80px' }}>{row.domination}</td>
                                    <td style={{ width: '80px' }}>{`(${row.base.x},${row.base.y})`}</td>
                                    <td style={{ width: '80px' }}>{row.level}</td>
                                    <td style={{ width: '80px' }}>{row.lands}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ display: "flex", flexDirection: "row", marginLeft: 300 }}>
                        <p style={{ cursor: "pointer" }} onClick={() => sub()}>-</p>
                        <p style={{ marginLeft: 15, marginRight: 15 }}>{page}</p>
                        <p style={{ cursor: "pointer" }} onClick={() => add()}>+</p>
                    </div>
                    <div style={{ marginLeft: 20 }}>Your Rank : {getYourRank}</div>
                </div>
            </Container>
        }
    </ClickWrapper>)
}


const Container = styled.div`
    position: absolute;
    top: 20%;
    left: 30%;
    color:white;
`;