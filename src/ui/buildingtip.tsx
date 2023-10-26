import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "../../node_modules/@latticexyz/phaserx/src/index";
import { MAP_WIDTH, TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
import { mouseStore } from "../store/mouseStore";
import { useEffect, useMemo, useState } from "react";
import { store } from "../store/store";
import { buildingCoorpToPosition, getTimestamp, hexToString, toastError, toastSuccess } from "../utils";
import { Tileset, TilesetBuilding, TilesetNum, TilesetSelect, TilesetSoldier, TilesetZone } from "../artTypes/world";
import { ClickWrapper } from "./clickWrapper";
import { Troop } from "../types/Troop";
import { controlStore } from "../store/controlStore";
import { BuildType } from "../types/Build";
import { LandType, get_land_barbarians, get_land_level, get_land_type } from "../types/Land";
import { useComponentValue } from "../../node_modules/@latticexyz/react";
import { ComponentValue, Has, defineSystem, getComponentValue, getComponentValueStrict, setComponent } from "../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
export default function BuildingTip() {
    const { camera, phaserLayer, account } = store()
    const [tooltip, settooltip] = useState({ show: false, content: <></>, x: 0, y: 0, position: "" })

    const { coord: lastCoord, down: mouseDown, coords, downCoord, upCoord } = mouseStore()
    const { sendTroopCtr: sendTroop, buildLand, addTipButton, showTipButtons, tipButtonShow } = controlStore()

    const {
        scenes: {
            Main: {
                maps: {
                    Main: { putTileAt },
                },
            },
        },
        networkLayer: {
            systemCalls: { removeBuilding },
            components: contractComponents
        }
    } = phaserLayer!;

    const myBase = useComponentValue(contractComponents.HBase, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));

    useEffect(() => {
        const x = MAP_WIDTH / 2
        const y = x
        const pixelPosition = tileCoordToPixelCoord({ x, y }, TILE_WIDTH, TILE_HEIGHT);
        console.log("center On");
        camera?.centerOn(pixelPosition?.x!, pixelPosition?.y!);
    }, [])

    useEffect(() => {
        if (!camera) {
            return
        }
        const land = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(lastCoord.x), BigInt(lastCoord.y)]))
        const xx = lastCoord.x
        const yy = lastCoord.y
        const xxx = xx.toString()
        const yyy = yy.toString()
        var p = `(${xxx},${yyy})`
        const c = tileCoordToPixelCoord(lastCoord, TILE_WIDTH, TILE_HEIGHT)

        const ex = c.x * 2 - camera.phaserCamera.worldView.x * 2
        const ey = c.y * 2 - camera.phaserCamera.worldView.y * 2
        console.log("lastCoord", lastCoord, c, ex, ey, innerWidth);
        if (ex > innerWidth - 60) {
            return
        }
        var land_name = "Land"
        var land_owner = "Owner : No Owner"
        var land_desc = ""
        var land_level = ""
        const land_baba = get_land_barbarians(1, lastCoord.x, lastCoord.y).toString()
        // console.log("land_baba",land_baba);

        var land_warrior = <></>
        if (lastCoord.x == 52 && lastCoord.y == 52) {
            console.log("island");
        }

        if (land) {
            switch (land.building) {
                case BuildType.None: break;
                case BuildType.Base: land_name = "Base"; break;
                case BuildType.Farmland: land_name = "Farmland"; break;
                case BuildType.IronMine: land_name = "IronMine"; break;
                case BuildType.GoldMine: land_name = "GoldMine"; break;
                case BuildType.Camp: land_name = "Camp"; break;
                case BuildType.Fort: land_name = "Fort"; break;
            }
            if (land.owner) {
                const p = getComponentValue(contractComponents.Player, getEntityIdFromKeys([BigInt(land.owner)]))
                const name = p?.nick_name;
                if (name) {
                    land_owner = "Owner : " + hexToString(name)
                }
            }
            land_level = "Level : " + land.level
            const w = getComponentValue(contractComponents.Warrior, getEntityIdFromKeys([1n, BigInt(lastCoord.x), BigInt(lastCoord.y)]))
            if (w) {
                // land_warrior = "Warrior : " + w.balance
                land_warrior = <>
                    Warrior : {land_baba} + <span style={{ color: "yellow" }}>{w.balance}</span>
                </>
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
            if (land_type == LandType.Gold || land_type == LandType.Iron) {
                const w = getComponentValue(contractComponents.LandMiner, getEntityIdFromKeys([1n, BigInt(lastCoord.x), BigInt(lastCoord.y)]))
                land_owner = "Miner : None"
                if (w) {
                    const l = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(w.miner_x), BigInt(w.miner_y)]))
                    land_owner = "Miner : " + w.miner_x + "," + w.miner_y
                    if (l) {
                        const o = l.owner
                        const p = getComponentValue(contractComponents.Player, getEntityIdFromKeys([BigInt(o)]))
                        if (p) {

                            land_owner = "Miner : " + hexToString(p.nick_name)
                        }
                    }
                }
            }

            // land_warrior = "Warrior : " + land_baba.toString()
            land_warrior = <>
                Warrior : {land_baba}
            </>

            land_level = "Level : " + get_land_level(1, lastCoord.x, lastCoord.y)
            if (get_land_level(1, lastCoord.x, lastCoord.y) == 6 && land_type == LandType.None) {
                land_name = "Monster Den"
                land_owner = "Owner : Diabolo"
            }
            if (land_type != LandType.None) {
                land_warrior = <></>
                land_level = ""
            }
        }

        var x = ex + 180
        if (ex > innerWidth - 550) {
            x = ex - 120
        }
        var y = ey - 40
        if (ey > innerHeight - 200) {
            y = ey - 100
        }
        if (ey < 160) {
            y = ey + 120
        }
        setTip({
            show: true, x: x, y: y,
            position: p,
            content:
                <div>
                    <div style={{ marginTop: 5 }}>{land_name}</div>
                    <div style={{ marginTop: 5 }}>{p}</div>
                    <div style={{ marginTop: 5 }}>{land_owner}</div>
                    <div style={{ marginTop: 5 }}>{land_desc}</div>
                    <div style={{ marginTop: 5 }}>{land_level}</div>
                    <div style={{ marginTop: 5 }}>{land_warrior}</div>
                </div>
        })

    }, [lastCoord])

    const setTip = (tip: any) => {
        // console.log("setTip", tip);
        settooltip(tip)
    }


    useEffect(() => {
        if (!camera) { return }
        const cc = tileCoordToPixelCoord(lastCoord, TILE_WIDTH, TILE_HEIGHT)
        const ex = cc.x * 2 - camera.phaserCamera.worldView.x * 2
        // const ey = cc.y * 2 - camera.phaserCamera.worldView.y * 2
        // console.log("lastCoord", lastCoord, cc, ex, ey, innerWidth);
        if (ex > innerWidth - 60) {
            return
        }
        const q = coords.clone()
        let c = q.dequeue()
        while (c) {
            putTileAt(c, Tileset.Empty, "Select");
            c = q.dequeue()
        }
        if (lastCoord.x != 0 && lastCoord.y != 0) {
            putTileAt(lastCoord, TilesetSelect.Color3, "Select");
        }
    }, [lastCoord])

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
        if (tipButtonShow.show) {
            return
        }
        if (!camera) {
            return
        }
        if (!mouseDown) {
            if (upCoord && downCoord) {
                if (upCoord.x != downCoord.x || upCoord.y != downCoord.y) {
                    return
                }
            }
            const c = tileCoordToPixelCoord(lastCoord, TILE_WIDTH, TILE_HEIGHT)
            console.log("click lastCoord", lastCoord, c);
            const ex = c.x * 2 - camera.phaserCamera.worldView.x * 2
            const ey = c.y * 2 - camera.phaserCamera.worldView.y * 2
            var x = ex
            var y = ey + 50
            if (ey > innerHeight - 200) {
                y = ey - 100
            }
            console.log("click", lastCoord, x, y);
            controlStore.setState({ tipButtonShow: { show: true, x: x, y: y }, clickedLand: { x: lastCoord.x, y: lastCoord.y } })
        }
    }, [mouseDown, account])

    useEffect(() => {
        console.log("building tip account", account);

    }, [account])

    const sendTroopClick = () => {
        console.log("sendTroopClick");
        if (!account) {
            return
        }
        if (!myBase) {
            return
        }

        console.error("sendTroopClick", tooltip);
        settooltip({ show: true, x: window.innerWidth * 0.3, y: window.innerHeight * 0.5, content: tooltip.content, position: "" })
        const troop = new Troop(account.address, myBase, lastCoord, getTimestamp())
        controlStore.setState({ sendTroopCtr: { troop: troop, show: true }, tipButtonShow: { show: false, x: 0, y: 0 } })
    }

    const removeBuild = async () => {
        controlStore.setState({ removeBuild: { x: lastCoord.x, y: lastCoord.y }, tipButtonShow: { show: false, x: 0, y: 0 } })
    }

    const retreat = () => {
        if (!account) {
            return
        }
        settooltip({ show: true, x: window.screen.width * 0.27, y: window.screen.height * 0.45, content: tooltip.content, position: "" })
        const troop = new Troop(account.address, lastCoord, myBase, getTimestamp())
        controlStore.setState({ sendTroopCtr: { troop: troop, show: true }, tipButtonShow: { show: false, x: 0, y: 0 } })
    }

    const buildClick = () => {
        controlStore.setState({ buildLand: lastCoord, tipButtonShow: { show: false, x: 0, y: 0 } })
    }


    const getButtons = useMemo(() => {
        if (!account) {
            return <></>
        }
        if (!tipButtonShow.show) {
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
                const w = getComponentValue(contractComponents.Warrior, getEntityIdFromKeys([1n, BigInt(lastCoord.x), BigInt(lastCoord.y)]))
                let hasW = false
                if (w && w.balance > 0) {
                    hasW = true
                }
                if (land.building == BuildType.None) {
                    return <>
                        <button style={{ zIndex: 10 }} onClick={() => sendTroopClick()}>Send Troop</button>
                        <button style={{ zIndex: 10, marginTop: 5 }} onClick={() => buildClick()}>Build</button>
                        {hasW && <button style={{ zIndex: 10, marginTop: 5 }} onClick={() => retreat()}>Retreat Warrior</button>}
                    </>
                } else {
                    return <>
                        <button style={{ zIndex: 10 }} onClick={() => sendTroopClick()}>Send Troop</button>
                        <button style={{ zIndex: 10, marginTop: 5 }} onClick={() => removeBuild()}>Remove Build</button>
                        {hasW && <button style={{ zIndex: 10, marginTop: 5 }} onClick={() => retreat()}>Retreat Warrior</button>}
                    </>
                }
            }
        } else {
            const type = get_land_type(1, lastCoord.x, lastCoord.y)
            if (type != LandType.None) {
                return <></>
            }
        }
        return <button style={{ zIndex: 10 }} onClick={() => sendTroopClick()}>Send Troop</button>
    }, [myBase, account, lastCoord, tipButtonShow])

    return (
        <ClickWrapper>
            {tooltip.show && (
                <div
                    className="tooltip"
                    style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
                >
                    {tooltip.content}
                </div>
            )}
            {
                tipButtonShow.show &&
                <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: `${tipButtonShow.x - 10}px`, top: `${tipButtonShow.y + 20}px` }}>
                    {
                        addTipButton
                    }
                    {
                        getButtons
                    }
                    {/* <button onClick={() => buildClick()}>Build</button> */}
                    {/* <button onClick={() => attack()}>Attack</button> */}
                    <button style={{ marginTop: 10, zIndex: 10 }} onClick={() => controlStore.setState({ tipButtonShow: { show: false, x: 0, y: 0 } })}>Cancel</button>

                </div>
            }


        </ClickWrapper>
    )
}