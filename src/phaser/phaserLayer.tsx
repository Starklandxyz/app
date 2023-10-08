import { useEffect, useState } from "react";
import { NetworkLayer } from "../dojo/createNetworkLayer";
import { store } from "../store/store";
import { usePhaserLayer } from "../hooks/usePhaserLayer";
import { mouseStore } from "../store/mouseStore";

type Props = {
    networkLayer: NetworkLayer | null;
};

// TODO: this is where we need to set the burner account from local storage.

export const PhaserLayer = ({ networkLayer }: Props) => {
    const { phaserLayer, ref } = usePhaserLayer({ networkLayer });
    const {camera} = store()
    const {down} = mouseStore()
    const [lastEvent,setEvent] = useState<any>()

    const handleMouseMove = (e: any) => {
        mouseStore.setState({ x: e.clientX, y: e.clientY })
        if(down){
            moveCamera(e)
        }
    };

    const moveCamera = (e:any)=>{
        console.log("moveCamera",e.clientX);
        if(lastEvent){
            const diffX = e.clientX - lastEvent.clientX
            const diffY = e.clientY - lastEvent.clientY
            console.log("moveCamera",diffX,diffY);
            const x = camera?.phaserCamera.scrollX! + diffX
            const y = camera?.phaserCamera.scrollY! + diffY
            camera?.phaserCamera.setScroll(x,y);
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
        mouseStore.setState({ x: -10000, y: -10000 })
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