import styled from "styled-components";
import { playerStore } from "../store/playerStore";
import { store } from "../store/store";
import { useEffect, useState } from "react";
import { useDojo } from "../hooks/useDojo";
import { getTimestamp, random_on_chain, stringToHex, toastError, toastInfo, toastSuccess, toastWarning, truncateString } from "../utils";
import { ClickWrapper } from "./clickWrapper";
import { ethers } from "ethers";
import PlayerPanel from "./playerpanel";
import ethicon from "../../public/ethereum.png"
import starkicon from "../../public/starkneticon.png"
import { ticStore } from "../store/ticStore";
import { useComponentValue } from "@dojoengine/react";
import { ComponentValue, Has, defineSystem, getComponentValue, setComponent } from "../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../dojo/parseEvent";

export default function Header() {
    const { account, networkLayer } = store();
    // const { player, eth } = playerStore()
    const [nickName, setNickName] = useState("")

    const {
        account: {
            create,
            list,
            select,
            isDeploying
        }
    } = useDojo();

    const {
        world,
        components: contractComponents,
        network: { graphSdk },
        systemCalls: { spawn },
    } = networkLayer!

    const player = useComponentValue(contractComponents.Player, getEntityIdFromKeys([BigInt(account ? account.address : "")]));
    const eth = useComponentValue(contractComponents.ETH, getEntityIdFromKeys([BigInt(account ? account.address : "")]));

    useEffect(()=>{
        console.log("account change",account,player);
    },[account,player])

    useEffect(() => {
        defineSystem(world, [Has(contractComponents.Player)], ({ entity, value }) => {
            console.log("Player change", entity, value);
        })
    }, [])

    useEffect(() => {
        // 设置一个每秒执行的任务
        const intervalId = setInterval(() => {
            //   setCount(prevCount => prevCount + 1);
            ticStore.setState({ timenow: getTimestamp() })
        }, 1000);

        // 清除interval以防止内存泄漏
        return () => {
            clearInterval(intervalId);
        };
    }, []); // 注意这里的空依赖数组，这意味着useEffect只会在组件挂载时运行一次

    const startGame = async () => {
        if (isDeploying) {
            toastError("Waiting for creating wallet...")
            return
        }
        if (!account) {
            toastError("Create burner wallet first.")
            return
        }
        // await spawn(account)
        console.log("startGame name:" + nickName + ",length:" + nickName.length);

        if (nickName.length < 2) {
            toastWarning("Name is too short.")
            return
        }
        if (nickName.length > 30) {
            toastWarning("Name is too long.")
            return
        }
        const hex = stringToHex(nickName)
        console.log("startGame name hex", hex, hex.length);
        if (hex.length > 64) {
            toastWarning("Illegal name.")
            return
        }
        const events = await spawn(account, BigInt('0x' + hex));
        if (events && events.length > 0) {
            setNickName("")
            toastSuccess("Mint player success.")
            // playerStore.setState({ eth: BigInt(5e17) })
            // const p = Player2Player(events[0] as PlayerSQL)
            // playerStore.setState({ eth: BigInt(5e17), player: p })
        } else {
            toastError("Mint failed")
        }
    }

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setNickName(value);
    }

    const createNew = () => {
        toastInfo("Create account...")
        create()
    }

    const selectAccount = (e: any) => {
        // playerStore.setState({ player: null })
        select(e.target.value)
    }

    useEffect(() => {
        console.log("account change", account?.address);
        if (account) {
            toastSuccess("Load wallet success")
        }
    }, [account])

    useEffect(() => {
        console.log("isDeploying", isDeploying);
        // if (isDeploying) {
        //     playerStore.setState({ player: null })
        // }
    }, [isDeploying])

    return (
        <ClickWrapper>
            <HeaderUIContainer>
                <PlayerWrapper>
                    <PlayerPanel />
                </PlayerWrapper>

                <WalletContainer>

                    <ResourceItemWrapper data-tooltip-id="my-tooltip"
                        data-tooltip-content="ETH balance"
                        data-tooltip-place="top">
                        <ResourceIcon src={ethicon} alt="gold" />
                        <ResourceValue>{eth &&parseFloat(ethers.utils.formatEther(BigInt(eth.balance))).toFixed(6)}</ResourceValue>
                    </ResourceItemWrapper>

                    {
                        (account && !player) &&
                        <div style={{ display: "flex", flexDirection: "column", alignSelf: "center", marginRight: "6px" }}>
                            <input value={nickName} onChange={inputChange} style={{ fontWeight: "bold" }} placeholder="Enter your nickname" />
                            <button
                                style={{}}
                                onClick={() => {
                                    startGame();
                                }}
                            >
                                Create Player
                            </button>
                        </div>
                    }
                    <div style={{ display: "flex", padding: "6px 0px", gap: "8px" }}>
                        {
                            <select onChange={e => selectAccount(e)} value={account?.address}>
                                {list().map((account, index) => {
                                    return <option value={account.address} key={index}>{truncateString(account.address, 6, 6)}</option>
                                })}
                            </select>
                        }

                        {
                            player && <button data-tooltip-id="my-tooltip"
                                data-tooltip-content="create a new local wallet"
                                data-tooltip-place="top" style={{ marginLeft: 10 }} onClick={() => createNew()}>{isDeploying ? "deploying..." : "create new"}</button>
                        }
                        {
                            !account && <button data-tooltip-id="my-tooltip"
                                data-tooltip-content="create a local wallet"
                                data-tooltip-place="top" onClick={createNew}>{isDeploying ? "deploying wallet" : "create wallet"}</button>
                        }

                        <img data-tooltip-id="my-tooltip"
                            data-tooltip-content="Powered by Starknet and Dojo"
                            data-tooltip-place="top" src={starkicon} width={20} height={20} style={{ alignSelf: "center" }} />
                    </div>


                </WalletContainer>
            </HeaderUIContainer>
        </ClickWrapper>
    )
}

const HeaderUIContainer = styled.div`
    display:flex;
    padding: 6px 0px;
    gap: 8px;
    background-color: rgba(0, 0, 0, 0.7);

    @media (max-width: 480px) {
        flex-direction: column;
    }
`

const WalletContainer = styled.div`
    display:flex;
    justify-content: flex-end;
    flex: 1;
    color: white;

    @media (max-width: 480px) {
        justify-content: start;
    }
`;

const PlayerWrapper = styled.div`
    flex: 1;
`

// 定义资源项容器
const ResourceItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

// 定义资源图标
const ResourceIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 4px;
`;

// 定义资源数值
const ResourceValue = styled.span`
  font-size: 16px;
`;