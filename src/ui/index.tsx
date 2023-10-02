import styled from "styled-components";
import { store } from "../store/store";
import { Wrapper } from "./wrapper";
import NamesUI from "./names";
import BuildingTip from "./buildingtip";
import Leaderboard from "./leaderboard";
import { VERSION } from "../config";
import Header from "./header";
import NotificationUI from "./NotificationUI";
import TroopsUI from "./troopsUI";

export default function UI() {
    const layers = store((state) => {
        return {
            networkLayer: state.networkLayer,
            phaserLayer: state.phaserLayer,
        };
    });

    if (!layers.networkLayer || !layers.phaserLayer) return <></>;

    return (
        <Wrapper>
            <NotificationUI/>
            <TopHeaderContainer>
                <Header/>
            </TopHeaderContainer>
            <NamesUI />
            <BuildingTip />
            <Leaderboard />
            <VersionContainer>
                <p>version:{VERSION}</p>
            </VersionContainer>
            <TroopsUI/>
        </Wrapper>
    );
};

const TopHeaderContainer = styled.div`
    position: absolute;
    top: 0px;
    left: 0%;
    color: white;
    width:100%;
    height:60px;
`;

const VersionContainer = styled.div`
    position: absolute;
    bottom: 0px;
    right: 10px;
    color: white;
`;