import { useEffect, useState } from "react";
import { NetworkLayer } from "../dojo/createNetworkLayer";
import { store } from "../store/store";
import { usePhaserLayer } from "../hooks/usePhaserLayer";
import { mouseStore } from "../store/mouseStore";
import { controlStore } from "../store/controlStore";
import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "../../node_modules/@latticexyz/phaserx/src/index";
import { TILE_HEIGHT, TILE_WIDTH } from "./constants";

type Props = {
    networkLayer: NetworkLayer | null;
};

// TODO: this is where we need to set the burner account from local storage.

export const PhaserLayer = ({ networkLayer }: Props) => {
    const { phaserLayer, ref } = usePhaserLayer({ networkLayer });
    const { camera } = store()
    const { down } = mouseStore()
    const [lastEvent, setEvent] = useState<any>()
    const { coord: lastCoord, coords } = mouseStore()
    const { sendTroopCtr: sendTroop, buildLand, showTipButtons, tipButtonShow } = controlStore()

    const handleMouseMove = (e: any) => {
        if (!camera) {
            return
        }

        if (tipButtonShow.show) {
            return
        }

        if (sendTroop.show) {
            return
        }

        if (buildLand) {
            return
        }
        const ex = e.clientX
        const ey = e.clientY
        const x = (ex + camera.phaserCamera.worldView.x * 2) / 2;
        const y = (ey + camera.phaserCamera.worldView.y * 2) / 2;

        const coord = pixelCoordToTileCoord({ x, y }, TILE_WIDTH, TILE_HEIGHT)

        if (coord.x == lastCoord.x && coord.y == lastCoord.y) {

        } else {
            const q = coords.clone()
            if (q.size() >= 10) {
                q.dequeue()
            }
            q.enqueue(coord)
            mouseStore.setState({ coord: coord, coords: q })
        }
        if (down) {
            moveCamera(e)
        }
    };

    const moveCamera = (e: any) => {
        // console.log("moveCamera",e.clientX);
        if (lastEvent) {
            const diffX = e.clientX - lastEvent.clientX
            const diffY = e.clientY - lastEvent.clientY
            // console.log("moveCamera",diffX,diffY);
            const x = camera?.phaserCamera.scrollX! - diffX
            const y = camera?.phaserCamera.scrollY! - diffY
            camera?.phaserCamera.setScroll(x, y);
        }
        setEvent(e)
    }

    const handleMouseDown = (e: any) => {
        mouseStore.setState({ down: true })
    }

    const handleMouseUp = (e: any) => {
        setEvent(null)
        mouseStore.setState({ down: false })
    }

    const handleMouseLeave = () => {
        console.log("handleMouseLeave");
        // mouseStore.setState({ x: -10000, y: -10000 })
        // mouseStore.setState({ coord:{x:0,y:0} })
    };

    useEffect(() => {
        if (phaserLayer) {
            store.setState({ phaserLayer });

            console.log("Setting phaser layer");
        }
    }, [phaserLayer]);

    return (
        <div
            onPointerMove={handleMouseMove}
            onPointerLeave={handleMouseLeave}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
            ref={ref}
            style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
            }}
        />
    );
};