import styled from "styled-components";
import { ClickWrapper } from "./clickWrapper";
import { useEffect, useMemo, useState } from "react";
import { getTimestamp, parseTime, toastError, toastSuccess } from "../utils";
import { store } from "../store/store";
import { Account } from "starknet";
import { ticStore } from "../store/ticStore";
import { Has, defineSystem, getComponentValue } from "../../node_modules/@latticexyz/recs/src/index";
import { useComponentValue } from "@dojoengine/react";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { handleSQLResult } from "../utils/handleutils";
import { Warrior } from "../types/Warrior";
import NesButton from "./components/NesButton";

export default function TrainPanel() {
    const [inputValue, setInput] = useState(1)
    const { timenow } = ticStore()
    const { account, phaserLayer } = store()

    // const [training, setTraining] = useState<Training>(new Training())

    const {
        world,
        networkLayer: {
            systemCalls: { trainWarrior, admin, takeWarrior },
            components,
            network: { graphSdk }
        }
    } = phaserLayer!
    const myBase = useComponentValue(components.Base, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));
    const player = useComponentValue(components.Player, getEntityIdFromKeys([BigInt(account ? account.address : "")]));

    const training = useComponentValue(components.Training, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]))

    const warriorConfig = useComponentValue(components.WarriorConfig, getEntityIdFromKeys([1n]), new Warrior())

    useEffect(() => {
        if (!player || !account) {
            return
        }
        fetchTrainingInfo(account)
    }, [player, account])

    useEffect(() => {
        fetchTrainingConfig()
    }, [])

    const fetchTrainingConfig = async () => {
        const t = await graphSdk.getWarriorConfig({ map_id: "0x1" })
        console.log("fetchTrainingConfig", t);
        const edges = t.data.entities?.edges
        handleSQLResult(edges, components)
    }

    const fetchTrainingInfo = async (account: Account) => {
        const t = await graphSdk.getTrainingByKey({ map_id: "0x1", key: account.address })
        console.log("fetchTrainingInfo", t);
        const edges = t.data.entities?.edges
        handleSQLResult(edges, components)
    }

    const claim = async () => {
        if (!account) {
            return
        }
        const result = await takeWarrior(account, 1)
        if (result && result.length > 0) {
            toastSuccess("Claim success")
        } else {
            toastError("Claim failed")
        }
    }

    const train = async () => {
        if (!account) {
            toastError("Create Wallet First")
            return
        }
        if (!player) {
            toastError("Mint player first")
            return
        }
        if (!myBase) {
            toastError("Build a base first.")
            return
        }

        const entityIndex = getEntityIdFromKeys([1n, BigInt(account.address)])
        if (getComponentValue(components.Gold, entityIndex)?.balance! < warriorConfig.Train_Gold * inputValue) {
            toastError("Gold is not enough")
            return
        }
        if (getComponentValue(components.Food, entityIndex)?.balance! < warriorConfig.Train_Food * inputValue) {
            toastError("Food is not enough")
            return
        }
        if (getComponentValue(components.Iron, entityIndex)?.balance! < warriorConfig.Train_Iron * inputValue) {
            toastError("Iron is not enough")
            return
        }

        const result = await trainWarrior(account, 1, inputValue)
        if (result && result.length > 0) {
            toastSuccess("Start training...")
        } else {
            toastError("Train failed")
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

    const calTotalTime = useMemo(() => {
        const total = warriorConfig.Train_Time * inputValue
        return parseTime(total)
    }, [inputValue, warriorConfig])

    const calConsume = useMemo(() => {
        var result = (inputValue * warriorConfig.Train_Food) / 1_000_000 + " Food, " + (inputValue * warriorConfig.Train_Gold) / 1_000_000 + " Gold"
        return result
    }, [inputValue, warriorConfig])

    const calClaimable = (train: any) => {

        const usedtime = getTimestamp() - train.start_time
        var total = Math.floor(usedtime / warriorConfig.Train_Time)
        if (total > train.total) {
            total = train.total
        }
        const out = train.out
        var left = total - out
        if (left < 0) {
            left = 0
        }
        // console.log("calClaimable", total, out, left);
        return left
    }

    const getTrainTime = useMemo(() => {
        // console.log("base change",bases.get(account?.address!));
        if (!training) {
            return 0
        }
        const usedtime = timenow - training.start_time
        if (usedtime >= training.total * warriorConfig.Train_Time) {
            return "Finish"
        }
        const m = Math.floor((usedtime) % warriorConfig.Train_Time)
        return m + "/" + warriorConfig.Train_Time + "s"
    }, [timenow, warriorConfig])

    const claimable = useMemo(() => {
        if (!training) {
            return 0
        }
        return calClaimable(training)
    }, [training, timenow, warriorConfig])

    const adminclick = async () => {
        const result = await admin(account!, 1);
        if (result && result.length > 0) {
            toastSuccess("Success")
        } else {
            toastError("Fail")
        }
    }

    return (<ClickWrapper>
        <Container>
            <div style={{ width: 240, height: 190, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                <p>Train Warrior</p>
                {
                    (training?.total != 0 && training?.total != training?.out) ?
                        <div>
                            <div style={{ fontSize: 14, border: "1px solid white", width: 220, height: 100, borderRadius: 15, padding: 5 }}>
                                <p>Claimed : {training?.out}/{training?.total}</p>
                                <p>Next : {getTrainTime}</p>
                                <p>Claimable : {claimable}</p>
                            </div>
                            <button style={{ marginTop: 8, marginLeft: 60 }} onClick={() => claim()}>Claim Warrior</button>
                        </div>
                        :
                        <div>
                            <div style={{ fontSize: 14, border: "1px solid white", width: 220, height: 100, borderRadius: 15, padding: 5 }}>
                                <p>Consume : {calConsume}</p>
                                <p>Time : {calTotalTime}</p>
                                <div style={{ display: "flex" }}>
                                    <div style={{ marginTop: 5, marginRight: 10 }}>Train Amount </div>
                                    <input onChange={inputChange} style={{ height: 18, width: 60, marginRight: 10 }} value={inputValue} type="number" />
                                </div>
                            </div>
                            <NesButton style={{ marginTop: 8, marginLeft: 60 }} onClick={() => train()}>Start Training</NesButton>
                        </div>
                }
            </div>
            <button onClick={() => adminclick()}>Admin</button>
        </Container>
    </ClickWrapper>)
}

const Container = styled.div`
    position: absolute;
    bottom: 15%;
    left: 2%;
    color:white;
`;
