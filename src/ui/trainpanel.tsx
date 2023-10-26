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
import { BuildType } from "../types/Build";
import LoadingButton from "./components/LoadingButton";

import foodIcon from "../../public/assets/icons/food.png"
import ironIcon from "../../public/assets/icons/iron.png"
import goldIcon from "../../public/assets/icons/gold.png"
import soldierIcon from "../../public/assets/icons/soldier.png"

export default function TrainPanel() {
    const [inputValue, setInput] = useState(1)
    const { timenow } = ticStore()
    const { account, phaserLayer } = store()
    const [trainorbuy, setTrainorBuy] = useState(true)
    const [isTraining, setIsTraining] = useState(false)
    // const [training, setTraining] = useState<Training>(new Training())

    const {
        networkLayer: {
            systemCalls: { trainWarrior, buyWarrior, admin, takeWarrior },
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
        if (!inputValue) {
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

    const buy = async () => {
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
        const multi = 5
        if (getComponentValue(components.Gold, entityIndex)?.balance! < warriorConfig.Train_Gold * inputValue * multi) {
            toastError("Gold is not enough")
            return
        }
        if (getComponentValue(components.Food, entityIndex)?.balance! < warriorConfig.Train_Food * inputValue * multi) {
            toastError("Food is not enough")
            return
        }
        if (getComponentValue(components.Iron, entityIndex)?.balance! < warriorConfig.Train_Iron * inputValue * multi) {
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

        const result = await buyWarrior(account, 1, inputValue, camps_x, camps_y)
        if (result && result.length > 0) {
            toastSuccess("Buy success...")
        } else {
            toastError("Buy failed")
        }
    }

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        // console.log("inputChange", value);
        // if (!value) { return }
        try {
            console.log("inputChange", parseInt(value));
            if (parseInt(value) <= 0) {
                return
            }
            setInput(parseInt(value))
        } catch (error) {
            setInput(1)
        }
    }

    const calTotalTime = useMemo(() => {
        if (!trainorbuy) {
            return "0s"
        }
        const total = warriorConfig.Train_Time * (inputValue ? inputValue : 1)
        return parseTime(total)
    }, [inputValue, warriorConfig, trainorbuy])

    const calConsume = useMemo(() => {
        let multi = trainorbuy ? 1 : 5
        let food = multi * ((inputValue ? inputValue : 1) * warriorConfig.Train_Food) / 1_000_000;
        let gold = multi * ((inputValue ? inputValue : 1) * warriorConfig.Train_Gold) / 1_000_000;
        let iron = multi * ((inputValue ? inputValue : 1) * warriorConfig.Train_Iron) / 1_000_000;

        // var result = multi * ((inputValue ? inputValue : 1) * warriorConfig.Train_Food) / 1_000_000 + " Food , " + multi * ((inputValue ? inputValue : 1) * warriorConfig.Train_Gold) / 1_000_000 + " Gold" + " , " + multi * ((inputValue ? inputValue : 1) * warriorConfig.Train_Iron) / 1_000_000 + " Iron"
        return { food, gold, iron };
    }, [inputValue, warriorConfig, trainorbuy])

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

    useEffect(() => {
        console.log(`training changed...`)
        setIsTraining(training?.total != 0 && training?.total != training?.out)
    }, [training])

    return (<ClickWrapper>
        <Container>
            <div style={{ display: "flex" }} className="train-tab">
                <div onClick={() => setTrainorBuy(true)} style={trainorbuy ? { backgroundColor: "rgba(0, 0, 255, 0.5)" } : {}} className="trainselector left">Train</div>
                <div onClick={() => setTrainorBuy(isTraining || false)} style={!trainorbuy ? { backgroundColor: "rgba(0, 0, 255, 0.5)" } : {}} className={`trainselector right ${isTraining ? "disable" : ""}`}>Buy</div>
            </div>
            <div className="container-small" style={{ width: 240, height: 200, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "10px", borderRadius: "0px 0px 15px 15px", paddingTop: 1 }}>
                {
                    trainorbuy ?
                        <p>Train Warrior</p>
                        :
                        <p>Buy Warrior
                            <br />
                            <span style={{ fontSize: 12, color: "lightGray" }}>Pay 10x cost to immediately acquire warriors instead of training.</span>
                        </p>

                }

                {
                    (training?.total != 0 && training?.total != training?.out) ?
                        <div>
                            <div style={{ fontSize: 14, border: "1px solid white", height: 100, borderRadius: 15, padding: 5 }}>
                                <p>Claimed : {training?.out}/{training?.total}</p>
                                <p>Next : {getTrainTime}</p>
                                <p>Claimable : {claimable}</p>
                            </div>
                            <LoadingButton initialText="Claim Warrior" loadingText="Claim..." style={{ marginTop: 8, marginLeft: 60 }} onClick={claim} />
                        </div>
                        :
                        <div>
                            <div className="cost" style={{ fontSize: 14, border: "1px solid white", borderRadius: 15, padding: 5 }}>
                                <span></span>
                                <p style={{ marginTop: 4 }}>Cost :
                                    <img src={foodIcon} />
                                    <span>{calConsume["food"]}</span>
                                    <span>&nbsp;</span>
                                    <img src={goldIcon} />
                                    <span>{calConsume["gold"]}</span>
                                    <span>&nbsp;</span>
                                    <img src={ironIcon} />
                                    <span>{calConsume["iron"]}</span>
                                </p>
                                <p>Time : {calTotalTime}</p>
                                <div style={{ display: "flex" }}>
                                    <div style={{ marginTop: 5, marginRight: 10, marginLeft:4,marginBottom:10 }}>Warrior Amount </div>
                                    <input onChange={inputChange} style={{ height: 18, width: 60, marginRight: 10 }} value={inputValue} type="number" />
                                </div>
                            </div>

                            <div style={{ textAlign:"center", marginTop: 10 }}>
                                {
                                    !trainorbuy ? <LoadingButton style={{minWidth: 70}} initialText="Buy" loadingText="Buy..." onClick={buy} /> :
                                        <LoadingButton style={{minWidth: 70, marginTop:20}} initialText="Start Training" loadingText="Start..." onClick={train} />

                                }
                            </div>
                        </div>
                }
            </div>
            {import.meta.env.VITE_ADMIN_MODE === 'true' && <button onClick={() => adminclick()}>Admin</button>}
        </Container>
    </ClickWrapper>)
}

const Container = styled.div`
    position: absolute;
    bottom: 5%;
    left: 1%;
    color:white;
`;
