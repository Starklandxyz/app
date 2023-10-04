import styled from "styled-components";
import { ClickWrapper } from "./clickWrapper";
import { useEffect, useMemo, useState } from "react";
import { mouseStore } from "../store/mouseStore";
import { store } from "../store/store";
import { pixelCoordToTileCoord } from "@latticexyz/phaserx";
import { TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
import { Tileset, TilesetTown } from "../artTypes/world";
import { Coord } from "@latticexyz/utils";
import { toastError, toastInfo, toastSuccess } from "../utils";
import { buildStore } from "../store/buildstore";
import { LandType, get_land_type } from "../types/Land";
import { playerStore } from "../store/playerStore";

export default function SpawnUI() {
    const { bases } = buildStore()
    const {player} = playerStore()
    const [show, setShow] = useState(false)
    const { x: ex, y: ey, down: mouseDown } = mouseStore()
    const { camera, phaserLayer, account, networkLayer } = store()
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

    const {
        systemCalls: { build_base },
    } = networkLayer!

    const baseClick = () => {
        if(!player){
            toastError("Mint your player first.")
            return
        }
        setShow(pre => !pre)
    }

    useEffect(() => {
        if (!account) {
            return
        }
        if (!show) {
            return
        }
        console.log("spawan mousedown", mouseDown);
        if (mouseDown) {
            return
        }
        clickLand()
    }, [mouseDown])

    const clickLand = async () => {
        if (!account) {
            return
        }
        for (let width = 0; width < 2; width++) {
            for (let height = 0; height < 2; height++) {
                const landType = get_land_type(1, lastCoord.x + width, lastCoord.y + height)
                if (landType != LandType.None) {
                    toastError("Can't build here")
                    // return
                }
            }
        }
        console.log("clickLand",lastCoord);
        
        const result = await build_base(account, 1, lastCoord.x, lastCoord.y)
        if (result && result.length > 0) {
            setShow(false)
            toastSuccess("Build Base Success!")
            const newBases = new Map(bases)
            newBases.set(account?.address!, lastCoord)
            buildStore.setState({ bases: newBases })
        } else {
            toastError("Build Fail")
        }
    }

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

    const showButton = useMemo(() => {
        if (!account) {
            return <></>
        }
        // console.log("showButton",account?.address,bases,bases.has(account.address));
        if (bases.has(account.address)) {
            return <></>
        }

        return <button onClick={() => baseClick()} style={{ width: 200, height: 40 }}>{!show ? "Build Base" : "Cancel"}</button>
    }, [account, bases, show])

    return (
        <ClickWrapper>
            <ButtonContainer>
                {
                    show && <p style={{ marginLeft: -60, fontSize: 22, color: 'LavenderBlush' }}>Choose a land to place your Base.</p>
                }
                {
                    showButton
                }
            </ButtonContainer>
        </ClickWrapper>)
}

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 50px;
    left: 45%;
`;