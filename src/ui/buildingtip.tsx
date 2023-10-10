import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "../../node_modules/@latticexyz/phaserx/src/index";
import { MAP_WIDTH, TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
import { mouseStore } from "../store/mouseStore";
import { useEffect, useMemo, useState } from "react";
import { store } from "../store/store";
import { buildingCoorpToPosition, getTimestamp, hexToString, toastSuccess } from "../utils";
import { tipStore } from "../store/tipStore";
import { TilesetBuilding, TilesetNum, TilesetSelect, TilesetSoldier, TilesetZone } from "../artTypes/world";
import { Coord } from "../../node_modules/@latticexyz/phaserx/src/index";
import { ClickWrapper } from "./clickWrapper";
import { Troop } from "../types/Troop";
import { controlStore } from "../store/controlStore";
import { BuildType } from "../types/Build";
import { LandType, get_land_barbarians, get_land_type } from "../types/Land";
import { useComponentValue } from "@dojoengine/react";
import { ComponentValue, Has, defineSystem, getComponentValue, getComponentValueStrict, setComponent } from "../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
export default function BuildingTip() {
    const { camera, phaserLayer, account } = store()
    const { tooltip: ptooltip } = tipStore();
    const [tooltip, settooltip] = useState({ show: false, content: <></>, x: 0, y: 0 })
    // const [showButtons, setShowButtons] = useState({ show: false, x: 0, y: 0 })

    const { x: ex, y: ey, down: mouseDown } = mouseStore()
    const [lastCoord, setCoord] = useState<Coord>({ x: 0, y: 0 })

    const { sendTroopCtr: sendTroop, buildLand, showTipButtons, tipButtonShow } = controlStore()

    const {
        scenes: {
            Main: {
                maps: {
                    Main: { putTileAt },
                },
            },
        },
        networkLayer: {
            systemCalls: { adminAttack },
            components: contractComponents
        }
    } = phaserLayer!;


    const myBase = useComponentValue(contractComponents.Base, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));

    useEffect(() => {
        const x = MAP_WIDTH / 2
        const y = x
        const pixelPosition = tileCoordToPixelCoord({ x, y }, TILE_WIDTH, TILE_HEIGHT);
        camera?.centerOn(pixelPosition?.x!, pixelPosition?.y!);
    }, [])

    useEffect(() => {
        putTileAt(lastCoord, TilesetSelect.Color3, "Select");
        var x = ex + 150
        if (ex > innerWidth - 250) {
            x = ex - 150
        }
        var y = ey - 40
        if (ey > innerHeight - 200) {
            y = ey - 100
        }
        const land = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(lastCoord.x), BigInt(lastCoord.y)]))
        var land_name = "Land"
        var land_owner = "Owner : No Owner"
        var land_desc = ""
        var land_level = ""
        var land_warrior = "Warrior : 0"
        if (land) {
            switch (land.building) {
                case BuildType.None: break;
                case BuildType.Base: land_name = "Base"; break;
                case BuildType.Farmland: land_name = "Farmland"; break;
                case BuildType.IronMine: land_name = "IronMine"; break;
                case BuildType.GoldMine: land_name = "GoldMine"; break;
                case BuildType.Camp: land_name = "Camp"; break;
            }
            if (land.owner) {
                const p = getComponentValue(contractComponents.Player, getEntityIdFromKeys([BigInt(land.owner)]))
                const name = p?.nick_name;
                if (name) {
                    land_owner ="Owner : "+ hexToString(name)
                }
            }
            land_level = "Level : " + land.level
            const w = getComponentValue(contractComponents.Warrior, getEntityIdFromKeys([1n, BigInt(lastCoord.x), BigInt(lastCoord.y)]))
            if (w) {
                land_warrior = "Warrior : " + w.balance
            }
        } else {
            const land_type = get_land_type(1, lastCoord.x, lastCoord.y)
            land_desc = "Can't be occupied"
            switch (land_type) {
                case LandType.None: land_desc = ""; break;
                case LandType.Gold: land_name = "Gold"; break;
                case LandType.Iron: land_name = "Iron"; break;
                case LandType.Water: land_name = "Water"; break;
            }
            if(land_type==LandType.Gold||land_type==LandType.Iron){
                const w = getComponentValue(contractComponents.LandMiner, getEntityIdFromKeys([1n, BigInt(lastCoord.x), BigInt(lastCoord.y)]))
                land_owner = "Miner : None"
                if(w){
                    // const w = getComponentValue(contractComponents.LandMiner, getEntityIdFromKeys([1n, BigInt(lastCoord.x), BigInt(lastCoord.y)]))
                    land_owner = "Miner : " + w.miner_x +","+w.miner_y
                }
            }
            const land_baba = get_land_barbarians(1, lastCoord.x, lastCoord.y)
            land_warrior = "Warrior : " + land_baba.toString()
            land_level = "Level : " + (1n + land_baba / 10n)
            if (land_type != LandType.None) {
                land_warrior = ""
                land_level = ""
            }
        }

        settooltip({
            show: true, x: x, y: y, content: <div>
                <div style={{ marginTop: 5 }}>{land_name}</div>
                <div style={{ marginTop: 5 }}>({lastCoord.x},{lastCoord.y})</div>
                <div style={{ marginTop: 5 }}>{land_owner}</div>
                <div style={{ marginTop: 5 }}>{land_desc}</div>
                <div style={{ marginTop: 5 }}>{land_level}</div>
                <div style={{ marginTop: 5 }}>{land_warrior}</div>
            </div>
        })
    }, [lastCoord])

    useEffect(() => {
        if (!camera) {
            return
        }

        if (tipButtonShow.show) {
            return
        }

        if (sendTroop.show) {
            return
        }

        if (buildLand) {
            return
        }

        const x = (ex + camera.phaserCamera.worldView.x * 2) / 2;
        const y = (ey + camera.phaserCamera.worldView.y * 2) / 2;

        const coord = pixelCoordToTileCoord({ x, y }, TILE_WIDTH, TILE_HEIGHT)
        if (coord.x == lastCoord.x && coord.y == lastCoord.y) {

        } else {
            putTileAt(lastCoord, TilesetSelect.Color0, "Select");
            setCoord(coord)
        }
    }, [ex, ey])

    useEffect(() => {
        console.log("mouseDown", mouseDown);
        if (!account) {
            return
        }
        if (!myBase) {
            return
        }
        if (sendTroop.show) {
            return
        }
        if (!mouseDown) {
            var x = ex
            if (ex > innerWidth - 100) {
                x = ex - 100
            }
            var y = ey
            if (ey > innerHeight - 200) {
                y = ey - 180
            }
            console.log("click", lastCoord);
            // controlStore.setState({ clickedLand: { x: lastCoord.x, y: lastCoord.y } })
            controlStore.setState({ tipButtonShow: { show: true, x: x, y: y }, clickedLand: { x: lastCoord.x, y: lastCoord.y } })
            // setShowButtons({ show: true, x: x, y: y })
        }
    }, [mouseDown])

    const sendTroopClick = () => {
        console.log("sendTroopClick");
        if (!account) {
            return
        }
        // const base = bases.get(account.address)
        if (!myBase) {
            return
        }
        const troop = new Troop(account.address, myBase, lastCoord, getTimestamp())
        controlStore.setState({ sendTroopCtr: { troop: troop, show: true }, tipButtonShow: { show: false, x: 0, y: 0 } })
    }

    const buildClick = () => {
        controlStore.setState({ buildLand: lastCoord, tipButtonShow: { show: false, x: 0, y: 0 } })
    }

    const getButtons = useMemo(() => {
        if (!account) {
            return <></>
        }
        if (tipButtonShow.show) {
            return
        }
        if (showTipButtons) {
            return showTipButtons
        }
        const land = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(lastCoord.x), BigInt(lastCoord.y)]))
        if (land) {
            if (land.building == BuildType.Base) {
                return <></>
            }
            if (land.owner == account.address) {
                return <>
                    <button onClick={() => sendTroopClick()}>Send Troop</button>
                    <button onClick={() => buildClick()}>Build</button>
                </>
            }
        } else {
            const type = get_land_type(1, lastCoord.x, lastCoord.y)
            if (type != LandType.None) {
                return <></>
            }
        }
        return <button onClick={() => sendTroopClick()}>Send Troop</button>
    }, [myBase, account, lastCoord])

    const attack = async()=>{
        const result = await adminAttack(account!,1,lastCoord.x,lastCoord.y)
    }

    return (
        <ClickWrapper>
            {tooltip.show && (
                <div
                    className="tooltip"
                    style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
                >
                    {
                        tooltip.content
                    }
                </div>
            )}
            {
                tipButtonShow.show &&
                <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: `${tipButtonShow.x - 10}px`, top: `${tipButtonShow.y + 20}px` }}>
                    {
                        getButtons
                    }
                    <button onClick={() => buildClick()}>Build</button>
                    <button onClick={() => attack()}>Attack</button>
                    <button style={{ marginTop: 10 }} onClick={() => controlStore.setState({ tipButtonShow: { show: false, x: 0, y: 0 } })}>Cancel</button>

                </div>
            }

            {ptooltip.show && (
                <div
                    className="tooltip"
                    style={{ left: `${ptooltip.x}px`, top: `${ptooltip.y}px` }}
                >
                    {
                        ptooltip.content
                    }
                </div>
            )}
        </ClickWrapper>
    )
}