import { useEffect, useMemo, useState } from "react";
import { ClickWrapper } from "./clickWrapper";
import styled from "styled-components";
import { troopStore } from "../store/troopStore";
import { store } from "../store/store";
import { Troop } from "../types/Troop";
import TroopItem from "./components/TroopItem";

export default function TroopPanel() {
    const { troops } = troopStore()
    const { account } = store()
    const [userTroop, setUserTroop] = useState<Array<Troop>>([])

    useEffect(() => {
        if (!account) {
            return
        }
        const pTroops: Array<Troop> = []
        troops.forEach((value, _) => {
            if (value.owner == account.address)
                pTroops.push(value)
        })
        setUserTroop(pTroops)
    }, [troops.values()])

    return (<ClickWrapper>
        <Container>
            {
                account &&
                <div style={{ width: 220, height: 460, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                    <p style={{ fontSize: 20, color: "pink" }}>Troops</p>
                    <div>
                        {userTroop.map((item, index) => (
                            <TroopItem index={index} troop={item} />
                        ))}
                    </div>
                </div>
            }

        </Container>
    </ClickWrapper>)
}

const Container = styled.div`
    position: absolute;
    top: 20%;
    right: 2%;
    color:white;
`;
