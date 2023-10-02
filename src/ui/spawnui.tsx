import styled from "styled-components";
import { ClickWrapper } from "./clickWrapper";
import { useEffect, useState } from "react";
import { mouseStore } from "../store/mouseStore";
import { store } from "../store/store";
import { pixelCoordToTileCoord } from "@latticexyz/phaserx";
import { TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
import { Tileset, TilesetTown } from "../artTypes/world";
import { Coord } from "@latticexyz/utils";
import { toastSuccess } from "../utils";
import { buildStore } from "../store/buildstore";

export default function SpawnUI() {
    const { bases } = buildStore()
    const [show, setShow] = useState(false)
    const { x: ex, y: ey, down: mouseDown } = mouseStore()
    const { camera, phaserLayer } = store()
    const [lastCoord, setLastCoord] = useState<Coord>({ x: 0, y: 0 })
    const {
        scenes: {
            Main: {
                maps: {
                    Main: { putTileAt },
                },
            },
        }
    } = phaserLayer!;

    const baseClick = () => {
        setShow(true)
    }

    useEffect(() => {
        if(!show){
            return
        }
        console.log("spawan mousedown",mouseDown);
        if (mouseDown) {
            return
        }
        setShow(false)
        toastSuccess("Build Base Success!")
        const newBases = new Map(bases)
        newBases.set("0x123", lastCoord)
        buildStore.setState({ bases: newBases })
    }, [mouseDown])

    useEffect(() => {
        if (!show) {
            return
        }
        if (!camera) {
            return
        }

        const x = (ex + camera.phaserCamera.worldView.x * 2) / 2;
        const y = (ey + camera.phaserCamera.worldView.y * 2) / 2;
        const coord = pixelCoordToTileCoord({ x, y }, TILE_WIDTH, TILE_HEIGHT)

        if (lastCoord.x == coord.x && lastCoord.y == coord.y) {
            return
        }
        {
            const xStart = lastCoord.x
            const yStart = lastCoord.y
            putTileAt({ x: xStart, y: yStart }, Tileset.Empty, "Top3");
            putTileAt({ x: xStart + 1, y: yStart }, Tileset.Empty, "Top3");
            putTileAt({ x: xStart, y: yStart + 1 }, Tileset.Empty, "Top3");
            putTileAt({ x: xStart + 1, y: yStart + 1 }, Tileset.Empty, "Top3");
        }


        const xStart = coord.x
        const yStart = coord.y
        putTileAt({ x: xStart, y: yStart }, TilesetTown.Town00, "Top3");
        putTileAt({ x: xStart + 1, y: yStart }, TilesetTown.Town01, "Top3");
        putTileAt({ x: xStart, y: yStart + 1 }, TilesetTown.Town02, "Top3");
        putTileAt({ x: xStart + 1, y: yStart + 1 }, TilesetTown.Town03, "Top3");
        setLastCoord(coord)

    }, [ex, ey])

    return (
        <ClickWrapper>
            <ButtonContainer>
                {
                    show && <p style={{ marginLeft: -60, fontSize: 22, color: 'LavenderBlush' }}>Choose a land to place your Base.</p>
                }
                {
                    (!bases.has("0x123")) && <button onClick={() => baseClick()} style={{ width: 200, height: 40 }}>{!show ? "Build Base" : "Cancle"}</button>
                }

            </ButtonContainer>
        </ClickWrapper>)
}


const ButtonContainer = styled.div`
    position: absolute;
    bottom: 50px;
    left: 45%;
`;