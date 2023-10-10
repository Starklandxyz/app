import styled from "styled-components";
import { ClickWrapper } from "./clickWrapper";
import { useEffect, useMemo, useState } from "react";
import { getTimestamp, parseTime, toastError, toastSuccess } from "../utils";
import { store } from "../store/store";
import { Train_Price_Food, Train_Price_Gold, Train_Price_Iron, Train_Time } from "../contractconfig";
import { Account } from "starknet";
import { Training } from "../types/Training";
import { ticStore } from "../store/ticStore";
import { Has, defineSystem, getComponentValue } from "../../node_modules/@latticexyz/recs/src/index";
import { useComponentValue } from "@dojoengine/react";
import { getEntityIdFromKeys } from "../dojo/parseEvent";

export default function TrainPanel() {
    const [inputValue, setInput] = useState(1)
    const { timenow } = ticStore()
    const { account, phaserLayer } = store()

    const [training, setTraining] = useState<Training>(new Training())

    const {
        world,
        networkLayer: {
            systemCalls: { trainWarrior, airdrop, takeWarrior },
            components,
            network: { graphSdk }
        }
    } = phaserLayer!
    const myBase = useComponentValue(components.Base, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));
    const player = useComponentValue(components.Player, getEntityIdFromKeys([BigInt(account ? account.address : "")]));
    const claimairdrop = async () => {
        if (!account) {
            return
        }
        await airdrop(account, 1)
    }

    useEffect(() => {
        if (!player || !account) {
            return
        }
        fetchTrainingInfo(account)
    }, [player, account])

    const fetchTrainingInfo = async (account: Account) => {
        const training = await graphSdk.getTrainingByKey({ map_id: "0x1", key: account.address })
        console.log("fetchTrainingInfo", training);
        const edges = training.data.entities?.edges
        if (edges) {
            for (let index = 0; index < edges.length; index++) {
                const element = edges[index];
                const components = element?.node?.components
                if (components) {
                    for (let index = 0; index < components.length; index++) {
                        const element = components[index];
                        if (element?.__typename == "Training") {
                            const t = new Training()
                            t.out = element.out;
                            t.startTime = element.start_time;
                            t.total = element.total
                            setTraining(t)
                        }
                    }
                }
            }
        }
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

        const entityIndex = getEntityIdFromKeys([1n,BigInt(account.address)])
        if (getComponentValue(components.Gold,entityIndex)?.balance!  < Train_Price_Gold * inputValue) {
            toastError("Gold is not enough")
            return
        }
        if (getComponentValue(components.Food,entityIndex)?.balance!  < Train_Price_Food * inputValue) {
            toastError("Food is not enough")
            return
        }
        if (getComponentValue(components.Iron,entityIndex)?.balance!  < Train_Price_Iron * inputValue) {
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
        const total = Train_Time * inputValue
        return parseTime(total)
    }, [inputValue])

    const calConsume = useMemo(() => {
        var result = (inputValue * Train_Price_Food) + " Food, " + (inputValue * Train_Price_Gold) + " Gold"
        return result
    }, [inputValue])

    const calClaimable = (train: Training) => {
        const usedtime = getTimestamp() - train.startTime
        var total = Math.floor(usedtime / Train_Time)
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
        const usedtime = timenow - training.startTime
        if (usedtime >= training.total * Train_Time) {
            return "Finish"
        }
        const m = Math.floor((usedtime) % Train_Time)
        return m + "/" + Train_Time + "s"
    }, [timenow])

    const claimable = useMemo(() => {
        return calClaimable(training)
    }, [training, timenow])


    useEffect(() => {
        defineSystem(world, [Has(components.Training)], ({ entity }) => {
            const training = getComponentValue(components.Training, entity);
            if (!training) {
                return
            }
            console.log("Training changed", training);
            const t = new Training()
            t.out = training.out
            t.startTime = training.start_time
            t.total = training.total
            setTraining(_ => t)
        })
    }, [])
    
    // useEffect(()=>{

    // },[bases.keys()])

    return (<ClickWrapper>
        <Container>
            <div style={{ width: 240, height: 190, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                <p>Train Warrior</p>
                {
                    (training.total != 0 && training.total != training.out) ?
                        <div>
                            <div style={{ fontSize: 14, border: "1px solid white", width: 220, height: 100, borderRadius: 15, padding: 5 }}>
                                <p>Claimed : {training.out}/{training.total}</p>
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
                            <button style={{ marginTop: 8, marginLeft: 60 }} onClick={() => train()}>Start Training</button>
                        </div>
                }
                <button style={{ marginTop: 20 }} onClick={(() => claimairdrop())}>Airdrop</button>
            </div>
        </Container>
    </ClickWrapper>)
}

const Container = styled.div`
    position: absolute;
    bottom: 15%;
    left: 2%;
    color:white;
`;
