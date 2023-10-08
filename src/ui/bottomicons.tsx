import styled from "styled-components";
import { tileCoordToPixelCoord } from "../../node_modules/@latticexyz/phaserx/src/index";
import { ClickWrapper } from "./clickWrapper";
import { store } from "../store/store";
import { TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
import { positionToCoorp, toastError } from "../utils";
import twitter from "/twitterlogo.png"
import telegram from "/telegram.png"
import { buildStore } from "../store/buildstore";

export default function BottomIcons() {
    const { account, phaserLayer } = store()
    const { bases } = buildStore()

    const {
        scenes: {
            Main: { camera },
        },
        networkLayer
    } = phaserLayer!;

    const center = () => {
        if (!account) {
            toastError("Create burner wallet first.")
            return
        }
        const base = bases.get(account.address)
        if (!base) {
            return
        }
        // const { x, y } = positionToCoorp(player_.position)
        const pixelPosition = tileCoordToPixelCoord(base, TILE_WIDTH, TILE_HEIGHT);
        camera.centerOn(pixelPosition?.x!, pixelPosition?.y!);
    }

    const gotoTwitter = () => {
        window.open("https://twitter.com/starklandxyz/")
    }

    const gotoTelegram = () => {
        window.open("https://t.me/starkland")
    }

    return (
        <ClickWrapper style={{ display: "flex", flexDirection: "column" }}>
            <Container>
                {
                    // (account && bases.has(account.address)) && <button onClick={() => center()}>Zoom to Base</button>
                }
                <div>
                    <img style={{ cursor: "pointer", marginTop: 15, marginRight: 10 }} width={25} src={twitter} onClick={() => gotoTwitter()} />
                    <img style={{ cursor: "pointer", marginTop: 15 }} width={25} src={telegram} onClick={() => gotoTelegram()} />
                </div>
            </Container>
        </ClickWrapper>)
}


const Container = styled.div`
    position: absolute;
    bottom: 50px;
    right: 20px;
    color: white;
`;