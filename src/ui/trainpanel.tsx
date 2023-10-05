import styled from "styled-components";
import { ClickWrapper } from "./clickWrapper";
import { useEffect, useMemo, useState } from "react";
import { parseTime, toastError } from "../utils";
import { buildStore } from "../store/buildstore";
import { playerStore } from "../store/playerStore";
import { store } from "../store/store";

export default function TrainPanel() {
    const [inputValue, setInput] = useState(1)

    const { bases } = buildStore()
    const { player } = playerStore()
    const { account, networkLayer } = store()

    const {
        systemCalls: { trainWarrior, airdrop },
    } = networkLayer!

    const claimairdrop = async () => {
        if (!account) {
            return
        }
        await airdrop(account,1)
    }

    const train = () => {
        if (!account) {
            toastError("Create Wallet First")
            return
        }
        if (!player) {
            toastError("Mint player first")
            return
        }
        if (!bases.has(account.address)) {
            toastError("Build a base first.")
            return
        }


    }

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        try {
            if (parseInt(value) <= 0) {
                return
            }
            setInput(parseInt(value))
        } catch (error) {

        }
    }

    useEffect(() => {

    }, [inputValue])

    const calTotalTime = useMemo(() => {
        const total = 60 * inputValue
        return parseTime(total)
    }, [inputValue])

    const calConsume = useMemo(() => {
        var result = (inputValue * 10) + " Food, " + (inputValue * 10) + " Gold"
        return result
    }, [inputValue])

    return (<ClickWrapper>
        <Container>
            <div style={{ width: 240, height: 190, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                <p>Train Warrior</p>
                <div style={{ fontSize: 14, border: "1px solid white", width: 220, height: 100, borderRadius: 15, padding: 5 }}>
                    <p>Consume : {calConsume}</p>
                    <p>Time : {calTotalTime}</p>
                    <div style={{ display: "flex" }}>
                        <div style={{ marginTop: 5, marginRight: 10 }}>Train Amount </div>
                        <input onChange={inputChange} style={{ height: 18, width: 60, marginRight: 10 }} value={inputValue} type="number" />
                    </div>
                </div>
                <button style={{ marginTop: 8, marginLeft: 60 }} onClick={() => train()}>Start Train</button>
            </div>
            <button onClick={(() => claimairdrop())}>Airdrop</button>
        </Container>
    </ClickWrapper>)
}



const Container = styled.div`
    position: absolute;
    bottom: 10%;
    left: 2%;
    color:white;
`;
