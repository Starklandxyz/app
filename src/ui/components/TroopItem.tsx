import { useMemo } from "react";
import { Troop } from "../../types/Troop";
import { ClickWrapper } from "../clickWrapper";
import { getTimestamp } from "../../utils";
import { ticStore } from "../../store/ticStore";
import { troopStore } from "../../store/troopStore";

export default function TroopItem(params: any) {
    const { timenow } = ticStore()
    const { troops } = troopStore()

    const troop: Troop = params.troop
    const clickTroop = () => {

    }

    const retreat = () => {
        const nt = new Map(troops)
        const t = new Troop(troop.owner, troop.to, troop.from, getTimestamp())
        t.id = troop.id
        t.amount = troop.amount
        t.totalTime = troop.totalTime
        const leftTime = troop.totalTime - (getTimestamp() - troop.startTime)
        if(leftTime<0){
            t.startTime = getTimestamp()
        }else{
            t.startTime = getTimestamp() - leftTime
        }

        t.retreat = true
        nt.set(t.id, t)
        troopStore.setState({ troops: nt })
    }

    const getTime = useMemo(() => {
        const leftTime = troop.totalTime - (getTimestamp() - troop.startTime)
        if (leftTime <= 0) {
            return "00:00"
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

    return (
        <ClickWrapper style={{ cursor: "pointer" }}>
            <div>Troop{params.index + 1} x{troop.amount}</div>
            <div style={{ display: "flex" }} onClick={() => clickTroop()}>
                <p>({troop.from.x},{troop.from.y})</p>
                <p>{"=>"}</p>
                <p>({troop.to.x},{troop.to.y})</p>
                <p style={{ marginLeft: 10 }}>{getTime}</p>
                {
                    !troop.retreat ?
                        <p onClick={() => retreat()} style={{ cursor: "pointer", marginLeft: 10 }}>撤</p> : <p style={{ marginLeft: 10 }}>Retreating...</p>
                }
                {
                    ((troop.totalTime - (getTimestamp() - troop.startTime)) <= 0 && !troop.retreat) && <p style={{ cursor: "pointer", marginLeft: 10 }}>攻</p>
                }
            </div>
        </ClickWrapper>
    )
}