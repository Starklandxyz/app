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
                    // case BuildType.Base: setBase(land); break;
                    case BuildType.Farmland: addFarmland(land); break;
                    case BuildType.GoldMine: addGold(land); break;
                    case BuildType.IronMine: addIron(land); break;
                    case BuildType.Camp: addCamp(land); break;
                }
            }
        })
    }, [landEntities, account])

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

    const calClaimable = (lands:Land[])=>{
        const config = getComponentValue(contractComponents.MiningConfig, getEntityIdFromKeys([1n]))
        if (!config) {
            return 0
        }
        let total = 0
        lands.map(land => {
            const mining = getComponentValue(contractComponents.LandMining, getEntityIdFromKeys([1n, BigInt(land.x), BigInt(land.y)]))
            if (mining) {
                if (mining.start_time == 0) {
                    return
                } else {
                    const total_time = timenow - mining.start_time
                    const t = total_time * config.Food_Speed / 1_000_000
                    // console.log("foodClaimable", total);
                    total += t
                }
            }
            return
        })
        return total
    }

    const foodClaimable = useMemo(() => {
        return calClaimable(farmland).toFixed(2)
    }, [timenow])


    const ironClaimable = useMemo(() => {
        return calClaimable(ironMine).toFixed(2)
    }, [timenow])

    const calBaseClaimable = ()=>{
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
        return calClaimable([land])
    }

    const goldClaimable = useMemo(() => {
        const t1 =  calClaimable(goldmine)
        const t2 = calBaseClaimable()
        const t = t1 + t2
        return t.toFixed(2)
    }, [timenow])

    return (<div style={{ width: 210, height: 350, lineHeight: 0.3, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
        <div>
            <p>Base ({base?.x},{base?.y}) +100Gold/H</p>
            <div>
                LV {base ? base.level : "1"}
                <button>Upgrade</button>
            </div>

        </div>
        <div style={{ marginTop: 10, border: "1px solid yellow", borderRadius: 10, paddingLeft: 5 }}>
            <div style={{ display: "flex" }}>
                <p>Farmlands - </p>
                <p style={{ marginLeft: 5 }}>{farmland.length}</p>
                <p style={{ marginLeft: 10 }}>+100Food/H</p>
            </div>
            <div style={{ display: "flex" }}>
                <p>Camp - </p>
                <p style={{ marginLeft: 5 }}>{camp.length}</p>
                <p style={{ marginLeft: 10 }}>+100 Capacity</p>
            </div>
            <div style={{ display: "flex" }}>
                <p>GoldMine - </p>
                <p style={{ marginLeft: 5 }}>{goldmine.length}</p>
                <p style={{ marginLeft: 10 }}>+100Gold/H</p>
            </div>
            <div style={{ display: "flex" }}>
                <p>IronMine - </p>
                <p style={{ marginLeft: 5 }}>{ironMine.length}</p>
                <p style={{ marginLeft: 10 }}>+100Iron/H</p>
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