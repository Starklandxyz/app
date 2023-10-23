import styled from "styled-components";
import { ClickWrapper } from "./clickWrapper";
import { useEffect, useMemo, useState } from "react";
import { getTimestamp, parseTime, toastError, toastSuccess } from "../utils";
import { store } from "../store/store";
import { Account } from "starknet";
import { ticStore } from "../store/ticStore";
import { Has, defineSystem, getComponentValue } from "../../node_modules/@latticexyz/recs/src/index";
import { useComponentValue, useEntityQuery } from "../../node_modules/@latticexyz/react";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { handleSQLResult } from "../utils/handleutils";
import { Warrior } from "../types/Warrior";
import NesButton from "./components/NesButton";
import { BuildType } from "../types/Build";
import LoadingButton from "./components/LoadingButton";

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
    const landEntities = useEntityQuery([Has(components.Land)], {
        updateOnValueChange: true,
    });
    const myBase = useComponentValue(components.HBase, getEntityIdFromKeys([1n, BigInt(account ? account.address : "")]));
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

        const camps_x: Array<number> = []
        const camps_y: Array<number> = []
        let max = 60
        landEntities.map((entity) => {
            const value = getComponentValue(components.Land, entity);
            if (value && value.owner == account.address && value.building == BuildType.Camp) {
                camps_x.push(value.x)
                camps_y.push(value.y)
                max += 30 * value.level
            }
        });
        const userW = getComponentValue(components.UserWarrior, getEntityIdFromKeys([1n, BigInt(account.address)]))
        if (userW) {
            if (userW.balance + inputValue > max) {
                toastError("Exceed max warrior. Build Camp.")
                return
            }
        }

        const result = await trainWarrior(account, 1, inputValue, camps_x, camps_y)
        if (result && result.length > 0) {
            toastSuccess("Start training...")
        } else {
            toastError("Train failed")
        }
    }

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        console.log("inputChange",value);
        if(!value){return}
        try {
            console.log("inputChange",parseInt(value));
            if (parseInt(value) <= 0) {
                return
            }
            setInput(parseInt(value))
        } catch (error) {
            setInput(1)
        }
    }

    const calTotalTime = useMemo(() => {
        const total = warriorConfig.Train_Time * inputValue
        return parseTime(total)
    }, [inputValue, warriorConfig])

    const calConsume = useMemo(() => {
        var result = (inputValue * warriorConfig.Train_Food) / 1_000_000 + " Food , " + (inputValue * warriorConfig.Train_Gold) / 1_000_000 + " Gold"
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
            <div style={{ width: 220, height: 190, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                <p>Train Warrior</p>
                {
                    (training?.total != 0 && training?.total != training?.out) ?
                        <div>
                            <div style={{ fontSize: 14, border: "1px solid white", width: 210, height: 100, borderRadius: 15, padding: 5 }}>
                                <p>Claimed : {training?.out}/{training?.total}</p>
                                <p>Next : {getTrainTime}</p>
                                <p>Claimable : {claimable}</p>
                            </div>
                            <LoadingButton initialText="Claim Warrior" loadingText="Claim..." style={{ marginTop: 8, marginLeft: 60 }} onClick={claim}/>
                        </div>
                        :
                        <div>
                            <div style={{ fontSize: 14, border: "1px solid white", width: 210, height: 100, borderRadius: 15, padding: 5 }}>
                                <p>Consume : {calConsume}</p>
                                <p>Time : {calTotalTime}</p>
                                <div style={{ display: "flex" }}>
                                    <div style={{ marginTop: 5, marginRight: 10 }}>Train Amount </div>
                                    <input onChange={inputChange} style={{ height: 18, width: 60, marginRight: 10 }} value={inputValue} type="number" />
                                </div>
                            </div>
                            <LoadingButton initialText="Start Training" loadingText="Start..." style={{ marginTop: 8, marginLeft: 60 }} onClick={train}/>
                        </div>
                }
            </div>
            { import.meta.env.VITE_ADMIN_MODE === 'true' && <button onClick={() => adminclick()}>Admin</button> }
        </Container>
    </ClickWrapper>)
}

const Container = styled.div`
    position: absolute;
    bottom: 5%;
    left: 1%;
    color:white;
`;
