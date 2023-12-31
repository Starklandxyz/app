import { TileAnimationKey, TileAnimations, Tileset, TilesetBuilding, TilesetLevel, TilesetNum, TilesetSelect, TilesetSoldier, TilesetTown, TilesetZone } from "../../artTypes/world";
import { PhaserLayer } from "..";
import { MAP_HEIGHT, MAP_WIDTH } from "../constants";
import { store } from "../../store/store";
import { LandType, get_land_barbarians, get_land_level, get_land_type } from "../../types/Land";
import { loadingStore } from "../../store/loadingstore";

export function mapSystem(layer: PhaserLayer) {
    console.log("mapSystem");

    const {
        scenes: {
            Main: {
                camera,
                maps: {
                    Main: { putTileAt,putAnimationAt },
                },
            },
        },
    } = layer;
    const size = MAP_WIDTH

    store.setState({ camera: camera })
    loadingStore.setState({ progress: 1 })

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
                // const warrior = get_land_barbarians(1, x, y)
                const level = get_land_level(1, x, y)
                if (level == 1) {
                    putTileAt(coord, TilesetLevel.Level1, "Foreground");
                } else if (level == 2) {
                    putTileAt(coord, TilesetLevel.Level2, "Foreground");
                } else if (level == 3) {
                    const r = Math.random()
                    if (r < 0.5) {
                        putTileAt(coord, TilesetLevel.Level3, "Foreground");
                    } else {
                        putTileAt(coord, TilesetLevel.Level3_1, "Foreground");
                    }
                } else if (level == 4) {
                    putTileAt(coord, TilesetLevel.Level4, "Foreground");
                } else if (level == 5) {
                    // putTileAt(coord, TilesetLevel.Level5, "Foreground");
                    putAnimationAt(coord,TileAnimationKey.Level5,"Foreground")
                } else {
                    putTileAt(coord, TilesetLevel.Level6, "Foreground");
                    putAnimationAt(coord,TileAnimationKey.Level6,"Build")
                }
            }
            // const progress = (x * y) / (size * size) * 100
            // console.log("mapSystem",progress);
            // loadingStore.setState({ progress: progress })
        }
    }
    loadingStore.setState({ progress: 100 })
    console.log("mapSystem finish");

}