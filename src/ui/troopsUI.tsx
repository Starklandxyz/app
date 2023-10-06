import { ObjectPool, WorldCoord } from "@latticexyz/phaserx/dist/types";
import { store } from "../store/store";
import { ticStore } from "../store/ticStore";
import { troopStore } from "../store/troopStore";
import { useEffect, useState } from "react";
import { Coord } from "@latticexyz/utils";
import { Assets, MAP_HEIGHT, MAP_WIDTH, TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { TilesetNum, TilesetSoldier, TilesetZone } from "../artTypes/world";
import { Troop } from "../types/Troop";
import { getTimestamp } from "../utils";
import { controlStore } from "../store/controlStore";
const SIZE = 12

export default function TroopsUI() {
    const { phaserLayer } = store()
    const { timenow } = ticStore()
    const { troops } = troopStore()
    const {sendTroopCtr: sendTroop} = controlStore()

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
            const usedtime = timenow - value.startTime
            const left = value.totalTime - usedtime
            if (left < 0) {
                showTroop(value)
                hideTroopArrow(objectPool, value);
                // removeTroop(value)
                return
            }
            const start = tileCoordToPixelCoord(value.from, TILE_WIDTH, TILE_HEIGHT)
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
            createArmey(objectPool, value.id, pos, left, flip)
        })
    }, [timenow])

    useEffect(() => {
        troops.forEach((value, id) => {
            if (value.startTime + value.totalTime <= getTimestamp()) {
                return
            }
            createArrowLine(objectPool, value)
        })
    }, [troops])

    useEffect(() => {
        if (!sendTroop.troop) {
            return
        }
        if (sendTroop.show) {
            createArrowLine(objectPool,sendTroop.troop)
        } else {
            hideTroopArrow(objectPool, sendTroop.troop)
        }
    }, [sendTroop])

    const createArrowLine = (pool: ObjectPool, troop: Troop) => {
        const start = tileCoordToPixelCoord(troop.from, TILE_WIDTH, TILE_HEIGHT)
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
            const playerObj = pool.get(sid, "Sprite")
            // console.log("createArrowLine",sid,playerObj);
            playerObj.spawn()
            playerObj.setComponent({
                id: "position",
                once: (sprite) => {
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
                }
            })
        }
    }

    const createArmey = (pool: ObjectPool, id: number | string, pos: Coord, leftTime: number, flip = false) => {
        const playerObj = pool.get("armey_" + id, "Sprite")
        // console.log("createArmey",id,flip);
        playerObj.spawn()
        playerObj.setComponent({
            id: "position",
            once: (sprite) => {
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
            once: (text) => {
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
        const pos = troop.to
        putTileAt(pos, TilesetSoldier.SoldierFlag, "Top2");
        putTileAt(pos, TilesetZone.MyZoneWait, "Occupy");
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