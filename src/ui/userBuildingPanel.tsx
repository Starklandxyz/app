import { ClickWrapper } from "./clickWrapper";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { troopStore } from "../store/troopStore";
import { store } from "../store/store";
import { Troop } from "../types/Troop";
import TroopItem from "./components/TroopItem";
import { playerStore } from "../store/playerStore";
import { buildStore } from "../store/buildstore";
import { Troop_Speed } from "../contractconfig";


export default function UserBuildingPanel() {
    return (
        <ClickWrapper>
            <Container>
                <div style={{ width: 220, height: 320, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                    <p>Buildings</p>
                    
                </div>
            </Container>
        </ClickWrapper>
    )
}


const Container = styled.div`
    position: absolute;
    top: 10%;
    left: 2%;
    color:white;
`;
