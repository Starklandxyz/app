import { store } from "../store/store";
import { ticStore } from "../store/ticStore";
import { troopStore } from "../store/troopStore";
import { useEffect, useState } from "react";
import { Coord } from "../../node_modules/@latticexyz/utils/src/index";
import { Assets, MAP_HEIGHT, MAP_WIDTH, TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
// import { tileCoordToPixelCoord,ObjectPool } from "../../node_modules/@latticexyz/phaserx/src/index";
import { Tileset, TilesetNum, TilesetSoldier, TilesetZone } from "../artTypes/world";
import { Troop } from "../types/Troop";
import { getTimestamp } from "../utils";
import { controlStore } from "../store/controlStore";
import { tileCoordToPixelCoord } from "../../node_modules/@latticexyz/phaserx/src/index";
import { ObjectPool } from "../../node_modules/@latticexyz/phaserx/src/types";
import sha256 from 'crypto-js/sha256';
import { mapStore } from "../store/mapStore";
import { BuildType } from "../types/Build";
import { buildStore } from "../store/buildstore";
const SIZE = 12

export default function TroopsUI() {
    const { account, phaserLayer } = store()
    const { timenow } = ticStore()
    const { troops } = troopStore()
    const { bases } = buildStore()
    const { lands } = mapStore()
    const { sendTroopCtr } = controlStore()

    const {
        scenes: {
            Main: {
                objectPool,
                maps: {
                    Main: { putTileAt },
                },
            },
        }
    } = phaserLayer!;

    useEffect(() => {
        // console.log("time change", timenow);
        troops.forEach((value, _) => {
            // console.log(value.owner);
            const base = bases.get(value.owner)
            // console.log("troop",value.owner,base);
            const usedtime = timenow - value.startTime
            const left = value.totalTime - usedtime
            // console.log("troop tic", value, left);
            if (left < 0) {
                showTroop(value)
                hideTroopArrow(objectPool, value);
                // removeTroop(value)
                return
            }
            
            var from = { x: value.from.x, y: value.from.y }
            if (base) {
                if (base.x == value.from.x && base.y == value.from.y) {
                    from.x = from.x + 1
                    from.y = from.y + 1
                }
            }
            const start = tileCoordToPixelCoord(from, TILE_WIDTH, TILE_HEIGHT)
            const end = tileCoordToPixelCoord(value.to, TILE_WIDTH, TILE_HEIGHT)
            var speedx = (end.x - start.x) / value.totalTime
            var speedy = (end.y - start.y) / value.totalTime
            var x = start.x + speedx * usedtime
            var y = start.y + speedy * usedtime
            var pos = { x, y }
            var flip = false
            if (end.x < start.x) {
                flip = true
            }
            // console.log("createArmey", value);
            createArmey(objectPool, value.id, pos, left, flip)
        })
    }, [timenow])

    useEffect(() => {
        if (lands.size == 0) {
            return
        }
        troops.forEach((value, _) => {
            if (value.startTime + value.totalTime <= getTimestamp()) {
                return
            }
            createArrowLine(objectPool, value)
        })
    }, [troops, lands])

    useEffect(() => {
        if (!sendTroopCtr.troop) {
            return
        }
        if (sendTroopCtr.show) {
            createArrowLine(objectPool, sendTroopCtr.troop)
        } else {
            hideTroopArrow(objectPool, sendTroopCtr.troop)
        }
    }, [sendTroopCtr])

    const isBase = (pos: Coord) => {
        const land = lands.get(pos.x + "_" + pos.y)
        console.log("isBase", pos, land);
        if (land) {
            if (land.build == BuildType.Base) {
                return true
            }
        }
        return false
    }

    const createArrowLine = (pool: ObjectPool, troop: Troop) => {
        console.log("createArrowLine", troop);

        var from_x = troop.from.x
        var from_y = troop.from.y
        putTileAt(troop.to, TilesetZone.MyZoneWait, "Occupy");
        if (isBase(troop.from)) {
            // troop.from.x = troop.from.x + 1
            // troop.from.y = troop.from.y + 1
            from_x = from_x + 1
            from_y = from_y + 1
        }
        const start = tileCoordToPixelCoord({ x: from_x, y: from_y }, TILE_WIDTH, TILE_HEIGHT)
        const end = tileCoordToPixelCoord(troop.to, TILE_WIDTH, TILE_HEIGHT)
        if (troop.retreat) {
            start.x = start.x + MAP_WIDTH / 2
            start.y = start.y + MAP_HEIGHT / 2
        } else {
            end.x = end.x + MAP_WIDTH / 4
            end.y = end.y + MAP_HEIGHT / 4
        }
        var theta = 0
        if (end.x == start.x) {
            if (end.y > start.y) {
                theta = Math.PI / 2
            }
            if (end.y < start.y) {
                theta = -Math.PI / 2
            }
        } else {
            const m = (end.y - start.y) / (end.x - start.x);
            theta = Math.atan(m);
        }

        const rr = (start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y)
        const length = Math.sqrt(rr) / SIZE

        for (let index = 0; index < Math.ceil(length); index++) {
            const sid = "arrow_" + troop.id + "_" + index
            const arrowObj = pool.get(sid, "Sprite")
            // console.log("createArrowLine",sid,arrowObj);
            arrowObj.spawn()
            arrowObj.setComponent({
                id: "position",
                once: (sprite: any) => {
                    if (sprite.active != true) {
                        return
                    }
                    sprite.setTexture(Assets.Arrow, 0)
                    var x = 0
                    var y = 0

                    //4 zone
                    if (end.x > start.x) {
                        x = start.x + SIZE * Math.cos(theta) * index
                        y = start.y + SIZE * Math.sin(theta) * index
                        sprite.rotation = theta
                    } else if (end.x < start.x) {
                        x = start.x - SIZE * Math.cos(theta) * index
                        y = start.y - SIZE * Math.sin(theta) * index
                        sprite.rotation = theta + Math.PI
                    }
                    sprite.setPosition(x, y)
                    sprite.z = 0
                }
            })
        }
    }

    const createArmey = (pool: ObjectPool, id: number | string, pos: Coord, leftTime: number, flip = false) => {
        const playerObj = pool.get("armey_" + id, "Sprite")
        // console.log("createArmey", pos, leftTime);
        playerObj.spawn()
        playerObj.setComponent({
            id: "position",
            once: (sprite: any) => {
                if (sprite.active != true) {
                    return
                }
                sprite.setTexture(Assets.Armey, 0)
                sprite.setPosition(pos.x, pos.y)
                sprite.flipX = flip
                sprite.rotation = 0
                sprite.z = 10
                sprite.depth = 10
                // console.log("createArmey", sprite.active == true, sprite.flipX, sprite.rotation, sprite.angle);
            }
        })
        const nameObj = pool.get("armey_name_" + id, "Text")
        nameObj.spawn()
        nameObj.setComponent({
            id: 'position',
            once: (text: any) => {
                if (text.active != true) {
                    return
                }
                text.setPosition(pos.x - 10, pos.y - 14);
                text.setBackgroundColor("rgba(0,0,0,0.6)")
                text.setFontSize(11)
                if (leftTime <= 0) {
                    text.setText("00:00")
                } else {
                    var h = Math.floor(leftTime / 3600)
                    var m = Math.floor((leftTime - 3600 * h) / 60)
                    var s = leftTime - h * 3600 - m * 60
                    var hstr = h + ""
                    if (h < 10) {
                        hstr = "0" + h
                    }
                    var mstr = m + ""
                    if (m < 10) {
                        mstr = "0" + m
                    }
                    var sstr = s + ""
                    if (s < 10) {
                        sstr = "0" + s
                    }
                    if (h == 0) {
                        text.setText(mstr + ":" + sstr);
                    } else {
                        text.setText(hstr + ":" + mstr + ":" + sstr);
                    }
                    text.z = 11
                    text.depth = 11
                }
            }
        })
    }

    const removeTroop = (troop: Troop) => {
        // showTroop(troop);
        hideTroopArrow(objectPool, troop);
        // if (troop.retreat) {
        //     const newTroops = new Map(troops)
        //     newTroops.delete(troop.id)
        //     troopStore.setState({ troops: newTroops })
        // }
    }

    const showTroop = (troop: Troop) => {
        // console.log("showTroop", troop.to);
        const pos = troop.to
        var flag = TilesetSoldier.SoldierFlag
        const owner = troop.owner
        if (owner != account?.address) {
            const sha256Hash = sha256(owner).words[0] + sha256(owner).words[1];
            if (sha256Hash % 3 == 0) {
                flag = TilesetSoldier.SoldierFlag2
            } else if (sha256Hash % 3 == 1) {
                flag = TilesetSoldier.SoldierFlag3
            } else {
                flag = TilesetSoldier.SoldierFlag4
            }
        }
        putTileAt(pos, flag, "Top2");
        putTileAt(pos, TilesetZone.MyZoneWait, "Occupy");
    }

    const hideTroopArrow = (pool: ObjectPool, troop: Troop) => {
        pool.remove("armey_" + troop.id)
        pool.remove("armey_name_" + troop.id)
        // putTileAt(troop.to, Tileset.Empty, "Occupy");
        const start = tileCoordToPixelCoord(troop.from, TILE_WIDTH, TILE_HEIGHT)
        const end = tileCoordToPixelCoord(troop.to, TILE_WIDTH, TILE_HEIGHT)
        end.x = end.x + MAP_WIDTH / 4
        end.y = end.y + MAP_HEIGHT / 4
        const rr = (start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y)
        const length = Math.sqrt(rr) / SIZE + 10
        for (let index = 0; index < Math.ceil(length); index++) {
            pool.remove("arrow_" + troop.id + "_" + index)
        }
    }

    return (<
        ></>)
}