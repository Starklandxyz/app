import styled from 'styled-components';
import { ClickWrapper } from "../clickWrapper";
import { getTimestamp, hexToString, positionToCoorp, toastError, toastSuccess } from "../../utils";
import starklogo from "../../../public/starkneticon.png"
import foodIcon from "../../../public/assets/icons/food.png"
import ironIcon from "../../../public/assets/icons/iron.png"
import goldIcon from "../../../public/assets/icons/gold.png"
import soldierIcon from "../../../public/assets/icons/soldier.png"
import flagIcon from "../../public/assets/icons/flag.png"
import landIcon from "../../public/assets/icons/landicon.png"
import { store } from "../../store/store";
import { useEffect, useMemo, useRef } from "react";
import { ComponentValue, Has, defineSystem, getComponentEntities, getComponentValue, setComponent } from "../../../node_modules/@latticexyz/recs/src/index";
import { handleSQLResult } from "../../utils/handleutils";
import { getEntityIdFromKeys } from "../../dojo/parseEvent";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { BuildType } from "../../types/Build";
import { controlStore } from '../../store/controlStore';
import closeicon from "../../../public/assets//icons/closeicon.png"
import gifticon from "../../../public/assets//icons/gifticon.png"
import Task1 from './task1';
import Task2 from './task2';
import Task3 from './task3';
import Task4 from './task4';
import Task5 from './task5';
import Task6 from './task6';
import Task7 from './task7';
import Task8 from './task8';
import { AUTO } from 'phaser';
import { panelStore } from '../../store/panelStore';
import { mouseStore } from '../../store/mouseStore';

export default function AirdropPanel() {
    const { account, phaserLayer } = store();
    const {
        networkLayer: {
            components: sqlComponent,
            network: { graphSdk }
        }
    } = phaserLayer!

    // const userAirdrop = useComponentValue(sqlComponent.Airdrop,getEntityIdFromKeys([1n]))

    useEffect(() => {
        getAirdropConfig()
    }, [])

    const getAirdropConfig = async () => {
        const result = await graphSdk.getAirdropConfig({ map_id: "0x1" });
        console.log("getAirdropConfig", result);
        const edges = result.data.entities?.edges
        handleSQLResult(edges, sqlComponent)
    }

    useEffect(() => {
        getAirdrop()
    }, [account])

    const getAirdrop = async () => {
        if (!account) {
            return
        }
        const result = await graphSdk.getAirdropByKey({ map_id: "0x1", key: account.address });
        console.log("fetchAirdrop", result);
        const edges = result.data.entities?.edges
        handleSQLResult(edges, sqlComponent)
    }

    const { showTask } = panelStore();

    useEffect(()=>{
        if (showTask) {
            mouseStore.setState({ coord: { x: 0, y: 0 }, frozen: true })
        } else {
            mouseStore.setState({ frozen: false })
        }
    },[showTask])

    return (
        <ClickWrapper>
            {
                showTask &&
                <Container>
                    <div style={{ width: 640, height: 410, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                        <div style={{ marginLeft: 210, fontSize: 20, marginTop: 10 }}>Task & Airdrop</div>
                        <img src={closeicon} style={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }} onClick={() => { panelStore.setState({ showTask: false }) }} />

                        <table style={{ paddingLeft: 18, marginTop: 20 }}>
                            <tr style={{ color: "pink", fontSize: 18 }}>
                                <td style={{textAlign:'center', width:"30%%"}}>Task</td>
                                <td style={{textAlign:'center', width:"100%"}}>Reward</td>
                                <td></td>
                            </tr>
                        </table>
                        <div style={{ overflow: "auto", width: 600, maxHeight: 300, lineHeight: 1, padding: 10, borderRadius: 15, paddingTop: 1 }}>
                            <table cellPadding={13}>
                                <Task1/>
                                <Task2/>
                                <Task3/>
                                <Task4/>
                                <Task5/>
                                <Task6/>
                               <Task7/>
                               <Task8/>
                            </table>
                        </div>

                    </div>

                </Container>
            }
        </ClickWrapper>)
}


const Container = styled.div`
    position: absolute;
    top: 20%;
    left: 30%;
    color:white;
`;
