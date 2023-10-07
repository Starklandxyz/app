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
import { BuildType } from "../types/Build";
import { useEffect, useMemo, useState } from "react";
import { BuildInfos } from "../types/BuildInfo";
import { buildPriceStore } from "../store/buildpricestore";
import { resourceStore } from "../store/resourcestore";
import { Has, defineSystem, getComponentValue } from "../../node_modules/@latticexyz/recs/src/index";

export default function ChooseBuildUI() {
    const { phaserLayer, networkLayer, account } = store()
    const { buildLand } = controlStore()
    const { food, iron, gold } = resourceStore()
    const { goldprices, foodprices, ironprices } = buildPriceStore()
    const [selectBuild, setSelect] = useState<BuildType>(BuildType.Farmland)

    const {
        scenes: {
            Main: {
                maps: {
                    Main: { putTileAt },
                },
            },
        }
    } = phaserLayer!;
    const {
        networkLayer: {
            world,
            components,
        }
    } = phaserLayer!

    const {
        network: { graphSdk },
        systemCalls: { buildBuilding },
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
        defineSystem(world, [Has(components.Land)], ({ value }) => {
            console.log("land change", value);

        })
    }, [])

    const fetchBuildPrice = async () => {
        const prices = await graphSdk.getBuildPrice({ map_id: "0x1" })
        console.log("fetchBuildPrice", prices);

        const edges = prices.data.entities?.edges
        const goldp = new Map(goldprices)
        const ironp = new Map(ironprices)
        const foodp = new Map(foodprices)

        if (edges) {
            for (let index = 0; index < edges.length; index++) {
                const element = edges[index];
                const components = element?.node?.components
                if (components && components[0] && components[0].__typename == "BuildPrice") {
                    const component = components[0]
                    const build_type = component.build_type
                    goldp.set(build_type, component.gold)
                    foodp.set(build_type, component.food)
                    ironp.set(build_type, component.iron)
                }
            }
        }
        buildPriceStore.setState({
            goldprices: goldp,
            foodprices: foodp,
            ironprices: ironp
        })
    }

    const buildConfirm = async () => {
        if (!buildLand) {
            return
        }
        if (!account) {
            return
        }

        if (gold < goldprices.get(selectBuild)!) {
            toastError("Gold is not enough")
            return
        }
        if (food < foodprices.get(selectBuild)!) {
            toastError("Food is not enough")
            return
        }
        if (iron < ironprices.get(selectBuild)!) {
            toastError("Iron is not enough")
            return
        }

        const result = await buildBuilding(account, 1, buildLand.x, buildLand.y, selectBuild)
        if (result && result.length > 0) {
            toastSuccess("Build Success")

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

    return (
        <ClickWrapper>
            {
                buildLand &&
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