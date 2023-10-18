import styled from "styled-components";
import { controlStore } from "../store/controlStore"
import { ClickWrapper } from "./clickWrapper"
import { useEffect, useMemo, useState } from "react";
import { useComponentValue } from "@dojoengine/react";
import { store } from "../store/store";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { toastError, toastInfo, toastSuccess } from "../utils";
import closeicon from "../../public/assets//icons/closeicon.png"
import { mouseStore } from "../store/mouseStore";
import {
    ComponentValue,
    Has,
    defineSystem,
    getComponentEntities,
    getComponentValue,
    setComponent,
} from "../../node_modules/@latticexyz/recs/src/index";
import fightwinicon from "../../public/assets/icons/fightwin.png"
import fightfailicon from "../../public/assets/icons/fightfail.png"
import fightingicon from "../../public/assets/icons/fighting.png"

export default function FightResultPanel() {
    const [inputvalue, setinput] = useState(1)
    const [openInfo, setOpenInfo] = useState("")
    const { fightResult } = controlStore();
    const { account, phaserLayer } = store();
    const {
        networkLayer: {
            systemCalls: { openPacks },
            world,
            components: sqlComponent,
        },
    } = phaserLayer!;

    const packBalance = useComponentValue(sqlComponent.LuckyPack, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]))

    const closeit = ()=>{
        controlStore.setState({fightResult:{show:false,status:undefined}})
    }

    return (<ClickWrapper>
        <Container>
            {
                fightResult.show &&
                <>
                    {
                        fightResult.status == "win" && <div style={{ width: 420, height: 300, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.6)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                            <p style={{ fontSize: 19, width: 420, textAlign: "center" }}>War Result</p>

                            <div style={{ width: 420, height: 250 }}>
                                <img src={fightwinicon} style={{ marginLeft: 190, marginTop: 60, transform: "scale(3) translate(0px,0px)", imageRendering: "pixelated" }} />
                                <div style={{ textAlign: "center", marginTop: 50, width: 420 }}>Congratulations! You win! </div>
                                <button onClick={()=>closeit()} style={{ marginLeft: 180, marginTop: 30, width: 60 }}>OK</button>
                            </div>
                        </div>
                    }
                    {
                        fightResult.status == "lose" && <div style={{ width: 420, height: 300, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.6)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                            <p style={{ fontSize: 19, width: 420, textAlign: "center" }}>War Result</p>

                            <div style={{ width: 420, height: 250 }}>
                                <img src={fightfailicon} style={{ marginLeft: 190, marginTop: 60, transform: "scale(3) translate(0px,0px)", imageRendering: "pixelated" }} />
                                <div style={{ textAlign: "center", marginTop: 50, width: 420 }}>Unfortunately! You lose!</div>
                                <button onClick={()=>closeit()} style={{ marginLeft: 180, marginTop: 30, width: 60 }}>OK</button>
                            </div>
                        </div>
                    }
                    {
                        fightResult.status == "loading" && <div style={{ width: 420, height: 300, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.6)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                            <p style={{ fontSize: 19, width: 420, textAlign: "center" }}>War Result</p>

                            <div style={{ width: 420, height: 250 }}>
                                <img src={fightingicon} style={{ marginLeft: 190, marginTop: 60, transform: "scale(3) translate(0px,0px)", imageRendering: "pixelated" }} />
                                <div style={{ textAlign: "center", marginTop: 50, width: 420 }}>Fighting...</div>
                                {/* <button style={{ marginLeft: 180, marginTop: 30, width: 60 }}>OK</button> */}
                            </div>
                        </div>
                    }
                </>
            }
        </Container>
    </ClickWrapper>)
}


const Container = styled.div`
    position: absolute;
    bottom: 30%;
    left: 30%;
    color:white;
`;