import { ClickWrapper } from "./clickWrapper";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { store } from "../store/store";
import { BuildType } from "../types/Build";
import { Land } from "../types/Land";
import { useEntityQuery } from "@dojoengine/react";
import { Has, HasValue, getComponentValue, getComponentValueStrict } from "../../node_modules/@latticexyz/recs/src/index";

export default function UserBuildingPanel() {
    // const { lands } = mapStore()
    const { account, phaserLayer } = store()

    const [showFarm, setShowFarm] = useState(false)
    const [showCamp, setShowCamp] = useState(false)
    const [showGold, setShowGold] = useState(false)
    const [showIron, setShowIron] = useState(false)

    const {
        scenes: {
            Main: {
                maps: {
                    Main: { putTileAt },
                },
            },
        },
        networkLayer: {
            components: contractComponents
        }
    } = phaserLayer!;

    const [base, setBase] = useState<Land>()
    const [farmland, setFarmland] = useState<Array<Land>>([])
    const [ironMine, setIronmine] = useState<Array<Land>>([])
    const [goldmine, setGoldmine] = useState<Array<Land>>([])
    const [camp, setcamp] = useState<Array<Land>>([])

    useEffect(() => {
        if (showFarm) {
            setShowCamp(false)
            setShowIron(false)
            setShowGold(false)
        }
    }, [showFarm])

    useEffect(() => {
        if (showCamp) {
            setShowFarm(false)
            setShowIron(false)
            setShowGold(false)
        }
    }, [showCamp])

    useEffect(() => {
        if (showGold) {
            setShowCamp(false)
            setShowIron(false)
            setShowFarm(false)
        }
    }, [showGold])

    useEffect(() => {
        if (showIron) {
            setShowCamp(false)
            setShowFarm(false)
            setShowGold(false)
        }
    }, [showIron])


    const landEntities = useEntityQuery([Has(contractComponents.Land)], { updateOnValueChange: true })

    useEffect(() => {
        if (!account) {
            return
        }
        landEntities.map(entity => {
            const value = getComponentValue(contractComponents.Land, entity)
            if (value && value.owner == account.address) {
                const land = new Land()
                land.build = value.building
                land.level = value.level
                land.map_id = value.map_id
                land.owner = value.owner
                land.x = value.x
                land.y = value.y
                switch (value.building) {
                    case BuildType.Base: setBase(land); break;
                    case BuildType.Farmland: addFarmland(land); break;
                    case BuildType.GoldMine: addGold(land); break;
                    case BuildType.IronMine: addIron(land); break;
                    case BuildType.Camp: addCamp(land); break;
                }
            }
        })
    }, [landEntities, account])

    const addFarmland = async (land: Land) => {
        const a = [...farmland]
        a.push(land)
        setFarmland(a)
    }
    const addCamp = async (land: Land) => {
        const a = [...camp]
        a.push(land)
        setcamp(a)
    }
    const addGold = async (land: Land) => {
        const a = [...goldmine]
        a.push(land)
        setGoldmine(a)
    }
    const addIron = async (land: Land) => {
        const a = [...ironMine]
        a.push(land)
        setIronmine(a)
    }

    return (
        <ClickWrapper>
            <Container>
                <div style={{ width: 290, height: 320, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>

                    <table style={{ marginTop: 10 }}>
                        <tr>
                            <td>Base ({base?.x},{base?.y})</td>
                            <td>LV{base?.level}</td>
                            <td>+100Gold/H</td>
                            <td><button>Upgrade</button></td>
                        </tr>
                    </table>

                    <div style={{ display: "flex" }}>
                        <p>Farmlands - </p>
                        <p style={{ marginLeft: 5 }}>{farmland.length}</p>
                        <p style={{ marginLeft: 10 }}>+100Food/H</p>
                        <button style={{ height: 24, marginLeft: 10, marginTop: 12 }} onClick={() => setShowFarm(pre => !pre)} >+/-</button>
                    </div>
                    {
                        showFarm &&
                        <table cellSpacing={1} style={{ marginTop: 10 }}>
                            {
                                farmland.map((value, _) => (
                                    <tr>
                                        <td>({value?.x},{value?.y})</td>
                                        <td>LV{value?.level}</td>
                                        <td>+100Gold/H</td>
                                        <td><button>Upgrade</button></td>
                                    </tr>
                                ))
                            }
                        </table>
                    }

                    <div style={{ display: "flex" }}>
                        <p>Camp - </p>
                        <p style={{ marginLeft: 5 }}>{camp.length}</p>
                        <p style={{ marginLeft: 10 }}>+100 Capacity</p>
                        <button style={{ height: 24, marginLeft: 10, marginTop: 12 }} onClick={() => setShowCamp(pre => !pre)}>+/-</button>
                    </div>
                    {
                        showCamp &&
                        <table cellSpacing={1} style={{ marginTop: 10 }}>
                            {
                                camp.map((value, _) => (
                                    <tr>
                                        <td>({value?.x},{value?.y})</td>
                                        <td>LV{value?.level}</td>
                                        <td>+10 Capacity</td>
                                        <td><button>Upgrade</button></td>
                                    </tr>
                                ))
                            }
                        </table>
                    }
                    <div style={{ display: "flex" }}>
                        <p>GoldMine - </p>
                        <p style={{ marginLeft: 5 }}>{goldmine.length}</p>
                        <p style={{ marginLeft: 10 }}>+100Gold/H</p>
                        <button onClick={() => setShowGold(pre => !pre)} style={{ height: 24, marginLeft: 10, marginTop: 12 }}>+/-</button>
                    </div>
                    {
                        showGold &&
                        <table cellSpacing={1} style={{ marginTop: 10 }}>
                            {
                                goldmine.map((value, _) => (
                                    <tr>
                                        <td>({value?.x},{value?.y})</td>
                                        <td>LV{value?.level}</td>
                                        <td>+100Gold/H</td>
                                        <td><button>Upgrade</button></td>
                                    </tr>
                                ))
                            }
                        </table>
                    }
                    <div style={{ display: "flex" }}>
                        <p>IronMine - </p>
                        <p style={{ marginLeft: 5 }}>{ironMine.length}</p>
                        <p style={{ marginLeft: 10 }}>+100Iron/H</p>
                        <button onClick={() => setShowIron(pre => !pre)} style={{ height: 24, marginLeft: 10, marginTop: 12 }}>+/-</button>
                    </div>
                    {
                        showIron &&
                        <table cellSpacing={1} style={{ marginTop: 10 }}>
                            {
                                ironMine.map((value, _) => (
                                    <tr>
                                        <td>({value?.x},{value?.y})</td>
                                        <td>LV{value?.level}</td>
                                        <td>+100Iron/H</td>
                                        <td><button>Upgrade</button></td>
                                    </tr>
                                ))
                            }
                        </table>
                    }
                </div>
            </Container>
        </ClickWrapper>
    )
}


const Container = styled.div`
    position: absolute;
    top: 10%;
    left: 2%;
    color:white;
`;
