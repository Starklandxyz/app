import styled from "styled-components";
import { controlStore } from "../store/controlStore"
import { ClickWrapper } from "./clickWrapper"
import { useEffect, useMemo, useState } from "react";
import { useComponentValue } from "../../node_modules/@latticexyz/react";
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
import packicon from "../../public/assets/icons/pack1.png"
import packopenicon from "../../public/assets/icons/packopen.png"
import fightingicon from "../../public/assets/icons/fighting.png"
import { panelStore } from "../store/panelStore";
import LoadingButton from "./components/LoadingButton";

export default function MonsterResultPanel() {
    const [openInfo, setOpenInfo] = useState("")
    const { monsterResult } = panelStore();
    const { account, phaserLayer } = store();
    const {
        networkLayer: {
            systemCalls: { openPacks },
            world,
            components: sqlComponent,
        },
    } = phaserLayer!;

    const packBalance = useComponentValue(sqlComponent.LuckyPack, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]))

    const closeit = () => {
        panelStore.setState({ monsterResult: { show: false, status: undefined, pack: 0 } })
    }

    const openPack = async () => {
        if (!account) { return }
        const oldP = getComponentValue(sqlComponent.RewardPoint, getEntityIdFromKeys([1n, BigInt(account.address)]))
        let oldPoints = oldP ? oldP.balance : 0
        const result = await openPacks(account!, 1, monsterResult.pack)
        if (result && result.length > 0) {
            const newP = getComponentValue(sqlComponent.RewardPoint, getEntityIdFromKeys([1n, BigInt(account.address)]))
            let newPoints = newP ? newP.balance : 0
            // console.log("openPack newPoints", newPoints);
            const total = newPoints - oldPoints
            setOpenInfo(`Congratulations! Got ${total} Points.`)
            toastSuccess("Open success! Got " + total + " Points!")
        } else {
            toastError("Open failed")
        }
    }

    useEffect(() => {
        setOpenInfo("")
        if (monsterResult.show) {
            mouseStore.setState({ coord: { x: 0, y: 0 }, frozen: true })
        } else {
            mouseStore.setState({ frozen: false })
        }
    }, [monsterResult])

    return (<ClickWrapper>
        <Container>
            {
                monsterResult.show &&
                <>
                    {
                        monsterResult.status == "win" && <div style={{ width: 420, height: 300, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.8)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                            <p style={{ fontSize: 19, width: 420, textAlign: "center" }}>War Result</p>

                            <div style={{ width: 420, height: 250 }}>
                                <img src={packicon} style={{ marginLeft: 190, marginTop: 60, transform: "scale(3) translate(0px,0px)", imageRendering: "pixelated" }} />

                                <div style={{ textAlign: "center", marginTop: 50, width: 420 }}>Congratulations! You win! Got {monsterResult.pack} packs!</div>

                                <div style={{ textAlign: "center", marginTop: 20, width: 420, marginBottom: 20, backgroundColor: "" }}>{openInfo}</div>

                                {
                                    openInfo.length < 5 ? 
                                    <div style={{ display: "flex", marginLeft: 100 }}>
                                        <button onClick={() => closeit()} style={{ width: 80 }}>Open Later</button>
                                        <LoadingButton initialText="Open" loadingText="Open..." onClick={openPack} style={{ width: 60, marginLeft: 50 }}/>
                                    </div> : 
                                    <button style={{marginLeft:200}} onClick={() => closeit()}>Close</button>
                                }
                            </div>
                        </div>
                    }
                    {
                        monsterResult.status == "fail" && <div style={{ width: 420, height: 300, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.6)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                            <p style={{ fontSize: 19, width: 420, textAlign: "center" }}>War Result</p>

                            <div style={{ width: 420, height: 250 }}>
                                <img src={packopenicon} style={{ marginLeft: 190, marginTop: 60, transform: "scale(3) translate(0px,0px)", imageRendering: "pixelated" }} />
                                <div style={{ textAlign: "center", marginTop: 50, width: 420 }}>Unfortunately! You lose! Got 0 pack.</div>
                                <button onClick={() => closeit()} style={{ marginLeft: 180, marginTop: 30, width: 60 }}>OK</button>
                            </div>
                        </div>
                    }
                    {
                        monsterResult.status == "loading" && <div style={{ width: 420, height: 300, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.6)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
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