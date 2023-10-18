import { ClickWrapper } from "../clickWrapper";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { store } from "../../store/store";
import { BuildType } from "../../types/Build";
import { Land } from "../../types/Land";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { Has, HasValue, getComponentValue, getComponentValueStrict } from "../../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../../dojo/parseEvent";
import upicon from "../../../public/assets/icons/upicon.png"
import downicon from "../../../public/assets/icons/downicon.png"
import baseicon from "../../../public/assets/icons/Castle.png"
import farmlandicon from "../../../public/assets/icons/farmland.png"
import ironmineicon from "../../../public/assets/icons/ironmine.png"
import goldmineicon from "../../../public/assets/icons/goldmine.png"
import campicon from "../../../public/assets/icons/camp.png"
import BasePage from "./homebuildingpage";
import FarmlandPage from "./farmlandpage";
import CampPage from "./camppage";
import GoldMinePage from "./goldminepage";
import IronMinePage from "./ironminepage";
import { handleSQLResult } from "../../utils/handleutils";

export default function UserBuildingPanel() {
    const [showBase, setShowBase] = useState(true)
    const [showFarm, setShowFarm] = useState(false)
    const [showCamp, setShowCamp] = useState(false)
    const [showGold, setShowGold] = useState(false)
    const [showIron, setShowIron] = useState(false)
    const [hideAll, setHide] = useState(false)

    const { account, phaserLayer } = store()

    // const [training, setTraining] = useState<Training>(new Training())

    const {
        world,
        networkLayer: {
            components,
            network: { graphSdk }
        }
    } = phaserLayer!
    useEffect(() => {
        if (showBase) {
            setShowFarm(false)
            setShowCamp(false)
            setShowIron(false)
            setShowGold(false)
        }
    }, [showBase])

    useEffect(() => {
        if (showFarm) {
            setShowBase(false)
            setShowCamp(false)
            setShowIron(false)
            setShowGold(false)
        }
    }, [showFarm])

    useEffect(() => {
        if (showCamp) {
            setShowBase(false)
            setShowFarm(false)
            setShowIron(false)
            setShowGold(false)
        }
    }, [showCamp])

    useEffect(() => {
        if (showGold) {
            setShowBase(false)
            setShowCamp(false)
            setShowIron(false)
            setShowFarm(false)
        }
    }, [showGold])

    useEffect(() => {
        if (showIron) {
            setShowBase(false)
            setShowCamp(false)
            setShowFarm(false)
            setShowGold(false)
        }
    }, [showIron])


    useEffect(() => {
        fetchBuildPrice()
    }, [])

    const fetchBuildPrice = async () => {
        const prices = await graphSdk.getBuildPrice({ map_id: "0x1" })
        console.log("fetchBuildPrice", prices);
        const edges = prices.data.entities?.edges
        handleSQLResult(edges, components)
    }

    const hide = () => {
        setHide(pre => !pre)
    }

    return (
        <ClickWrapper>
            <Container>
                {
                    !hideAll &&
                    <>
                        {
                            showBase && <BasePage />
                        }
                        {
                            showFarm && <FarmlandPage />
                        }
                        {
                            showCamp && <CampPage />
                        }
                        {
                            showGold && <GoldMinePage />
                        }
                        {
                            showIron && <IronMinePage />
                        }
                    </>
                }

                <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", width: 50, borderRadius: 10, }}>
                    <img data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hide | Show"
                        data-tooltip-place="top" src={hideAll ? downicon : upicon} onClick={() => hide()} style={{ cursor: "pointer", transform: "rotate(90deg)",marginLeft:15,marginBottom:15 }} />
                    <div data-tooltip-id="my-tooltip"
                        data-tooltip-content="All Buildings"
                        data-tooltip-place="top" className={showBase ? "build_icon build_icon_select" : "build_icon"} onClick={() => setShowBase(true)}>
                        <img src={baseicon} style={{ transform: "scale(0.6) translate(-10px,-2px)", imageRendering: "pixelated" }} />
                    </div>
                    <div data-tooltip-id="my-tooltip"
                        data-tooltip-content="All Farmlands"
                        data-tooltip-place="top" className={showFarm ? "build_icon build_icon_select" : "build_icon"} onClick={() => setShowFarm(true)}>
                        <img src={farmlandicon} style={{ transform: "scale(1.2) translate(8px,12px)", imageRendering: "pixelated" }} />
                    </div>
                    <div data-tooltip-id="my-tooltip"
                        data-tooltip-content="All Gold Mines"
                        data-tooltip-place="top" className={showGold ? "build_icon build_icon_select" : "build_icon"} onClick={() => setShowGold(true)}>
                        <img src={goldmineicon} style={{ transform: "scale(1.2) translate(8px,12px)", imageRendering: "pixelated" }} />
                    </div>
                    <div data-tooltip-id="my-tooltip"
                        data-tooltip-content="All Iron Mines"
                        data-tooltip-place="top" className={showIron ? "build_icon build_icon_select" : "build_icon"} onClick={() => setShowIron(true)}>
                        <img src={ironmineicon} style={{ transform: "scale(1.2) translate(8px,12px)", imageRendering: "pixelated" }} />
                    </div>
                    <div data-tooltip-id="my-tooltip"
                        data-tooltip-content="All Camps"
                        data-tooltip-place="top" className={showCamp ? "build_icon build_icon_select" : "build_icon"} onClick={() => setShowCamp(true)}>
                        <img src={campicon} style={{ transform: "scale(1.2) translate(8px,12px)", imageRendering: "pixelated" }} />
                    </div>
                </div>
            </Container>
        </ClickWrapper>
    )
}


const Container = styled.div`
    display:flex;
    position: absolute;
    top: 15%;
    right: 1%;
    color:white;
`;
