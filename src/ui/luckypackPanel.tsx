import styled from "styled-components";
import { controlStore } from "../store/controlStore"
import { ClickWrapper } from "./clickWrapper"
import { useEffect, useMemo } from "react";
import { useComponentValue } from "@dojoengine/react";
import { store } from "../store/store";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { toastError, toastSuccess } from "../utils";
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

export default function LuckypackPanel() {
    const { showLuckyPack } = controlStore();
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

    const openPack = async () => {
        if (!account) { return }
        const oldP = getComponentValue(sqlComponent.RewardPoint, getEntityIdFromKeys([1n, BigInt(account.address)]))
        let oldPoints = oldP ? oldP.balance : 0
        // console.log("openPack oldPoints", oldPoints);

        const result = await openPacks(account!, 1, packBalance ? packBalance.balance : 0)
        if (result && result.length > 0) {
            const newP = getComponentValue(sqlComponent.RewardPoint, getEntityIdFromKeys([1n, BigInt(account.address)]))
            let newPoints = newP ? newP.balance : 0
            // console.log("openPack newPoints", newPoints);
            const total = newPoints - oldPoints
            toastSuccess("Open success! Got " + total + " Points!")
        } else {
            toastError("Open failed")
        }
    }

    useEffect(() => {
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
                    <div style={{ width: 520, height: 390, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                        <img src={closeicon} style={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }} onClick={() => { controlStore.setState({ showLuckyPack: false }) }} />
                        <p style={{ fontSize: 20, marginLeft: 200 }}>Lucky Packs</p>
                        <p>Balance : {getBalance}</p>
                        <button onClick={() => openPack()}>Open All Packs</button>
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