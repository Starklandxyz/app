import { useEffect } from "react"
import { buildStore } from "../store/buildstore"
import { store } from "../store/store";
import { TilesetTown, TilesetZone } from "../artTypes/world";
import { playerStore } from "../store/playerStore";
import { Base } from "../generated/graphql";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";

export default function MapUI() {
    const { bases } = buildStore()
    const { account } = store()
    const { player } = playerStore()

    const { camera, phaserLayer } = store()
    const {
        scenes: {
            Main: {
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
            putTileAt({ x: xStart, y: yStart }, TilesetTown.Town00, "Top");
            putTileAt({ x: xStart + 1, y: yStart }, TilesetTown.Town01, "Top");
            putTileAt({ x: xStart, y: yStart + 1 }, TilesetTown.Town02, "Top");
            putTileAt({ x: xStart + 1, y: yStart + 1 }, TilesetTown.Town03, "Top");
        })
    }, [bases.values()])

    useEffect(() => {
        if (!player || !account) {
            return
        }
        fetchPlayerBase()
    }, [player])

    const fetchPlayerBase = async () => {
        const base = await graphSdk.getBaseByKey({ key: account?.address!, map_id: "0x1" })
        console.log("fetchPlayerBase", account?.address, base);
        const edges = base.data.entities?.edges;
        if (edges && edges.length > 0) {
            const pos = edges[0]?.node?.components
            if (pos && pos.length > 0 && pos[0]) {
                const p = pos[0] as Base
                const x = p.x;
                const y = p.y;
                const newBases = new Map(bases);
                newBases.set(account?.address!, {x,y})
                buildStore.setState({ bases: newBases })
                const pixelPosition = tileCoordToPixelCoord({x,y}, TILE_WIDTH, TILE_HEIGHT);
                camera?.centerOn(pixelPosition?.x!, pixelPosition?.y!);
            }
        }
    }

    return (
        <>

        </>
    )
}