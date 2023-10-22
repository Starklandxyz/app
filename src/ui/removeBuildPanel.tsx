import { controlStore } from "../store/controlStore"
import { ClickWrapper } from "./clickWrapper"
import styled from "styled-components";
import closeicon from "../../public/assets//icons/closeicon.png"
import { toastError, toastSuccess } from "../utils";
import { store } from "../store/store";
import { useEffect, useMemo } from "react";
import { mouseStore } from "../store/mouseStore";
import { getBuildName } from "../types/Build";
import { ComponentValue, Has, defineSystem, getComponentValue, getComponentValueStrict, setComponent } from "../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../dojo/parseEvent";

export default function RemoveBuildPanel() {
    const { removeBuild } = controlStore()
    const { camera, phaserLayer, account } = store()

    const {
        scenes: {
            Main: {
                maps: {
                    Main: { putTileAt },
                },
            },
        },
        networkLayer: {
            systemCalls: { removeBuilding },
            components: contractComponents
        }
    } = phaserLayer!;

    const confirm = async () => {
        if (!removeBuild) { return }
        const result = await removeBuilding(account!, 1, removeBuild.x, removeBuild.y)
        if (result && result.length > 0) {
            toastSuccess("Remove success")
        } else {
            toastError("Remove fail")
        }
        controlStore.setState({removeBuild:undefined})
    }

    useEffect(() => {
        if (removeBuild) {
            mouseStore.setState({ coord: { x: 0, y: 0 }, frozen: true })
        } else {
            mouseStore.setState({ frozen: false })
        }
    }, [removeBuild])

    const getInfo = useMemo(() => {
        if (!removeBuild) { return <></> }
        const land = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(removeBuild.x), BigInt(removeBuild.y)]))
        if (!land) { return <></> }

        const cost = getComponentValue(contractComponents.LandCost, getEntityIdFromKeys([1n, BigInt(land.x), BigInt(land.y)]))
        if (!cost) {
            return <></>
        }
        const loss = 0.6
        return <div style={{ padding: 10 }}>
            <div>Position : {`(${removeBuild.x},${removeBuild.y})`}</div>
            <div style={{ marginTop: 15 }}>Building : {getBuildName(land.building)}</div>
            <div style={{ marginTop: 15 }}>Receive : {loss * cost.cost_food / 1_000_000} Food, {loss * cost.cost_gold / 1_000_000} Gold, {loss * cost.cost_iron / 1_000_000} Iron</div>
        </div>
    }, [removeBuild])

    return (<ClickWrapper>
        <Container>
            {
                removeBuild && <div style={{ width: 340, zIndex: 100, height: 230, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                    <div style={{ color: "pink", width: 340, textAlign: "center", fontSize: 20, padding: 10, paddingTop: 15 }}>Remove Build</div>
                    <img src={closeicon} style={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }} onClick={() => controlStore.setState({ removeBuild: undefined })} />
                    {
                        getInfo
                    }
                    <button style={{marginLeft:150,marginTop:40}} onClick={()=>confirm()}>Confirm</button>
                </div>
            }
        </Container>
    </ClickWrapper>)
}

const Container = styled.div`
    position: absolute;
    top:40%;
    left: 40%;
    color:white;
`;