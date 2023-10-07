import { useMemo } from "react";
import { Troop } from "../../types/Troop";
import { ClickWrapper } from "../clickWrapper";
import { getTimestamp, toastError, toastSuccess } from "../../utils";
import { ticStore } from "../../store/ticStore";
import { troopStore } from "../../store/troopStore";
import flag from "../../../public/assets/icons/flag.png";
import soldierIcon from "../../../public/assets/icons/soldier.png"
import { Coord } from "../../../node_modules/@latticexyz/utils/src/index";
import { store } from "../../store/store";

export default function TroopItem(params: any) {
    const { timenow } = ticStore()
    const { troops } = troopStore()
    const { account, phaserLayer, networkLayer } = store()

    const {
        systemCalls: { retreatTroop },
    } = networkLayer!

    const troop: Troop = params.troop
    const base: Coord = params.base
    const clickTroop = () => {

    }

    //todo
    const attackClick = () => {
        toastSuccess("Attack Success")
    }

    const enterLand = ()=>{

    }

    const retreat = async () => {
        console.log("retreat");
        if(!account){
            return
        }
        const result = await retreatTroop(account,1,troop.index)
        if(result&&result.length>0){
            toastSuccess("Retreat...")
        }else{
            toastError("Retreat fail")
        }
    }

    const getTime = useMemo(() => {
        const leftTime = troop.totalTime - (getTimestamp() - troop.startTime)
        if (leftTime <= 0) {
            return ""
        }
        var h = Math.floor(leftTime / 3600)
        var m = Math.floor((leftTime - 3600 * h) / 60)
        var s = leftTime - h * 3600 - m * 60
        var hstr = h + ""
        if (h < 10) {
            hstr = "0" + h
        }
        var mstr = m + ""
        if (m < 10) {
            mstr = "0" + m
        }
        var sstr = s + ""
        if (s < 10) {
            sstr = "0" + s
        }
        var result = hstr + ":" + mstr + ":" + sstr
        if (h == 0) {
            result = mstr + ":" + sstr;
        }
        return result
    }, [troop, timenow])

    const getFrom = useMemo(() => {
        if (!base) {
            return `(${troop.from.x},${troop.from.y})`
        }
        if (base.x == troop.from.x && base.y == troop.from.y) {
            return "Base"
        } else {
            return `(${troop.from.x},${troop.from.y})`
        }
    }, [troop])

    const getTo = useMemo(()=>{
        if (!base) {
            return `(${troop.to.x},${troop.to.y})`
        }
        if (base.x == troop.to.x && base.y == troop.to.y) {
            return "Base"
        } else {
            return `(${troop.to.x},${troop.to.y})`
        }
    },[troop])

    return (
        <ClickWrapper style={{ cursor: "pointer", marginBottom: 20 }}>
            <div style={{ display: "flex" }}>
                <div style={{ display: "flex", flex: 1 }}>
                    <img src={flag} width={25} />
                    <div style={{ marginTop: 4, marginLeft: 3 }}>Troop{troop.index}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <img style={{ marginLeft: 20 }} height={25} src={soldierIcon} />
                    <div style={{ marginTop: 4, marginLeft: 3 }}>x{troop.amount}</div>
                </div>
            </div>

            <div style={{display: "flex", alignItems:"center" }} onClick={() => clickTroop()}>
                <div style={{display: "flex", flex: 1 }}>
                    <span>{getFrom}</span>
                    <span> {" => "} </span>
                    <span>{getTo}</span>
                </div>

                <div style={{ color:"coral", display: "flex", justifyContent: "flex-end",alignItems: "center" }}>
                    <p style={{ marginLeft: 10 }}>{getTime}</p>
                    {
                        !troop.retreat ?
                            <span onClick={() => retreat()} style={{ cursor: "pointer", marginLeft: 10 }}>撤</span> : 
                            <>
                            {
                                ((troop.totalTime - (getTimestamp() - troop.startTime)) > 0) && <p style={{ marginLeft: 10 }}>撤...</p>
                            }
                            </>
                    }
                    {
                        ((troop.totalTime - (getTimestamp() - troop.startTime)) <= 0 && !troop.retreat) && <span onClick={() => attackClick()} style={{ cursor: "pointer", marginLeft: 10 }}>攻</span>
                    }
                    {
                        ((troop.totalTime - (getTimestamp() - troop.startTime)) <= 0) &&<span onClick={()=>{enterLand()}}>驻</span>
                    }
                </div>

            </div>
        </ClickWrapper>
    )
}