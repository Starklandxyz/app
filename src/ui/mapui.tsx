import { useEffect, useState } from "react"
import { store } from "../store/store";
import { TileAnimationKey, Tileset, TilesetBuilding, TilesetNum, TilesetSoldier, TilesetTown, TilesetZone } from "../artTypes/world";
import { tileCoordToPixelCoord } from "../../node_modules/@latticexyz/phaserx/src/index";
import { TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
import { BuildType } from "../types/Build";
import { hexToString } from "../utils";
import { handleSQLResult } from "../utils/handleutils";
import { useComponentValue, useEntityQuery } from "../../node_modules/@latticexyz/react";
// import { Land } from "../types/Land";
import { ComponentValue, Has, defineSystem, getComponentValue, getComponentValueStrict, setComponent } from "../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { LandType, get_land_type } from "../types/Land";
export default function MapUI() {
    const { account } = store()
    const { camera, phaserLayer } = store()
    const {
        scenes: {

            Main: {
                objectPool,
                maps: {
                    Main: { putTileAt ,putAnimationAt,removeAnimationAt},
                },
            },
        },
        networkLayer: {
            components,
            network: { graphSdk }
        }
    } = phaserLayer!;
    const myBase = useComponentValue(components.HBase, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));
    const bases = useEntityQuery([Has(components.HBase)], { updateOnValueChange: true })
    const mapLands = useEntityQuery([Has(components.Land)], { updateOnValueChange: true })
    const minerLands = useEntityQuery([Has(components.LandMiner)], { updateOnValueChange: true })
    const player = useComponentValue(components.Player, getEntityIdFromKeys([BigInt(account ? account.address : "")]));

    const landWarriors = useEntityQuery([Has(components.Warrior)], { updateOnValueChange: true })
    const [initialized,setInitialized] = useState(false)

    useEffect(() => {
        console.log("map base change");
        bases.map((entity) => {
            const value = getComponentValueStrict(components.HBase, entity)
            const xStart = value.x
            const yStart = value.y
            var diff = 0
            if (value.owner == account?.address) {
                diff = 6
            }
            // console.log("put bases ", value,account,diff);

            putTileAt({ x: xStart, y: yStart }, TilesetTown.Town00 + diff, "Build");
            putTileAt({ x: xStart + 1, y: yStart }, TilesetTown.Town01 + diff, "Build");
            putTileAt({ x: xStart, y: yStart + 1 }, TilesetTown.Town02 + diff, "Build");
            putTileAt({ x: xStart + 1, y: yStart + 1 }, TilesetTown.Town03 + diff, "Build");

            const nameObj = objectPool.get("townname_" + value.owner, "Text")
            const pixelPosition = tileCoordToPixelCoord({ x: xStart, y: yStart }, TILE_WIDTH, TILE_HEIGHT)
            nameObj.setComponent({
                id: 'position',
                once: (text: any) => {
                    text.setPosition(pixelPosition?.x, pixelPosition?.y - 14);
                    text.setBackgroundColor("rgba(0,0,0,0.6)")
                    text.setFontSize(11)
                    // console.log("map id", value.owner, account?.address);

                    if (value.owner == account?.address) {
                        text.setBackgroundColor("rgba(255,0,0,0.6)")
                        text.setText("Me")
                    } else {
                        const p = getComponentValue(components.Player, getEntityIdFromKeys([BigInt(value.owner)]))
                        if (p) {
                            text.setText(hexToString(p.nick_name.toString()));
                        }
                    }
                }
            })
        })
    }, [bases, account])

    useEffect(()=>{
        console.log("change myBase");
    },[myBase])

    useEffect(() => {
        if (!player || !account) {
            return
        }
        // const base = bases.get(account.address)
        if (!myBase) {
            return
        }
        if(initialized){
            return
        }
        setInitialized(true)

        const xStart = myBase.x
        const yStart = myBase.y
        var diff = 6
        putTileAt({ x: xStart, y: yStart }, TilesetTown.Town00 + diff, "Build");
        putTileAt({ x: xStart + 1, y: yStart }, TilesetTown.Town01 + diff, "Build");
        putTileAt({ x: xStart, y: yStart + 1 }, TilesetTown.Town02 + diff, "Build");
        putTileAt({ x: xStart + 1, y: yStart + 1 }, TilesetTown.Town03 + diff, "Build");
        const pixelPosition = tileCoordToPixelCoord({ x: myBase.x + 1, y: myBase.y + 1 }, TILE_WIDTH, TILE_HEIGHT);
        console.log("center On");
        camera?.centerOn(pixelPosition?.x!, pixelPosition?.y!);
    }, [player, myBase])

    useEffect(() => {
        fetchAllLands("0x1")
        fetchAllBase("0x1")
    }, [])

    const fetchAllLands = async (map_id: string) => {
        const lands = await graphSdk.getAllLands({ map_id: map_id })
        console.log("fetchAllLands", lands);
        const edges = lands.data.entities?.edges
        handleSQLResult(edges, components)
    }

    const fetchAllBase = async (map_id: string) => {
        const base = await graphSdk.getAllBase({ map_id: map_id })
        console.log("fetchAllBase", account?.address, base);
        const edges = base.data.entities?.edges;
        handleSQLResult(edges, components)
    }

    useEffect(() => {
        landWarriors.map(value => {
            const warrior = getComponentValue(components.Warrior, value)
            if (!warrior) {
                return
            }
            // console.log("landWarriors", key, balance);
            // const keys = key.split("_")
            // console.log("landWarriors",warrior);

            const coord = { x: warrior.x, y: warrior.y }
            const balance = warrior.balance
            if (balance == 0) {
                putTileAt(coord, Tileset.Empty, "Soldier");
                putTileAt(coord, Tileset.Empty, "Num");
            }
            else if (balance < 10) {
                putTileAt(coord, TilesetSoldier.Soldier1, "Soldier");
                putTileAt(coord, TilesetNum.Num1 + balance - 1, "Num");
            } else if (balance < 100) {
                putTileAt(coord, TilesetSoldier.Soldier10, "Soldier");
                const b = Math.floor(balance / 10)
                putTileAt(coord, TilesetNum.Num1 + b - 1, "Num");
            } else if (balance < 1000) {
                putTileAt(coord, TilesetSoldier.Soldier100, "Soldier");
                const b = Math.floor(balance / 100)
                putTileAt(coord, TilesetNum.Num1 + b - 1, "Num");
            }else{
                putTileAt(coord, TilesetSoldier.Soldier1000, "Soldier");
                const b = Math.floor(balance / 1000)
                putTileAt(coord, TilesetNum.Num1 + b - 1, "Num");
            }
        })
    }, [landWarriors])

    useEffect(() => {
        console.log("mapLands", mapLands.length);

        mapLands.map(entity => {
            const land = getComponentValue(components.Land, entity)
            if (!land || land?.building == BuildType.Base) {
                return
            }
            var tile = undefined
            const buildLand = { x: land.x, y: land.y }
            switch (land?.building) {
                case BuildType.Camp: tile = TileAnimationKey.Camp; break;
                case BuildType.GoldMine: tile = TileAnimationKey.GoldMine; break;
                case BuildType.IronMine: tile = TileAnimationKey.IronMine; break;
                case BuildType.Farmland: tile = TileAnimationKey.Farmland; break;
                case BuildType.Fort: tile = TileAnimationKey.Fort; break;
                // case BuildType.None:tile = Tileset.Empty;break;
            }
            if (tile) {
                putAnimationAt(buildLand,tile,"Build")
            }else{
                // removeAnimationAt: (coord: WorldCoord, layer?: LayerKeys) => void;
                removeAnimationAt(buildLand,"Build")
                putTileAt(buildLand, Tileset.Empty, "Build");
            }

            if (land.owner == account?.address) {
                putTileAt(buildLand, TilesetZone.MyZone, "Occupy");
            } else {
                putTileAt(buildLand, TilesetZone.EnermyZone, "Occupy");
            }
            if (land.building == BuildType.Fort) {
                const nameObj = objectPool.get("fortname_" + land.x+","+land.y, "Text")
                const pixelPosition = tileCoordToPixelCoord({ x: land.x, y: land.y }, TILE_WIDTH, TILE_HEIGHT)
                nameObj.setComponent({
                    id: 'position',
                    once: (text: any) => {
                        text.setPosition(pixelPosition?.x, pixelPosition?.y - 14);
                        text.setBackgroundColor("rgba(0,0,0,0.6)")
                        text.setFontSize(11)
                        if (land.owner == account?.address) {
                            text.setBackgroundColor("rgba(255,0,0,0.6)")
                            text.setText("Me")
                        } else {
                            const p = getComponentValue(components.Player, getEntityIdFromKeys([BigInt(land.owner)]))
                            if (p) {
                                text.setText(hexToString(p.nick_name.toString()));
                            }
                        }
                    }
                })
            }
        })
    }, [mapLands, account])

    useEffect(() => {
        minerLands.map(entity => {
            const miner = getComponentValue(components.LandMiner, entity)
            if (!miner) { return }

            const buildLand = { x: miner.x, y: miner.y }
            const type = get_land_type(1, miner.x, miner.y)
            // console.log("LandMiner",miner);
            
            if (type != LandType.None) {
                if(miner.miner_x!=0 && miner.miner_y!=0){
                    putTileAt(buildLand, TilesetBuilding.Mining, "Flag");
                }else{
                    putTileAt(buildLand, Tileset.Empty, "Flag");
                }
            }
        })
    }, [minerLands])

    return (
        <>

        </>
    )
}