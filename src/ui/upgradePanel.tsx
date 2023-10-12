import styled from 'styled-components';
import { ClickWrapper } from './clickWrapper';
import { updateStore } from '../store/updateStore';
import { useEffect, useMemo } from 'react';
import closeicon from "../../public/assets//icons/closeicon.png"
import { useComponentValue } from '@dojoengine/react';
import { store } from '../store/store';
import { getBuildName } from '../types/Build';
import { getEntityIdFromKeys } from '../dojo/parseEvent';

export default function UpgradePanel() {
    const { account, phaserLayer, camera } = store();

    const {
        networkLayer: {
            systemCalls: { claimMining },
            components: contractComponents,
            network: { graphSdk },
        },
    } = phaserLayer!;
    const { updateLand } = updateStore()

    const land = useComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(updateLand ? updateLand.x : 0), BigInt(updateLand ? updateLand.y : 0)]))

    const buildPrice = useComponentValue(contractComponents.BuildPrice, getEntityIdFromKeys([1n, BigInt(land ? land.building : 0)]))

    const title = useMemo(()=>{
        if(!land){
            return ""
        }
        return getBuildName(land.building)
    },[land])

    const level = useMemo(()=>{
        if(!land){
            return ""
        }
        return `LV${land.level} ==> LV${land.level+1}`
    },land)

    const consume = useMemo(()=>{
        if(!buildPrice){
            return ""
        }

        return <div style={{ display: "flex" }}>
                    <div className="buildneedbox buildneedenough">{buildPrice ? buildPrice.food / 1_000_000 : 0} Food</div>
                    <div className="buildneedbox buildneedenough">{buildPrice ? buildPrice.gold / 1_000_000 : 0} Gold</div>
                    <div className="buildneedbox buildneedenough">{buildPrice ? buildPrice.iron / 1_000_000 : 0} Iron</div>
                </div>

    },[buildPrice])

    const updateTime = useMemo(()=>{
        
    },[])

    return (
        <ClickWrapper>
            {
                updateLand &&
                <Container>
                    <div style={{ width: 400, height: 210, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
                        <div style={{ marginLeft: 140, fontSize: 20, marginTop: 10 }}>Upgrade {title}</div>
                        <img src={closeicon} style={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }} onClick={() => { updateStore.setState({ updateLand: undefined }) }} />
                        <div>
                            Level : {level}
                        </div>
                        <div>
                            Consume :
                        </div>
                        {consume}
                        {}
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
