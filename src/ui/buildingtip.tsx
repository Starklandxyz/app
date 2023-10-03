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
import { Coord } from "@latticexyz/utils";
import { troopStore } from "../store/troopStore";
import { Troop } from "../types/Troop";
import { buildStore } from "../store/buildstore";
import SendTroopPanel from "./sendTroopPanel";
import { controlStore } from "../store/controlStore";
export default function BuildingTip() {
    const { camera, phaserLayer,account } = store()
    const { bases } = buildStore()
    const { tooltip: ptooltip } = tipStore();
    const [tooltip, settooltip] = useState({ show: false, content: <></>, x: 0, y: 0 })
    const [showButtons, setShowButtons] = useState({ show: false, x: 0, y: 0 })

    const { x: ex, y: ey, down: mouseDown } = mouseStore()
    const [lastCoord, setCoord] = useState<WorldCoord>({ x: 0, y: 0 })

    const {sendTroop} = controlStore()

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
        settooltip({
            show: true, x: x, y: y, content: <div>
                <p>Gold</p>
                <p>Owner : No Owner</p>
                <p>Speed : 100 Gold/Day</p>
                <p>Warrior : 1</p>
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

        if(sendTroop.show){
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
        if(!account){
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
        // setSendCoord(lastCoord)
        const troop = new Troop(account?.address!,bases.get(account?.address!)!,lastCoord,getTimestamp())
        controlStore.setState({sendTroop:{troop:troop,show:true}})
        setShowButtons({ show: false, x: 0, y: 0 })
        // putTileAt(lastCoord, TilesetZone.MyZoneWait, "Occupy");
        // addTroop(lastCoord)
    }

    const buildFarmland = () => {
        setShowButtons({ show: false, x: 0, y: 0 })
        toastSuccess("Build success")
        putTileAt(lastCoord, TilesetBuilding.Farmland, "Top");
        putTileAt(lastCoord, TilesetZone.MyZone, "Occupy");
    }
    const buildGoldMine = () => {
        setShowButtons({ show: false, x: 0, y: 0 })
        toastSuccess("Build success")
        putTileAt(lastCoord, TilesetBuilding.GoldMine, "Top");
        putTileAt(lastCoord, TilesetZone.MyZone, "Occupy");
    }
    const buildIronMine = () => {
        setShowButtons({ show: false, x: 0, y: 0 })
        toastSuccess("Build success")
        putTileAt(lastCoord, TilesetBuilding.IronMine, "Top");
        putTileAt(lastCoord, TilesetZone.MyZone, "Occupy");
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
                    <button onClick={() => occupyClick()}>Attack</button>
                    <button onClick={() => buildFarmland()}>Farmland</button>
                    <button onClick={() => buildGoldMine()}>GoldMine</button>
                    <button onClick={() => buildIronMine()}>IronMine</button>
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
            <SendTroopPanel/>
        </ClickWrapper>
    )
}