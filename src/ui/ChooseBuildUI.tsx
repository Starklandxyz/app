import styled from "styled-components";
import { ClickWrapper } from "./clickWrapper";
import { controlStore } from "../store/controlStore";
import { toastError, toastSuccess } from "../utils";
import { Tileset, TilesetBuilding, TilesetZone } from "../artTypes/world";
import { store } from "../store/store";
import goldmineicon from "../../public/assets/icons/goldmine.png"
import ironmineicon from "../../public/assets/icons/ironmine.png"
import campicon from "../../public/assets/icons/camp.png"
import farmlandicon from "../../public/assets/icons/farmland.png"
import { BuildType, getBuildName } from "../types/Build";
import { useEffect, useMemo, useRef, useState } from "react";
import { BuildInfos } from "../types/BuildInfo";
import { Account } from "starknet";
import { LandType, get_land_type } from "../types/Land";
import { ComponentValue, Has, defineSystem, getComponentValue, setComponent } from "../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { handleSQLResult } from "../utils/handleutils";
import { Coord } from "../../node_modules/@latticexyz/utils/src/index";

export default function ChooseBuildUI() {
    const { phaserLayer, account } = store()
    const { buildLand, clickedLand } = controlStore()
    const [selectBuild, setSelect] = useState<BuildType>(BuildType.Farmland)
    const [selectMined, setSelectMined] = useState(false)

    const clickedLandRef = useRef<Coord>()

    useEffect(() => {
        clickedLandRef.current = clickedLand
    }, [clickedLand])

    const {
        networkLayer,
        scenes: {
            Main: {
                maps: {
                    Main: { putTileAt },
                },
            },
        }
    } = phaserLayer!;

    const {
        components,
        network: { graphSdk },
        systemCalls: { buildBuilding, startMining },
    } = networkLayer!

    useEffect(() => {
        if (buildLand) {
            putTileAt(buildLand, TilesetBuilding.Building, "Top3");
        }
    }, [buildLand])

    const clickBuild = (type: BuildType) => {
        console.log("clickBuild", type);
        setSelect(type)
    }

    useEffect(() => {
        fetchBuildPrice()
    }, [])

    const fetchBuildPrice = async () => {
        const prices = await graphSdk.getBuildPrice({ map_id: "0x1" })
        console.log("fetchBuildPrice", prices);

        const edges = prices.data.entities?.edges
        handleSQLResult(edges, components)
    }



    const buildConfirm = async () => {
        if (!buildLand) {
            return
        }
        if (!account) {
            return
        }

        const entityIndex = getEntityIdFromKeys([1n, BigInt(account.address)])
        const price = getComponentValue(components.BuildPrice, getEntityIdFromKeys([1n, BigInt(selectBuild)]))
        if (!price) {
            return
        }
        if (getComponentValue(components.Gold, entityIndex)?.balance! < price.gold) {
            toastError("Gold is not enough")
            return
        }
        if (getComponentValue(components.Food, entityIndex)?.balance! < price.food) {
            toastError("Food is not enough")
            return
        }
        if (getComponentValue(components.Iron, entityIndex)?.balance! < price.iron) {
            toastError("Iron is not enough")
            return
        }

        if (selectBuild == BuildType.GoldMine || selectBuild == BuildType.IronMine) {
            let hasMine = false
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    const x = buildLand.x + i
                    const y = buildLand.y + j
                    const land_type = get_land_type(1, x, y)
                    if (selectBuild == BuildType.GoldMine) {
                        if (land_type == LandType.Gold) {
                            hasMine = true
                        }
                    }
                    if (selectBuild == BuildType.IronMine) {
                        if (land_type == LandType.Iron) {
                            hasMine = true
                        }
                    }
                }
            }
            if (!hasMine) {
                toastError("There is no mine around")
                return
            }

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    const x = buildLand.x + i
                    const y = buildLand.y + j
                    const has = await fetchHasMiner(1, x, y)
                    if (has) {
                        toastError("There is no available mine around")
                        return
                    }
                }
            }
        }


        const result = await buildBuilding(account, 1, buildLand.x, buildLand.y, selectBuild)
        if (result && result.length > 0) {
            toastSuccess("Build Success")
            if (selectBuild == BuildType.Farmland) {
                claimToMine(account, 1, buildLand.x, buildLand.y, buildLand.x, buildLand.y)
            } else {
                showSelectArea(buildLand.x, buildLand.y)
            }
            putTileAt(buildLand, Tileset.Empty, "Top3");
            controlStore.setState({ buildLand: undefined })

            var tile = TilesetBuilding.Farmland
            switch (selectBuild) {
                case BuildType.Camp: tile = TilesetBuilding.Camp; break;
                case BuildType.Farmland: tile = TilesetBuilding.Farmland; break;
                case BuildType.GoldMine: tile = TilesetBuilding.GoldMine; break;
                case BuildType.IronMine: tile = TilesetBuilding.IronMine; break;
            }
            putTileAt(buildLand, tile, "Top");
            putTileAt(buildLand, TilesetZone.MyZone, "Occupy");
        } else {
            toastError("Build failed")
        }
    }

    const chooseArea = async () => {
        console.log("chooseArea", clickedLandRef.current, buildLand);
        if (!clickedLandRef.current || !buildLand) {
            return
        }
        controlStore.setState({ tipButtonShow: { show: false, x: 0, y: 0 } })
        if (clickedLandRef.current.x >= buildLand.x - 1 && clickedLandRef.current.x <= buildLand.x + 1 && clickedLandRef.current.y >= buildLand.y - 1 && clickedLandRef.current.y <= buildLand.y + 1) {
            const type = get_land_type(1, clickedLandRef.current.x, clickedLandRef.current.y)
            let correct = false
            if (type == LandType.Gold && selectBuild == BuildType.GoldMine) {
                correct = true
            }
            if (type == LandType.Iron && selectBuild == BuildType.IronMine) {
                correct = true
            }
            if (correct) {
                const has = await fetchHasMiner(1, clickedLandRef.current.x, clickedLandRef.current.y)
                if (has) {
                    toastError("This land has miner")
                    return
                }
                const result = await startMining(account!, 1, buildLand.x, buildLand.y, clickedLandRef.current.x, clickedLandRef.current.y)
                if (result && result.length > 0) {
                    toastSuccess("Start mining success")
                    startSucces()
                } else {
                    toastError("Start Mining failed")
                }
            } else {
                toastError("Wrong land")
            }

        } else {
            toastError("Wrong land")
        }
    }

    const startSucces = () => {
        if (!buildLand) { return }
        const miner_x = buildLand.x
        const miner_y = buildLand.y
        setSelectMined(false)
        controlStore.setState({buildLand:undefined,showTipButtons:undefined})

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                const x = miner_x + i
                const y = miner_y + j
                putTileAt({ x, y }, Tileset.Empty, "SelectArea");
            }
        }
    }

    const showSelectArea = (miner_x: number, miner_y: number) => {
        setSelectMined(true)
        controlStore.setState({
            showTipButtons: <>
                <button onClick={() => chooseArea()}>Choose</button>
            </>
        })
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                const x = miner_x + i
                const y = miner_y + j
                putTileAt({ x, y }, TilesetZone.MyZone, "SelectArea");
            }
        }
    }

    const cancel = () => {
        putTileAt(buildLand!, Tileset.Empty, "Top3");
        controlStore.setState({ buildLand: undefined })
    }

    const getBuildInfo = useMemo(() => {
        const buildinfo = BuildInfos.get(selectBuild)
        return (
            <div className="buildinfo">
                <div style={{ marginLeft: 10, height: 40, marginTop: 10, overflowWrap: "break-word", whiteSpace: 'normal' }}>{buildinfo?.desc}</div>
                <p style={{ marginLeft: 10, marginTop: 10 }}>Output : {buildinfo?.output}</p>
                <div style={{ display: "flex" }}>
                    <div className="buildneedbox buildneedenough">{buildinfo?.foodNeed} Food</div>
                    <div className="buildneedbox buildneedenough">{buildinfo?.goldNeed} Gold</div>
                    <div className="buildneedbox buildnotenough">{buildinfo?.ironNeed} Iron</div>
                </div>
            </div>
        )
    }, [selectBuild])


    const claimToMine = async (account: Account, map_id: number, miner_x: number, miner_y: number, mined_x: number, mined_y: number) => {
        const result = await startMining(account, map_id, miner_x, miner_y, mined_x, mined_y)
        if (result && result.length > 0) {
            toastSuccess("Farming start")
        } else {
            toastError("Farm failed")
        }
    }

    const fetchHasMiner = async (map_id_: number, x_: number, y_: number) => {
        const map_id ="0x"+ map_id_.toString(16)
        const x ="0x"+ x_.toString(16)
        const y ="0x"+ y_.toString(16)
        console.log("fetchHasMiner", x, y,map_id);
        const miner = await graphSdk.getLandMinerByKey({ map_id: map_id, x: x, y: y })
        console.log("fetchHasMiner", miner);
        const edges = miner.data.entities?.edges
        if (edges && edges.length == 0) {
            return false
        }

        if (edges) {
            for (let index = 0; index < edges.length; index++) {
                const element = edges[index];
                const components = element?.node?.components
                if (components && components[0] && components[0].__typename == "Player") {

                }
            }
        }
        return true
    }

    return (
        <ClickWrapper>
            {
                selectMined &&
                <div className="startbuildpanel">
                    <p>Build {getBuildName(selectBuild)} Success</p>
                    <p>Should select a land to mine.</p>
                </div>
            }
            {
                (buildLand && !selectMined) &&
                <div className="choosebuildpanel">

                    <table style={{ width: 400, marginTop: 1 }}>
                        <tr style={{ height: 100, width: 400 }}>
                            <td
                                className={selectBuild == BuildType.Farmland ? "selectbox" : "notselectbox"}
                                onClick={() => clickBuild(BuildType.Farmland)}>
                                <img src={farmlandicon} style={{ transform: "scale(2) translate(16px,0px)", imageRendering: "pixelated", backgroundColor: "" }} />
                            </td>
                            <td className={selectBuild == BuildType.GoldMine ? "selectbox" : "notselectbox"} onClick={() => clickBuild(BuildType.GoldMine)}>
                                <img src={goldmineicon} style={{ transform: "scale(2) translate(16px,0px)", imageRendering: "pixelated" }} />
                            </td>
                            <td
                                className={selectBuild == BuildType.IronMine ? "selectbox" : "notselectbox"} onClick={() => clickBuild(BuildType.IronMine)}>
                                <img src={ironmineicon} style={{ transform: "scale(2) translate(16px,0px)", imageRendering: "pixelated" }} />
                            </td>
                            <td
                                className={selectBuild == BuildType.Camp ? "selectbox" : "notselectbox"} onClick={() => clickBuild(BuildType.Camp)}>
                                <img src={campicon} style={{ transform: "scale(2) translate(16px,0px)", imageRendering: "pixelated" }} />
                            </td>
                        </tr>
                        <tr style={{ textAlign: "center" }}>
                            <td style={{ paddingTop: 2 }}>Framland</td>
                            <td style={{ paddingTop: 2 }}>GoldMine</td>
                            <td style={{ paddingTop: 2 }}>IronMine</td>
                            <td style={{ paddingTop: 2 }}>Camp</td>
                        </tr>
                    </table>
                    {getBuildInfo}
                    <div style={{ position: "absolute", right: 30, bottom: 30, display: "flex", flexDirection: "column" }}>
                        <button onClick={() => cancel()} style={{ marginBottom: 20 }}>Cancel</button>
                        <button onClick={() => buildConfirm()}>Build</button>
                    </div>
                </div>
            }
        </ClickWrapper>
    )
}