import styled from 'styled-components';
import { ClickWrapper } from './clickWrapper';
import { updateStore } from '../store/updateStore';
import { useEffect, useMemo } from 'react';
import closeicon from "../../public/assets//icons/closeicon.png"
import { useComponentValue } from '../../node_modules/@latticexyz/react';
import { store } from '../store/store';
import { getBuildName } from '../types/Build';
import { getEntityIdFromKeys } from '../dojo/parseEvent';
import NesButton from "../ui/components/NesButton";
import { parseTime, toastError, toastSuccess } from '../utils';
import { Upgrate_Time } from '../contractconfig'
import { ComponentValue, Has, defineSystem, getComponentValue, setComponent } from "../../node_modules/@latticexyz/recs/src/index";
import LoadingButton from './components/LoadingButton';

export default function UpgradePanel() {
    const { account, phaserLayer, camera } = store();

    const {
        networkLayer: {
            systemCalls: { upgradeBuild },
            components: contractComponents,
            network: { graphSdk },
        },
    } = phaserLayer!;
    const { updateLand } = updateStore()

    const land = useComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(updateLand ? updateLand.x : 0), BigInt(updateLand ? updateLand.y : 0)]))

    const buildPrice = useComponentValue(contractComponents.BuildPrice, getEntityIdFromKeys([1n, BigInt(land ? land.building : 0)]))

    const title = useMemo(() => {
        if (!land) {
            return ""
        }
        return getBuildName(land.building)
    }, [land])

    const level = useMemo(() => {
        if (!land) {
            return ""
        }
        return `LV${land.level} ==> LV${land.level + 1}`
    }, land)

    const consume = useMemo(() => {
        if (!buildPrice) {
            return ""
        }
        if (!land) {
            return ""
        }
        // land.level
        const pow = Math.pow(2, land.level)
        return <div style={{ display: "flex" }}>
            <div className="buildneedbox buildneedenough">{buildPrice ? pow * buildPrice.food / 1_000_000 : 0} Food</div>
            <div className="buildneedbox buildneedenough">{buildPrice ? pow * buildPrice.gold / 1_000_000 : 0} Gold</div>
            <div className="buildneedbox buildneedenough">{buildPrice ? pow * buildPrice.iron / 1_000_000 : 0} Iron</div>
        </div>

    }, [buildPrice, land, updateLand])

    const updateTime = useMemo(() => {
        if (!land) {
            return 0
        }
        const pow = Math.pow(2, land.level - 1) * Upgrate_Time
        return "Update Time : " + parseTime(pow,false)
    }, [land])

    const update = async () => {
        if (!buildPrice || !account) {
            return
        }
        const pow = Math.pow(2, land.level)
        console.log("update", buildPrice);

        // const food =  pow * buildPrice.food
        const entityIndex = getEntityIdFromKeys([1n, BigInt(account.address)])
        const gold = getComponentValue(contractComponents.Gold, entityIndex)
        const balance_gold = gold ? gold.balance : 0
        if (balance_gold < pow * buildPrice.gold) {
            toastError("Gold is not enough")
            return
        }

        const food = getComponentValue(contractComponents.Food, entityIndex)
        const balance_food = food ? food.balance : 0
        if (balance_food < pow * buildPrice.food) {
            toastError("Food is not enough")
            return
        }

        const iron = getComponentValue(contractComponents.Iron, entityIndex)
        const balance_iron = iron ? iron.balance : 0
        if (balance_iron < pow * buildPrice.iron) {
            toastError("Iron is not enough")
            return
        }

        const result = await upgradeBuild(account!, 1, updateLand?.x, updateLand?.y)
        if (result && result.length > 0) {
            toastSuccess("Start Upgrade...")
            updateStore.setState({ updateLand: undefined })
        } else {
            toastError("Upgrade failed")
        }
    }

    return (
        <ClickWrapper>
            {
                updateLand &&
                <Container>
                    <div style={{ width: 400, height: 210, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                        <div style={{ marginLeft: 140, fontSize: 20, marginTop: 10 }}>Upgrade {title}</div>
                        <img src={closeicon} style={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }} onClick={() => { updateStore.setState({ updateLand: undefined }) }} />
                        <div style={{ marginBottom: 15, marginTop: 15 }}>
                            Level : {level}
                        </div>
                        <div style={{ marginBottom: 15 }}>
                            Update Consume :
                        </div>
                        {consume}
                        <div style={{ marginTop: 10 }}>
                            {updateTime}
                        </div>
                        <LoadingButton initialText='Update' loadingText='Update...' style={{ marginTop: 10, marginLeft: 150 }} onClick={() => update()} />
                    </div>
                </Container>
            }
        </ClickWrapper>)
}


const Container = styled.div`
    display:flex;
    position: absolute;
    bottom: 12%;
    right: 25%;
    color:white;
`;
