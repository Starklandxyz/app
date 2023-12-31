import styled from "styled-components";
import { store } from "../store/store";
import { Wrapper } from "./wrapper";
import BuildingTip from "./buildingtip";
import { VERSION } from "../config";
import Header from "./header";
import NotificationUI from "./NotificationUI";
import TroopsUI from "./troopsUI";
import SpawnUI from "./spawnui";
import BottomIcons from "./bottomicons";
import TroopPanel from "./troopPanel";
import ChooseBuildUI from "./ChooseBuildUI";
import MapUI from "./mapui";
import TrainPanel from "./trainpanel";
import ListenEvent from "./listenevent";
import SendTroopPanel from "./sendTroopPanel";
import UserBuildingPanel from "./buildings/userBuildingPanel";
import AirdropPanel from "./airdrop/airdropPanel";
import UpgradePanel from "./upgradePanel";
import Loading from "./Loading";
import LuckypackPanel from "./luckypackPanel";
import BottomPanels from "./bottompanels";
import FightResultPanel from "./fightResultPanel";
import MonsterResultPanel from "./monsterResultPanel";
import RemoveBuildPanel from "./removeBuildPanel";
import RankPanel from "./rankPanel";
import WorldChoosePanel from "./worldchoosePanel";
import LiveIndicator from "./components/LiveIndicator";

export default function UI() {
    const layers = store((state) => {
        return {
            phaserLayer: state.phaserLayer,
        };
    });

    if (!layers.phaserLayer) return <></>;

    return (
        <Wrapper>
            <NotificationUI/>
            <SpawnUI/>
            <TopHeaderContainer>
                <Header/>
            </TopHeaderContainer>
            <BottomIcons/>
            <BuildingTip />
            <LiveIndicator />
            <VersionContainer>
                <p>version:{VERSION}</p>
            </VersionContainer>
            <ChooseBuildUI/>
            <TroopsUI/>
            <TroopPanel/>
            <MapUI/>
            <TrainPanel/>
            <ListenEvent/>
            <SendTroopPanel />
            <UserBuildingPanel/>
            <AirdropPanel/>
            <UpgradePanel/>
            <LuckypackPanel/>
            <BottomPanels/>
            <FightResultPanel/>
            <MonsterResultPanel/>
            <RemoveBuildPanel/>
            <RankPanel/>
            <WorldChoosePanel/>
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