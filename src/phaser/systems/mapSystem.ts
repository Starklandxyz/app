import { Tileset, TilesetBuilding, TilesetNum, TilesetSelect, TilesetSoldier, TilesetTown, TilesetZone } from "../../artTypes/world";
import { PhaserLayer } from "..";
import { MAP_HEIGHT, MAP_WIDTH } from "../constants";
import { store } from "../../store/store";
import { playerStore } from "../../store/playerStore";
import { random_on_chain } from "../../utils";
import { LandType, get_land_type } from "../../types/Land";

export function mapSystem(layer: PhaserLayer) {
    const {
        scenes: {
            Main: {
                camera,
                maps: {
                    Main: { putTileAt },
                },
            },
        },
        networkLayer: {
            components
        },
    } = layer;
    const size = MAP_WIDTH

    store.setState({ camera: camera })
    playerStore.setState({ PlayerComponent: components.Player })

    const pRock = 0.015
    // const pWater = 0.02
    // const pGoldMine = 0.01
    // const pIronMine = 0.02

    for (let y = 1; y <= size; y++) {
        for (let x = 1; x <= size; x++) {
            const landType = get_land_type(1, x, y)
            const coord = { x, y };

            if (landType == LandType.Gold) {
                putTileAt(coord, Tileset.GoldRock, "Foreground");
            }
            if (landType == LandType.Iron) {
                putTileAt(coord, Tileset.IronRock, "Foreground");
            }
            if (landType == LandType.Water) {
                putTileAt(coord, Tileset.Water, "Foreground");
            }
            if (landType == LandType.None) {
                // //add grass
                const r = Math.random()
                if (r < 0.3) {
                    putTileAt(coord, Tileset.Grass, "Background");
                } else {
                    putTileAt(coord, Tileset.Grass2, "Background");
                }

                //add rock
                const r2 = Math.random();
                if (r2 < pRock) {
                    putTileAt(coord, Tileset.Rock1, "Foreground");
                } else if (r2 < pRock * 2) {
                    putTileAt(coord, Tileset.Rock2, "Foreground");
                } else if (r2 < pRock * 3) {
                    putTileAt(coord, Tileset.Rock3, "Foreground");
                } else if (r2 < pRock * 4) {
                    putTileAt(coord, Tileset.Rock4, "Foreground");
                } else if (r2 < pRock * 5) {
                    putTileAt(coord, Tileset.Tree1, "Foreground");
                } else if (r2 < pRock * 6) {
                    putTileAt(coord, Tileset.Tree2, "Foreground");
                } else if (r2 < pRock * 7) {
                    putTileAt(coord, Tileset.Tree3, "Foreground");
                } else if (r2 < pRock * 8) {
                    putTileAt(coord, Tileset.Tree4, "Foreground");
                } else if (r2 < pRock * 9) {
                    putTileAt(coord, Tileset.Tree5, "Foreground");
                }
            }
        }
    }

    //add a test Enermy Base
    {
        const xStart = size / 2;
        const yStart = size / 2;
        const diff = 13
        putTileAt({ x: xStart + diff, y: yStart }, TilesetTown.Town10, "Top");
        putTileAt({ x: xStart + diff + 1, y: yStart }, TilesetTown.Town11, "Top");
        putTileAt({ x: xStart + diff, y: yStart + 1 }, TilesetTown.Town12, "Top");
        putTileAt({ x: xStart + diff + 1, y: yStart + 1 }, TilesetTown.Town13, "Top");

        putTileAt({ x: xStart + diff, y: yStart + 1 }, TilesetSoldier.Soldier1, "Top2");
        putTileAt({ x: xStart + diff, y: 1 + yStart }, TilesetNum.Num1 + 8, "Top3");


        putTileAt({ x: xStart + diff, y: 1 + yStart + 2 }, TilesetBuilding.Farmland, "Top");
        putTileAt({ x: xStart + diff, y: 1 + yStart + 2 }, TilesetZone.EnermyZone, "Occupy");
        putTileAt({ x: xStart + diff, y: yStart + 1 + 2 }, TilesetSoldier.Soldier1, "Top2");
        putTileAt({ x: xStart + diff, y: 1 + yStart + 2 }, TilesetNum.Num1 + 8, "Top3");

        putTileAt({ x: xStart + diff - 5, y: 1 + yStart + 2 }, TilesetZone.EnermyZone, "Occupy");

        putTileAt({ x: xStart + diff - 5, y: 1 + yStart }, TilesetBuilding.GoldMine, "Top");
        putTileAt({ x: xStart + diff - 5, y: 1 + yStart }, TilesetZone.EnermyZone, "Occupy");
        putTileAt({ x: xStart + diff - 5, y: yStart + 1 }, TilesetSoldier.Soldier1, "Top2");
        putTileAt({ x: xStart + diff - 5, y: 1 + yStart }, TilesetNum.Num1 + 8, "Top3");
    }
}