import { useEffect } from "react"
import { buildStore } from "../store/buildstore"
import { store } from "../store/store";
import { TilesetTown } from "../artTypes/world";

export default function Map() {
    const { bases } = buildStore()
    const { camera, phaserLayer } = store()
    const {
        scenes: {
            Main: {
                maps: {
                    Main: { putTileAt },
                },
            },
        }
    } = phaserLayer!;

    useEffect(() => {
        console.log("map base change");
        
        bases.forEach((value, key) => {
            const xStart = value.x
            const yStart = value.y
            putTileAt({ x: xStart, y: yStart }, TilesetTown.Town00, "Top");
            putTileAt({ x: xStart + 1, y: yStart }, TilesetTown.Town01, "Top");
            putTileAt({ x: xStart, y: yStart + 1 }, TilesetTown.Town02, "Top");
            putTileAt({ x: xStart + 1, y: yStart + 1 }, TilesetTown.Town03, "Top");
        })
    }, [bases.values()])

    return (
        <>

        </>
    )
}