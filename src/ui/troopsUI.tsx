import { store } from "../store/store";
import { ticStore } from "../store/ticStore";
import { useEffect, useState } from "react";
import { Coord } from "../../node_modules/@latticexyz/utils/src/index";
import { Assets, MAP_HEIGHT, MAP_WIDTH, TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
// import { tileCoordToPixelCoord,ObjectPool } from "../../node_modules/@latticexyz/phaserx/src/index";
import { Tileset, TilesetNum, TilesetSoldier, TilesetZone } from "../artTypes/world";
import { Troop, Troop2Troop } from "../types/Troop";
import { getTimestamp } from "../utils";
import { tileCoordToPixelCoord } from "../../node_modules/@latticexyz/phaserx/src/index";
import { ObjectPool } from "../../node_modules/@latticexyz/phaserx/src/types";
import sha256 from 'crypto-js/sha256';
import { BuildType } from "../types/Build";
import { ComponentValue, Has, defineSystem, getComponentValue, getComponentValueStrict, setComponent } from "../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { useEntityQuery } from "@dojoengine/react";
const SIZE = 12

export default function TroopsUI() {
    const { account, phaserLayer } = store()
    const { timenow } = ticStore()

    const {
        scenes: {
            Main: {
                objectPool,
                maps: {
                    Main: { putTileAt },
                },
            },
        },
        networkLayer: {
            components
        }
    } = phaserLayer!;


    const troops = useEntityQuery([Has(components.Troop)], { updateOnValueChange: true })

    useEffect(() => {
        troops.map(entity => {
            const t = getComponentValue(components.Troop, entity)
            if (!t) {
                return
            }
            const value = Troop2Troop(t)
            const base = getComponentValue(components.Base, getEntityIdFromKeys([1n, BigInt(value.owner)]))
            const usedtime = timenow - value.startTime
            const left = value.totalTime - usedtime
            console.log("time change",timenow,value);
            
            if (value.startTime != 0 && left < 0) {
                showFlag(value)
                hideTroopArrow(objectPool, value);
                return
            }
            var from = { x: value.from.x, y: value.from.y }
            var to = { x: value.to.x, y: value.to.y }
            if (base) {
                if (base.x == value.from.x && base.y == value.from.y) {
                    from.x = from.x + 1
                    from.y = from.y + 1
                }
                if (base.x == value.to.x && base.y == value.to.y) {
                    to.x = to.x + 1
                    to.y = to.y + 1
                }
            }
            const start = tileCoordToPixelCoord(from, TILE_WIDTH, TILE_HEIGHT)
            const end = tileCoordToPixelCoord(to, TILE_WIDTH, TILE_HEIGHT)
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
            if (value.owner == account?.address) {
                if (value.retreat) {
                    hideFlag(value.from)
                }
            }
            if (value.startTime == 0) {
                hideFlag(value.to)
            }
        })
    }, [timenow])

    useEffect(() => {
        troops.map(entity => {
            const t = getComponentValue(components.Troop, entity)
            if (!t) {
                return
            }
            const value = Troop2Troop(t)
            if (value.startTime + value.totalTime <= getTimestamp()) {
                return
            }
            createArrowLine(objectPool, value)
        })
    }, [troops])

    const isBase = (pos: Coord) => {
        // const land = lands.get(pos.x + "_" + pos.y)
        const land = getComponentValue(components.Land, getEntityIdFromKeys([1n, BigInt(pos.x), BigInt(pos.y)]))
        console.log("isBase", pos, land);
        if (land) {
            if (land.building == BuildType.Base) {
                return true
            }
        }
        return false
    }

    const createArrowLine = (pool: ObjectPool, troop: Troop) => {
        console.log("createArrowLine", troop);

        var from_x = troop.from.x
        var from_y = troop.from.y
        var to_x = troop.to.x
        var to_y = troop.to.y
        putTileAt(troop.to, TilesetZone.MyZoneWait, "Occupy");
        if (isBase(troop.from)) {
            from_x = from_x + 1
            from_y = from_y + 1
        }
        if (isBase(troop.to)) {
            to_x = to_x + 1
            to_y = to_y + 1
        }
        const start = tileCoordToPixelCoord({ x: from_x, y: from_y }, TILE_WIDTH, TILE_HEIGHT)
        const end = tileCoordToPixelCoord({ x: to_x, y: to_y }, TILE_WIDTH, TILE_HEIGHT)
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
                sprite.depth = 12
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

    const hideFlag = (pos: Coord) => {
        // console.log("hideFlag");
        putTileAt(pos, Tileset.Empty, "Flag");
        putTileAt(pos, Tileset.Empty, "TempOccupy");
    }

    const showFlag = (troop: Troop) => {
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
        putTileAt(pos, flag, "Flag");
        putTileAt(pos, TilesetZone.MyZoneWait, "TempOccupy");
    }

    const hideTroopArrow = (pool: ObjectPool, troop: Troop) => {
        pool.remove("armey_" + troop.id)
        pool.remove("armey_name_" + troop.id)
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