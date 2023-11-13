import styled from "styled-components";
import { tileCoordToPixelCoord } from "../../node_modules/@latticexyz/phaserx/src/index";
import { ClickWrapper } from "./clickWrapper";
import { store } from "../store/store";
import { TILE_HEIGHT, TILE_WIDTH } from "../phaser/constants";
import { positionToCoorp, toastError, toastInfo } from "../utils";
import twitter from "/twitterlogo.png"
import telegram from "/telegram.png"
import diskette from "/diskette.png"
import { useBurner } from "../hooks/burner";

export default function BottomIcons() {

    const { exportAccounts } = useBurner();

    const { account, phaserLayer } = store()
    const {
        scenes: {
            Main: { camera },
        },
        networkLayer
    } = phaserLayer!;

    const gotoTwitter = () => {
        window.open("https://twitter.com/starkland_xyz/")
    }

    const gotoTelegram = () => {
        // window.open("https://t.me/starkland")
        toastInfo("Stay turned")
    }

    return (
        <ClickWrapper style={{ display: "flex", flexDirection: "column" }}>
            <Container>
                <div>
                    <img style={{ cursor: "pointer", marginTop: 15, marginRight: 10 }} width={25} src={twitter} onClick={() => gotoTwitter()} />
                    <img style={{ cursor: "pointer", marginTop: 15,marginRight: 10 }} width={25} src={telegram} onClick={() => gotoTelegram()} />
                    <img style={{ cursor: "pointer", marginTop: 15,marginRight: 10 }} width={25} src={diskette} onClick={() => exportAccounts()} />
                    
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