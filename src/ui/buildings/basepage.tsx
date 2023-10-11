import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { store } from "../../store/store";
import { getEntityIdFromKeys } from "../../dojo/parseEvent";
import { useEffect, useMemo, useState } from "react";
import { Land } from "../../types/Land";
import { Has, HasValue, getComponentValue, getComponentValueStrict } from "../../../node_modules/@latticexyz/recs/src/index";
import { BuildType } from "../../types/Build";
import { toastError, toastSuccess } from "../../utils";
import { ticStore } from "../../store/ticStore";
import { handleSQLResult } from "../../utils/handleutils";

export default function BasePage() {
    const { account, phaserLayer } = store()
    const { timenow } = ticStore()

    const {
        networkLayer: {
            systemCalls: { claimMining },
            components: contractComponents,
            network: {
                graphSdk
            }
        }
    } = phaserLayer!;

    // const [base, setBase] = useState<Land>()
    const base = useComponentValue(contractComponents.Base, getEntityIdFromKeys([1n, account ? BigInt(account.address) : 0n]))
    const miningConfig = useComponentValue(contractComponents.MiningConfig, getEntityIdFromKeys([1n]))

    const [baseland, setBaseland] = useState<Array<Land>>([])
    const [farmland, setFarmland] = useState<Array<Land>>([])
    const [ironMine, setIronmine] = useState<Array<Land>>([])
    const [goldmine, setGoldmine] = useState<Array<Land>>([])
    const [camp, setcamp] = useState<Array<Land>>([])

    const landEntities = useEntityQuery([Has(contractComponents.Land)], { updateOnValueChange: true })

    useEffect(() => {
        fetchMiningConfig()
    }, [])

    const fetchMiningConfig = async () => {
        const result = await graphSdk.getMiningConfig({ map_id: "0x1" })
        console.log("fetchMiningConfig", result);

        const edges = result.data.entities?.edges
        handleSQLResult(edges, contractComponents)
    }

    useEffect(() => {
        if (!account) {
            return
        }
        landEntities.map(entity => {
            const value = getComponentValue(contractComponents.Land, entity)
            // console.log("landEntities", value);
            if (value && value.owner == account.address) {
                const land = new Land()
                land.build = value.building
                land.level = value.level
                land.map_id = value.map_id
                land.owner = value.owner
                land.x = value.x
                land.y = value.y
                switch (value.building) {
                    case BuildType.Base: addBaseLand(land); break;
                    case BuildType.Farmland: addFarmland(land); break;
                    case BuildType.GoldMine: addGold(land); break;
                    case BuildType.IronMine: addIron(land); break;
                    case BuildType.Camp: addCamp(land); break;
                }
            }
        })
    }, [landEntities, account])

    const addBaseLand = (land:Land)=>{
        const a = [...baseland]
        a.push(land)
        setBaseland(a)
    }

    const addFarmland = async (land: Land) => {
        const a = [...farmland]
        a.push(land)
        setFarmland(a)
    }
    const addCamp = async (land: Land) => {
        const a = [...camp]
        a.push(land)
        setcamp(a)
    }
    const addGold = async (land: Land) => {
        const a = [...goldmine]
        a.push(land)
        setGoldmine(a)
    }
    const addIron = async (land: Land) => {
        const a = [...ironMine]
        a.push(land)
        setIronmine(a)
    }

    const claimAll = async () => {
        // const land = farmland[0]
        if(!account){
            toastError("Create account first")
            return
        }
        const xs:Array<number> = []
        const ys:Array<number> = []
        const base = getComponentValue(contractComponents.Base,getEntityIdFromKeys([1n,BigInt(account.address)]))
        if(!base){
            toastError("Create base first")
            return
        }
        xs.push(base.x)
        ys.push(base.y)

        farmland.map(land=>{
            xs.push(land.x)
            ys.push(land.y)
        })
        ironMine.map(land=>{
            xs.push(land.x)
            ys.push(land.y)
        })
        goldmine.map(land=>{
            xs.push(land.x)
            ys.push(land.y)
        })

        const result = await claimMining(account!, 1, xs, ys)
        if (result && result.length > 0) {
            toastSuccess("Claim success")
        } else {
            toastError("Claim failed")
        }
    }

    const calClaimable = (lands:Land[],speed:number)=>{
        // const config = getComponentValue(contractComponents.MiningConfig, getEntityIdFromKeys([1n]))
        // if (!miningConfig) {
        //     return 0
        // }
        let total = 0
        lands.map(land => {
            const mining = getComponentValue(contractComponents.LandMining, getEntityIdFromKeys([1n, BigInt(land.x), BigInt(land.y)]))
            if (mining) {
                if (mining.start_time == 0) {
                    return
                } else {
                    const total_time = timenow - mining.start_time
                    const t = total_time * speed / 1_000_000
                    // console.log("foodClaimable", total);
                    total += t
                }
            }
            return
        })
        return total
    }

    const foodClaimable = useMemo(() => {
        if (!miningConfig) {
            return 0
        }
        return calClaimable(farmland,miningConfig.Food_Speed).toFixed(2)
    }, [timenow])


    const ironClaimable = useMemo(() => {
        if (!miningConfig) {
            return 0
        }
        return calClaimable(ironMine,miningConfig.Iron_Speed).toFixed(2)
    }, [timenow])

    const calBaseClaimable = ()=>{
        if (!miningConfig) {
            return 0
        }
        if(!account){
            return 0 
        }
        const base = getComponentValue(contractComponents.Base,getEntityIdFromKeys([1n,BigInt(account.address)]))
        if(!base){
            return 0
        }
        const land = new Land()
        land.x = base.x
        land.y = base.y
        return calClaimable([land],miningConfig.Base_Gold_Speed)
    }

    const goldClaimable = useMemo(() => {
        if (!miningConfig) {
            return 0
        }
        const t1 =  calClaimable(goldmine,miningConfig.Gold_Speed)
        const t2 = calBaseClaimable()
        const t = t1 + t2
        return t.toFixed(2)
    }, [timenow])

    const getBaseLevel = useMemo(()=>{
        if(!base){
            return 1
        }
        let level = 1
        baseland.map(land=>{
            if(land.x == base.x && land.y==base.y){
                level = land.level
            }
        })
        return level
    },[base,baseland])

    const getFarmlandPerHour = useMemo(()=>{
        if(!miningConfig){
            return
        }
        const total = 3600 * miningConfig.Food_Speed * farmland.length / 1_000_000
        return total
    },[miningConfig,farmland])

    const getGoldMinePerHour = useMemo(()=>{
        if(!miningConfig){
            return
        }
        const total = 3600 * miningConfig.Gold_Speed * goldmine.length / 1_000_000
        return total
    },[miningConfig,goldmine])

    const getIronMinePerHour = useMemo(()=>{
        if(!miningConfig){
            return
        }
        const total = 3600 * miningConfig.Iron_Speed * ironMine.length / 1_000_000
        return total
    },[miningConfig,ironMine])

    const getBaseGoldPerHour = useMemo(()=>{
        if(!miningConfig){
            return
        }
        const total = 3600 * miningConfig.Base_Gold_Speed  / 1_000_000
        return total
    },[miningConfig,base])

    return (<div style={{ width: 210, height: 350, lineHeight: 0.3, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
        <div>
            <p>Base ({base?.x},{base?.y}) +{getBaseGoldPerHour}Gold/H</p>
            <div>
                LV {getBaseLevel}
                <button style={{marginLeft:100}}>Upgrade</button>
            </div>

        </div>
        <div style={{ marginTop: 10, border: "1px solid yellow", borderRadius: 10, paddingLeft: 5 }}>
            <div style={{ display: "flex" }}>
                <p>Farmlands - </p>
                <p style={{ marginLeft: 5 }}>{farmland.length}</p>
                <p style={{ marginLeft: 10 }}>+{getFarmlandPerHour}Food/H</p>
            </div>
            <div style={{ display: "flex" }}>
                <p>Camp - </p>
                <p style={{ marginLeft: 5 }}>{camp.length}</p>
                <p style={{ marginLeft: 10 }}>+100 Capacity</p>
            </div>
            <div style={{ display: "flex" }}>
                <p>GoldMine - </p>
                <p style={{ marginLeft: 5 }}>{goldmine.length}</p>
                <p style={{ marginLeft: 10 }}>+{getGoldMinePerHour}Gold/H</p>
            </div>
            <div style={{ display: "flex" }}>
                <p>IronMine - </p>
                <p style={{ marginLeft: 5 }}>{ironMine.length}</p>
                <p style={{ marginLeft: 10 }}>+{getIronMinePerHour}Iron/H</p>
            </div>
        </div>

        <div style={{ marginTop: 10, paddingLeft: 5, paddingTop: 2, border: "1px solid yellow", width: 200, height: 110, borderRadius: 10 }}>
            <div style={{ display: "flex" }}>
                <p>Claimable</p>
                <button onClick={() => claimAll()} style={{ marginLeft: 30, height: 26, marginTop: 5 }}>Claim All</button>
            </div>
            <table style={{ lineHeight: 1, }}>
                <tr>
                    <td>Food: {foodClaimable}</td>
                </tr>
                <tr>
                    <td>Gold: {goldClaimable}</td>
                </tr>
                <tr>
                    <td>Iron: {ironClaimable}</td>
                </tr>
            </table>
        </div>
    </div>)
}