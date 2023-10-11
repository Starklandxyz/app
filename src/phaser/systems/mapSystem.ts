import { Tileset, TilesetBuilding, TilesetLevel, TilesetNum, TilesetSelect, TilesetSoldier, TilesetTown, TilesetZone } from "../../artTypes/world";
import { PhaserLayer } from "..";
import { MAP_HEIGHT, MAP_WIDTH } from "../constants";
import { store } from "../../store/store";
import { LandType, get_land_barbarians, get_land_type } from "../../types/Land";

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
    } = layer;
    const size = MAP_WIDTH

    store.setState({ camera: camera })
    // playerStore.setState({ PlayerComponent: components.Player })

    // const pRock = 0.015

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
                const warrior = get_land_barbarians(1, x, y)
                //add rock
                // const r2 = Math.random();
                if (warrior <= 20) {
                    putTileAt(coord, TilesetLevel.Level1, "Foreground");
                } else if (warrior <= 50) {
                    putTileAt(coord, TilesetLevel.Level2, "Foreground");
                } else if (warrior <= 100) {
                    const r = Math.random()
                    if(r<0.5){
                        putTileAt(coord, TilesetLevel.Level3, "Foreground");
                    }else{
                        putTileAt(coord, TilesetLevel.Level3_1, "Foreground");
                    }
                } else if (warrior <= 200) {
                    putTileAt(coord, TilesetLevel.Level4, "Foreground");
                } else if (warrior <= 400) {
                    putTileAt(coord, TilesetLevel.Level5, "Foreground");
                }
            }
        }
    }
}