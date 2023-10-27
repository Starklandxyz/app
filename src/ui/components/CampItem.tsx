import { useMemo, useState } from "react";
import { Land } from "../../types/Land";
import { ClickWrapper } from "../clickWrapper";
import { ticStore } from "../../store/ticStore";
import { store } from "../../store/store";
import { parseTime, toastError, toastSuccess } from "../../utils";
import { updateStore } from "../../store/updateStore";
import { useComponentValue, useEntityQuery } from "../../../node_modules/@latticexyz/react";
import { getEntityIdFromKeys } from "../../dojo/parseEvent";
import LoadingButton from "./LoadingButton";

export default function CampItem(params: any) {
    // const land = params.land
    const { account, phaserLayer, camera } = store();
    const { timenow } = ticStore();
    const [land,setland] = useState(params.land)

    const {
        networkLayer: {
            systemCalls: { upgradeComplete },
            components: contractComponents,
        },
    } = phaserLayer!;

    const update_base = useComponentValue(contractComponents.UpgradeCost, getEntityIdFromKeys([1n, BigInt(land.x), BigInt(land.y)]))


    const updateBuild = () => {
        updateStore.setState({ updateLand: { x: land.x, y: land.y } })
    }

    const finishUpgrade = async () => {
        const result = await upgradeComplete(account!, 1, land.x, land.y)
        const nland = new Land()
        nland.build = land.build
        nland.level = land.level+1
        nland.map_id = land.map_id
        nland.x = land.x
        nland.y = land.y
        setland(nland)
        if (result && result.length > 0) {
            toastSuccess("Upgrade success")
        } else {
            toastError("Upgrade fail")
        }
    }

    const updateButton = useMemo(() => {
        // const update_cost = getComponentValue()
        if (update_base && !update_base.claimed) {
            if (timenow > update_base.end_time) {
                return <LoadingButton style={{ minHeight: 30 }} onClick={() => finishUpgrade()} initialText="Confirm Upgrade" loadingText="Confirm..." />
            } else {
                const total = update_base.end_time - update_base.start_time
                const used = timenow - update_base.start_time
                return <>{parseTime(used)}/{parseTime(total, false)} Updating...</>
            }
        }
        return <button style={{ minHeight: 30 }} onClick={() => updateBuild()}>Upgrade</button>
    }, [timenow, update_base])

    return (<ClickWrapper>
        <div style={{marginRight:10, border: "1px solid white", borderRadius: 15, padding: 5, marginBottom: 10, lineHeight: 1.5 }}>
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: 30 }}>{`(${land.x},${land.y})`}</div>
                <div>+{land.level * 10 + 20} Capacity</div>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: 20 }}>Lv : {land.level}</div>
                {updateButton}
            </div>
        </div>
    </ClickWrapper>)
}