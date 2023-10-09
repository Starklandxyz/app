import { useEffect } from "react"
import { store } from "../store/store";
import { Tileset, TilesetBuilding, TilesetNum, TilesetSoldier, TilesetTown, TilesetZone } from "../artTypes/world";
import { tileCoordToPixelCoord } from "../../node_modules/@latticexyz/phaserx/src/index";
import { TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
import { BuildType } from "../types/Build";
import { hexToString } from "../utils";
import { handleSQLResult } from "../utils/handleutils";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
// import { Land } from "../types/Land";
import { ComponentValue, Has, defineSystem, getComponentValue, getComponentValueStrict, setComponent } from "../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
export default function MapUI() {
    // const { bases } = buildStore()
    const { account } = store()
    // const { landWarriors } = warriorStore()
    // const { player, players } = playerStore()
    const { camera, phaserLayer } = store()
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
            components,
            network: { graphSdk }
        }
    } = phaserLayer!;
    const myBase = useComponentValue(components.Base, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));
    const bases = useEntityQuery([Has(components.Base)],{updateOnValueChange:true})
    const mapLands = useEntityQuery([Has(components.Land)],{updateOnValueChange:true})
    const player = useComponentValue(components.Player, getEntityIdFromKeys([BigInt(account ? account.address : "")]));

    const landWarriors = useEntityQuery([Has(components.Warrior)],{updateOnValueChange:true})
  
    useEffect(() => {
        console.log("map base change");

        bases.map((entity) => {
            const value = getComponentValueStrict(components.Base,entity)
            const xStart = value.x
            const yStart = value.y
            var diff = 0
            if (value.owner == account?.address) {
                diff = 6
            }
            // console.log("put base ", xStart);

            putTileAt({ x: xStart, y: yStart }, TilesetTown.Town00 + diff, "Top");
            putTileAt({ x: xStart + 1, y: yStart }, TilesetTown.Town01 + diff, "Top");
            putTileAt({ x: xStart, y: yStart + 1 }, TilesetTown.Town02 + diff, "Top");
            putTileAt({ x: xStart + 1, y: yStart + 1 }, TilesetTown.Town03 + diff, "Top");

            const nameObj = objectPool.get("townname_" + value.owner, "Text")
            const pixelPosition = tileCoordToPixelCoord({ x: xStart, y: yStart }, TILE_WIDTH, TILE_HEIGHT)
            nameObj.setComponent({
                id: 'position',
                once: (text: any) => {
                    text.setPosition(pixelPosition?.x, pixelPosition?.y - 14);
                    text.setBackgroundColor("rgba(0,0,0,0.6)")
                    text.setFontSize(11)
                    if (value.owner == account?.address) {
                        text.setBackgroundColor("rgba(255,0,0,0.6)")
                        text.setText("Me")
                    } else {
                        const p = getComponentValue(components.Player,getEntityIdFromKeys([BigInt(value.owner)]))
                        if(p){
                            text.setText(hexToString(p.nick_name.toString()));
                        }
                    }
                }
            })
        })
    }, [bases])

    useEffect(() => {
        if (!player || !account) {
            return
        }
        // const base = bases.get(account.address)
        if (!myBase) {
            return
        }
        const xStart = myBase.x
        const yStart = myBase.y
        var diff = 6
        putTileAt({ x: xStart, y: yStart }, TilesetTown.Town00 + diff, "Top");
        putTileAt({ x: xStart + 1, y: yStart }, TilesetTown.Town01 + diff, "Top");
        putTileAt({ x: xStart, y: yStart + 1 }, TilesetTown.Town02 + diff, "Top");
        putTileAt({ x: xStart + 1, y: yStart + 1 }, TilesetTown.Town03 + diff, "Top");
        const pixelPosition = tileCoordToPixelCoord({ x: myBase.x, y: myBase.y }, TILE_WIDTH, TILE_HEIGHT);
        camera?.centerOn(pixelPosition?.x!, pixelPosition?.y!);
    }, [player,myBase])

    useEffect(() => {
        fetchAllLands("0x1")
        fetchAllBase("0x1")
    }, [])

    const fetchAllLands = async (map_id: string) => {
        const lands = await graphSdk.getAllLands({ map_id: map_id })
        console.log("fetchAllLands", lands);
        const edges = lands.data.entities?.edges
        handleSQLResult(edges,components)
        // const ls = new Map(mapLands)
        // const landW = new Map(landWarriors);
        // if (edges) {
        //     for (let index = 0; index < edges.length; index++) {
        //         const element = edges[index];
        //         if (element) {
        //             const node = element.node
        //             const componenets = node?.components
        //             if (componenets) {
        //                 for (let index = 0; index < componenets.length; index++) {
        //                     const componenet = componenets[index];
        //                     if (componenet) {
        //                         if (componenet.__typename == "Land") {
        //                             // const component = componenets[0] as Land
        //                             const l = Land2Land(componenet)
        //                             ls.set(l.x + "_" + l.y, l)
        //                         }
        //                         if (componenet.__typename == "Warrior") {
        //                             landW.set(componenet.x + "_" + componenet.y, componenet.balance)
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // mapStore.setState({ lands: ls })
        // warriorStore.setState({ landWarriors: landW })
    }

    // const fetchPlayerBase = async () => {
    //     const base = await graphSdk.getBaseByKey({ key: account?.address!, map_id: "0x1" })
    //     console.log("fetchPlayerBase", account?.address, base);
    //     const edges = base.data.entities?.edges;
    //     if (edges && edges.length > 0) {
    //         const pos = edges[0]?.node?.components
    //         if (pos && pos.length > 0 && pos[0]) {
    //             const p = pos[0] as Base
    //             const x = p.x;
    //             const y = p.y;
    //             const newBases = new Map(bases);
    //             newBases.set(account?.address!, { x, y })
    //             buildStore.setState({ bases: newBases })
    //             const pixelPosition = tileCoordToPixelCoord({ x, y }, TILE_WIDTH, TILE_HEIGHT);
    //             camera?.centerOn(pixelPosition?.x!, pixelPosition?.y!);
    //         }
    //     }
    // }
    const fetchAllBase = async (map_id: string) => {
        const base = await graphSdk.getAllBase({ map_id: map_id })
        console.log("fetchAllBase", account?.address, base);
        const edges = base.data.entities?.edges;
        handleSQLResult(edges,components)
        // const newBases = new Map(bases);
        // if (edges && edges.length > 0) {
        //     for (let index = 0; index < edges.length; index++) {
        //         const edge = edges[index];
        //         if (edge) {
        //             const c = edge.node?.components
        //             if (c && c[0] && c[0].__typename == "Base") {
        //                 const b = c[0] as Base
        //                 const coord = { x: b.x, y: b.y }
        //                 newBases.set(b.owner, coord)
        //             }
        //         }
        //     }
        // }
        // console.log("fetchAllBase");
        // buildStore.setState({ bases: newBases })
    }

    useEffect(() => {
        landWarriors.map(value => {
            const warrior = getComponentValue(components.Warrior,value)
            if(!warrior){
                return
            }
            // console.log("landWarriors", key, balance);
            // const keys = key.split("_")
            console.log("landWarriors",warrior);
            
            const coord = { x: warrior.x, y: warrior.y }
            const balance = warrior.balance
            if (balance == 0) {
                putTileAt(coord, TilesetSoldier.Soldier1, "Top2");
                putTileAt(coord, TilesetNum.Num0, "Top3");
            }
            else if (balance < 10) {
                putTileAt(coord, TilesetSoldier.Soldier1, "Top2");
                putTileAt(coord, TilesetNum.Num1 + balance - 1, "Top3");
            } else if (balance < 100) {
                putTileAt(coord, TilesetSoldier.Soldier10, "Top2");
                const b = Math.floor(balance / 10)
                putTileAt(coord, TilesetNum.Num1 + b - 1, "Top3");
            } else if (balance < 1000) {
                putTileAt(coord, TilesetSoldier.Soldier100, "Top2");
                const b = Math.floor(balance / 100)
                putTileAt(coord, TilesetNum.Num1 + b - 1, "Top3");
            }
        })
    }, [landWarriors])

    useEffect(() => {
        mapLands.map(entity => {
            const land = getComponentValue(components.Land,entity)
            if(!land || land?.building==BuildType.Base){
                return
            }
            var tile = 1
            const buildLand = { x: land.x, y: land.y }
            switch (land?.building) {
                case BuildType.Camp: tile = TilesetBuilding.Camp; break;
                case BuildType.GoldMine: tile = TilesetBuilding.GoldMine; break;
                case BuildType.IronMine: tile = TilesetBuilding.IronMine; break;
                case BuildType.Farmland: tile = TilesetBuilding.Farmland; break;
                // case BuildType.Base: tile = TilesetTown.Town00; break;
            }
            putTileAt(buildLand, tile, "Top");
            if (land.owner == account?.address) {
                putTileAt(buildLand, TilesetZone.MyZone, "Occupy");
            } else {
                putTileAt(buildLand, TilesetZone.EnermyZone, "Occupy");
            }
        })
    }, [mapLands])

    return (
        <>

        </>
    )
}