import { Tileset, TilesetBuilding, TilesetNum, TilesetSelect, TilesetSoldier, TilesetTown, TilesetZone } from "../../artTypes/world";
import { PhaserLayer } from "..";
import { MAP_HEIGHT, MAP_WIDTH } from "../constants";
import { store } from "../../store/store";
import { playerStore } from "../../store/playerStore";

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
    const pWater = 0.02
    const pGoldMine = 0.01
    const pIronMine = 0.02

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const coord = { x, y };
            //add grass
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

            //add gold mine
            const r3 = Math.random();
            if (r3 < pGoldMine) {
                putTileAt(coord, Tileset.GoldRock, "Foreground");
            }

            //add iron mine
            const r4 = Math.random();
            if (r4 < pIronMine) {
                putTileAt(coord, Tileset.IronRock, "Foreground");
            }

            //add water area
            const r5 = Math.random();
            if (r5 < pWater) {
                putTileAt(coord, Tileset.Water, "Foreground");
            }
        }
    }

    const xStart = size / 2;
    const yStart = size / 2;
    putTileAt({ x: xStart, y: yStart }, TilesetTown.Town00, "Top");
    putTileAt({ x: xStart + 1, y: yStart }, TilesetTown.Town01, "Top");
    putTileAt({ x: xStart, y: yStart + 1 }, TilesetTown.Town02, "Top");
    putTileAt({ x: xStart + 1, y: yStart + 1 }, TilesetTown.Town03, "Top");

    putTileAt({ x: xStart, y: yStart + 1 }, TilesetSoldier.Soldier1, "Top2");
    putTileAt({ x: xStart, y: 1 + yStart }, TilesetNum.Num1 + 5, "Top3");


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