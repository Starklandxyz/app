import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { MAP_WIDTH, TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
import { mouseStore } from "../store/mouseStore";
import { useEffect, useState } from "react";
import { store } from "../store/store";
import { buildingCoorpToPosition, getTimestamp, hexToString, toastSuccess } from "../utils";
import { tipStore } from "../store/tipStore";
import { TilesetBuilding, TilesetNum, TilesetSelect, TilesetSoldier, TilesetZone } from "../artTypes/world";
import { ObjectPool, WorldCoord } from "@latticexyz/phaserx/dist/types";
import { ClickWrapper } from "./clickWrapper";
import { Troop } from "../types/Troop";
import { buildStore } from "../store/buildstore";
import SendTroopPanel from "./sendTroopPanel";
import { controlStore } from "../store/controlStore";
import { mapStore } from "../store/mapStore";
import { BuildType } from "../types/Build";
import { LandType, get_land_barbarians, get_land_type } from "../types/Land";
import { playerStore } from "../store/playerStore";
import { warriorStore } from "../store/warriorstore";
export default function BuildingTip() {
    const { camera, phaserLayer, account } = store()
    const { players } = playerStore()
    const { landWarriors } = warriorStore()
    const { bases } = buildStore()
    const { lands } = mapStore()
    const { tooltip: ptooltip } = tipStore();
    const [tooltip, settooltip] = useState({ show: false, content: <></>, x: 0, y: 0 })
    const [showButtons, setShowButtons] = useState({ show: false, x: 0, y: 0 })

    const { x: ex, y: ey, down: mouseDown } = mouseStore()
    const [lastCoord, setCoord] = useState<WorldCoord>({ x: 0, y: 0 })

    const { sendTroop, buildLand } = controlStore()

    const {
        scenes: {
            Main: {
                maps: {
                    Main: { putTileAt },
                },
            },
        }
    } = phaserLayer!;

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
        const land = lands.get(lastCoord.x + "_" + lastCoord.y)
        var land_name = "Land"
        var land_owner = "No Owner"
        var land_desc = ""
        var land_level = ""
        var land_warrior = "0"
        if (land) {
            switch (land.build) {
                case BuildType.None: break;
                case BuildType.Base: land_name = "Base"; break;
                case BuildType.Farmland: land_name = "Farmland"; break;
                case BuildType.IronMine: land_name = "IronMine"; break;
                case BuildType.GoldMine: land_name = "GoldMine"; break;
                case BuildType.Camp: land_name = "Camp"; break;
            }
            if (land.owner) {
                const name = players.get(land.owner)?.nick_name;
                if (name) {
                    land_owner = hexToString(name)
                }
            }
            land_level = "Level : " + land.level
            if(landWarriors.get(lastCoord.x + "_" + lastCoord.y))
            land_warrior = "" + landWarriors.get(lastCoord.x + "_" + lastCoord.y)
            // console.log("land info", lastCoord, land_warrior);
        } else {
            const land_type = get_land_type(1, lastCoord.x, lastCoord.y)
            land_desc = "Can't be occupied"
            switch (land_type) {
                case LandType.None: land_desc = ""; break;
                case LandType.Gold: land_name = "Gold"; break;
                case LandType.Iron: land_name = "Iron"; break;
                case LandType.Water: land_name = "Water"; break;
            }
            const land_baba = get_land_barbarians(1, lastCoord.x, lastCoord.y)
            land_warrior = land_baba.toString()
            land_level = "Level : " + (1n + land_baba / 10n)
        }

        settooltip({
            show: true, x: x, y: y, content: <div>
                <p>{land_name}</p>
                <p>Owner : {land_owner}</p>
                <p>{land_desc}</p>
                <p>{land_level}</p>
                <p>Warrior : {land_warrior}</p>
            </div>
        })
    }, [lastCoord])

    useEffect(() => {
        if (!camera) {
            return
        }

        if (showButtons.show) {
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
        if (!bases.has(account.address)) {
            return
        }
        if (!mouseDown) {
            if (!showButtons.show) {
                var x = ex
                if (ex > innerWidth - 100) {
                    x = ex - 100
                }
                var y = ey
                if (ey > innerHeight - 200) {
                    y = ey - 180
                }
                setShowButtons({ show: true, x: x, y: y })
            }
        }
    }, [mouseDown])

    const occupyClick = () => {
        toastSuccess("Occupy success")
        setShowButtons({ show: false, x: 0, y: 0 })
        putTileAt(lastCoord, TilesetZone.MyZone, "Occupy");
    }

    const sendTroopClick = () => {
        const troop = new Troop(account?.address!, bases.get(account?.address!)!, lastCoord, getTimestamp())
        controlStore.setState({ sendTroop: { troop: troop, show: true } })
        setShowButtons({ show: false, x: 0, y: 0 })
    }

    const buildClick = () => {
        controlStore.setState({ buildLand: lastCoord })
        // putTileAt(lastCoord, TilesetZone.MyZoneWait, "Occupy");
        setShowButtons({ show: false, x: 0, y: 0 })
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
                showButtons.show &&
                <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: `${showButtons.x - 10}px`, top: `${showButtons.y + 20}px` }}>
                    <button onClick={() => sendTroopClick()}>Send Troop</button>
                    {/* <button onClick={() => occupyClick()}>Attack</button> */}
                    <button onClick={() => buildClick()}>Build</button>
                    <button style={{ marginTop: 10 }} onClick={() => setShowButtons({ show: false, x: 0, y: 0 })}>Cancel</button>
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
            <SendTroopPanel />
        </ClickWrapper>
    )
}