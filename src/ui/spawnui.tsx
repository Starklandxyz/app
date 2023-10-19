import styled from "styled-components";
import { ClickWrapper } from "./clickWrapper";
import { useEffect, useMemo, useState } from "react";
import { mouseStore } from "../store/mouseStore";
import { store } from "../store/store";
import { pixelCoordToTileCoord,tileCoordToPixelCoord } from "../../node_modules/@latticexyz/phaserx/src/index";
import { TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
import { Tileset, TilesetTown } from "../artTypes/world";
import { Coord } from "../../node_modules/@latticexyz/utils/src/index";
import { toastError, toastInfo, toastSuccess } from "../utils";
import { LandType, get_land_type } from "../types/Land";
import { useComponentValue } from "@dojoengine/react";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import NesButton from "./components/NesButton";
// import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "../../node_modules/@latticexyz/phaserx/src/index";

export default function SpawnUI() {
    // const {player} = playerStore()
    const [show, setShow] = useState(false)
    const {coord, down: mouseDown } = mouseStore()
    const { camera, phaserLayer, account } = store()
    const [lastCoord, setLastCoord] = useState<Coord>({ x: 0, y: 0 })
    const {
        networkLayer: {
            components,
            systemCalls: { build_base },
        },
        scenes: {
            Main: {
                maps: {
                    Main: { putTileAt },
                },
            },
        }
    } = phaserLayer!;

    const myBase = useComponentValue(components.Base, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));
    const player = useComponentValue(components.Player, getEntityIdFromKeys([BigInt(account ? account.address : "")]));

    const baseClick = () => {
        console.log("baseClick", player);

        if (!player) {
            toastError("Mint your player first.","top-center")
            return
        }
        setShow(true)
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
                    return
                }
            }
        }
        console.log("clickLand", lastCoord);
        setShow(false)
        toastInfo("Building Base...")
        const result = await build_base(account, 1, lastCoord.x, lastCoord.y)
        if (result && result.length > 0) {
            // setShow(false)
            toastSuccess("Build Base Success!")
        } else {
            toastError("Can't build here")
        }
    }

    useEffect(() => {
        if (!show) {
            return
        }
        if (!camera) {
            return
        }


        if (lastCoord.x == coord.x && lastCoord.y == coord.y) {
            return
        }
        {
            const xStart = lastCoord.x
            const yStart = lastCoord.y
            putTileAt({ x: xStart, y: yStart }, Tileset.Empty, "Build");
            putTileAt({ x: xStart + 1, y: yStart }, Tileset.Empty, "Build");
            putTileAt({ x: xStart, y: yStart + 1 }, Tileset.Empty, "Build");
            putTileAt({ x: xStart + 1, y: yStart + 1 }, Tileset.Empty, "Build");
        }

        const xStart = coord.x
        const yStart = coord.y
        const diff = 6
        putTileAt({ x: xStart, y: yStart }, TilesetTown.Town00+diff, "Build");
        putTileAt({ x: xStart + 1, y: yStart }, TilesetTown.Town01+diff, "Build");
        putTileAt({ x: xStart, y: yStart + 1 }, TilesetTown.Town02+diff, "Build");
        putTileAt({ x: xStart + 1, y: yStart + 1 }, TilesetTown.Town03+diff, "Build");


        setLastCoord(coord)

    }, [coord])

    const showButton = useMemo(() => {
        if (!account) {
            return <></>
        }
        if (myBase) {
            return <></>
        }

        return <button disabled={show} onClick={() => baseClick()} style={{ width: 200, height: 40 }}>{!show ? "Build Base" : "Building..."}</button>
    }, [account, myBase, show, player])

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