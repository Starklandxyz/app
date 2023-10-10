import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { store } from "../../store/store";
import { getEntityIdFromKeys } from "../../dojo/parseEvent";
import { useEffect, useState } from "react";
import { Land } from "../../types/Land";
import { Has, HasValue, getComponentValue, getComponentValueStrict } from "../../../node_modules/@latticexyz/recs/src/index";
import { BuildType } from "../../types/Build";

export default function BasePage() {
    const { account, phaserLayer } = store()

    const {
        networkLayer: {
            components: contractComponents
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
        if (!account) {
            return
        }
        landEntities.map(entity => {
            const value = getComponentValue(contractComponents.Land, entity)
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

    return (<div style={{ width: 210, height: 320, lineHeight: 0.3, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
        <div>
            <p>Base ({base?.x},{base?.y}) +100Gold/H</p>
            <div>
                LV {base ? base.level : "1"}
                <button>Upgrade</button>
            </div>

        </div>
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
        <div style={{ paddingLeft: 5,paddingTop:2, border: "1px solid yellow", width: 200, height: 90, borderRadius: 10 }}>
            <div style={{ display: "flex" }}>
                <p>Claimable</p>
                <button style={{marginLeft:30,height:26,marginTop:5}}>Claim</button>
            </div>
            <table style={{ lineHeight: 1, }}>
                <tr>
                    <td>Food : 10</td>
                    <td>Gold : 10</td>
                </tr>
                <tr>
                    <td>Iron : 10</td>
                    <td>Gold : 10</td>
                </tr>
            </table>

        </div>
    </div>)
}