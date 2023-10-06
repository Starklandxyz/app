import { useEffect } from "react"
import { buildStore } from "../store/buildstore"
import { store } from "../store/store";
import { Tileset, TilesetBuilding, TilesetNum, TilesetSoldier, TilesetTown, TilesetZone } from "../artTypes/world";
import { playerStore } from "../store/playerStore";
import { Base, Land } from "../generated/graphql";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
import { mapStore } from "../store/mapStore";
import { Land2Land, Player2Player } from "../types";
import { BuildType } from "../types/Build";
import { hexToString } from "../utils";
import { warriorStore } from "../store/warriorstore";
// import { Land } from "../types/Land";

export default function MapUI() {
    const { bases } = buildStore()
    const { account } = store()
    const { landWarriors } = warriorStore()
    const { lands: mapLands } = mapStore()
    const { player, players } = playerStore()
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
            network: { graphSdk }
        }
    } = phaserLayer!;

    useEffect(() => {
        console.log("map base change");

        bases.forEach((value, key) => {
            const xStart = value.x
            const yStart = value.y
            var diff = 0
            if (key == account?.address) {
                diff = 6
            }
            putTileAt({ x: xStart, y: yStart }, TilesetTown.Town00 + diff, "Top");
            putTileAt({ x: xStart + 1, y: yStart }, TilesetTown.Town01 + diff, "Top");
            putTileAt({ x: xStart, y: yStart + 1 }, TilesetTown.Town02 + diff, "Top");
            putTileAt({ x: xStart + 1, y: yStart + 1 }, TilesetTown.Town03 + diff, "Top");

            const nameObj = objectPool.get("townname_" + key, "Text")
            const pixelPosition = tileCoordToPixelCoord({ x: xStart, y: yStart }, TILE_WIDTH, TILE_HEIGHT)
            nameObj.setComponent({
                id: 'position',
                once: (text) => {
                    text.setPosition(pixelPosition?.x, pixelPosition?.y - 14);
                    text.setBackgroundColor("rgba(0,0,0,0.6)")
                    text.setFontSize(11)
                    if (key == account?.address) {
                        text.setBackgroundColor("rgba(255,0,0,0.6)")
                        text.setText("Me")
                    } else {
                        text.setText(hexToString(players.get(key)?.nick_name));
                    }
                }
            })
        })
    }, [bases.keys()])

    useEffect(() => {
        if (!player || !account) {
            return
        }
        const base = bases.get(account.address)
        if (!base) {
            return
        }
        const xStart = base.x
        const yStart = base.y
        var diff = 6
        putTileAt({ x: xStart, y: yStart }, TilesetTown.Town00 + diff, "Top");
        putTileAt({ x: xStart + 1, y: yStart }, TilesetTown.Town01 + diff, "Top");
        putTileAt({ x: xStart, y: yStart + 1 }, TilesetTown.Town02 + diff, "Top");
        putTileAt({ x: xStart + 1, y: yStart + 1 }, TilesetTown.Town03 + diff, "Top");
        const pixelPosition = tileCoordToPixelCoord({ x: base.x, y: base.y }, TILE_WIDTH, TILE_HEIGHT);
        camera?.centerOn(pixelPosition?.x!, pixelPosition?.y!);
    }, [player])

    useEffect(() => {
        fetchAllLands("0x1")
        fetchAllBase("0x1")
    }, [])

    const fetchAllLands = async (map_id: string) => {
        const lands = await graphSdk.getAllLands({ map_id: map_id })
        console.log("fetchAllLands", lands);
        const edges = lands.data.entities?.edges
        const ls = new Map(mapLands)
        const landW = new Map(landWarriors);
        if (edges) {
            for (let index = 0; index < edges.length; index++) {
                const element = edges[index];
                if (element) {
                    const node = element.node
                    const componenets = node?.components
                    if (componenets) {
                        for (let index = 0; index < componenets.length; index++) {
                            const componenet = componenets[index];
                            if (componenet) {
                                if (componenet.__typename == "Land") {
                                    // const component = componenets[0] as Land
                                    const l = Land2Land(componenet)
                                    ls.set(l.x + "_" + l.y, l)
                                }
                                if (componenet.__typename == "Warrior") {
                                    landW.set(componenet.x + "_" + componenet.y, componenet.balance)
                                }
                            }
                        }
                    }
                }
            }
        }
        mapStore.setState({ lands: ls })
        warriorStore.setState({ landWarriors: landW })
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
        const newBases = new Map(bases);
        if (edges && edges.length > 0) {
            for (let index = 0; index < edges.length; index++) {
                const edge = edges[index];
                if (edge) {
                    const c = edge.node?.components
                    if (c && c[0] && c[0].__typename == "Base") {
                        const b = c[0] as Base
                        newBases.set(b.id, { x: b.x, y: b.y })
                    }
                }
            }
        }
        buildStore.setState({ bases: newBases })
    }

    useEffect(() => {
        landWarriors.forEach((balance, key) => {
            console.log("landWarriors", key, balance);
            const keys = key.split("_")
            const coord = { x: parseInt(keys[0]), y: parseInt(keys[1])}
            putTileAt(coord, TilesetSoldier.Soldier1, "Top2");
            putTileAt(coord, TilesetNum.Num1 + balance - 1, "Top3");
        })
    }, [landWarriors])

    useEffect(() => {
        mapLands.forEach((land, id) => {
            var tile = 1
            const buildLand = { x: land.x, y: land.y }
            switch (land.build) {
                case BuildType.Camp: tile = TilesetBuilding.Camp; break;
                case BuildType.GoldMine: tile = TilesetBuilding.GoldMine; break;
                case BuildType.IronMine: tile = TilesetBuilding.IronMine; break;
                case BuildType.Farmland: tile = TilesetBuilding.Farmland; break;
                // case BuildType.Base: tile = TilesetTown.Town00; break;
            }
            putTileAt(buildLand, tile, "Top");
            putTileAt(buildLand, TilesetZone.MyZone, "Occupy");
        })
    }, [mapLands])

    return (
        <>

        </>
    )
}