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
import packicon from "../../public/assets/icons/pack1.png"
import packopenicon from "../../public/assets/icons/packopen.png"
import { panelStore } from "../store/panelStore";

export default function LuckypackPanel() {
    const [inputvalue, setinput] = useState(1)
    const [openInfo, setOpenInfo] = useState("")
    const { showLuckyPack } = panelStore();
    const { account, phaserLayer } = store();
    const {
        networkLayer: {
            systemCalls: { openPacks },
            world,
            components: sqlComponent,
        },
    } = phaserLayer!;

    const packBalance = useComponentValue(sqlComponent.LuckyPack, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]))

    const getBalance = useMemo(() => {
        return packBalance ? packBalance.balance : 0
    }, [packBalance])

    const transferPack = async () => {
        toastInfo("Stay tuned")
    }


    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!account) {
            return 0
        }
        const value = event.target.value
        try {
            const packs = getComponentValue(sqlComponent.LuckyPack, getEntityIdFromKeys([1n, BigInt(account.address)]))
            let packAmount = packs ? packs.balance : 0
            if (parseInt(value) > packAmount) {
                return
            }
            if (parseInt(value) < 1) {
                return
            }
            setinput(parseInt(value))
        } catch (error) {

        }

    }

    const openPack = async () => {
        if (!account) { return }
        const packs = getComponentValue(sqlComponent.LuckyPack, getEntityIdFromKeys([1n, BigInt(account.address)]))
        let packAmount = packs ? packs.balance : 0
        if (packAmount == 0) {
            toastError("No Lucky pack")
            return
        }

        const oldP = getComponentValue(sqlComponent.RewardPoint, getEntityIdFromKeys([1n, BigInt(account.address)]))
        let oldPoints = oldP ? oldP.balance : 0
        // console.log("openPack oldPoints", oldPoints);

        const result = await openPacks(account!, 1, inputvalue)
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

    const max = () => {
        if (!account) { return }
        const packs = getComponentValue(sqlComponent.LuckyPack, getEntityIdFromKeys([1n, BigInt(account.address)]))
        let packAmount = packs ? packs.balance : 0
        setinput(packAmount)
    }

    useEffect(() => {
        setinput(0)
        setOpenInfo("")
        if (showLuckyPack) {
            mouseStore.setState({ coord: { x: 0, y: 0 }, frozen: true })
        } else {
            mouseStore.setState({ frozen: false })
        }
    }, [showLuckyPack])

    return (<div>
        {
            showLuckyPack && <ClickWrapper>
                <Container>
                    <div style={{ width: 520, height: 390, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.8)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                        <img src={closeicon} style={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }} onClick={() => { panelStore.setState({ showLuckyPack: false }) }} />
                        <p style={{ fontSize: 20, marginLeft: 200 }}>Lucky Packs</p>
                        <p>Total : {getBalance}</p>
                        <div style={{ backgroundColor: "", width: 510, height: 240 }}>
                            <img src={packicon} style={{ marginLeft: 250, marginTop: 100, transform: "scale(5) translate(0px,0px)", imageRendering: "pixelated", backgroundColor: "" }} />
                            <div style={{ textAlign: "center", marginTop: 50, width: 510 }}>{openInfo}</div>
                        </div>

                        <input style={{ width: 40, marginLeft: 200, marginRight: 5 }} type="number" value={inputvalue} onChange={inputChange} />
                        <span style={{ fontSize: 13, cursor: "pointer" }} onClick={() => max()}>max</span>
                        <button style={{ marginLeft: 10 }} onClick={() => openPack()}>Open Packs</button>
                        <button style={{ marginLeft: 50 }} onClick={() => transferPack()}>Transfer Packs</button>
                    </div>
                </Container>

            </ClickWrapper>
        }
    </div>)
}


const Container = styled.div`
    position: absolute;
    bottom: 30%;
    left: 30%;
    color:white;
`;