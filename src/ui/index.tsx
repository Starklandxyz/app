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
import SpawnUI from "./spawnui";
import Map from "./map";
import BottomIcons from "./bottomicons";
import TroopPanel from "./troopPanel";
import ChooseBuildUI from "./ChooseBuildUI";

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
            <SpawnUI/>
            <TopHeaderContainer>
                <Header/>
            </TopHeaderContainer>
            <NamesUI />
            <BottomIcons/>
            <BuildingTip />
            <Leaderboard />
            <VersionContainer>
                <p>version:{VERSION}</p>
            </VersionContainer>
            <ChooseBuildUI/>
            <TroopsUI/>
            <TroopPanel/>
            <Map/>
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