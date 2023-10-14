import { useEffect, useMemo, useState } from "react";
import { Troop } from "../../types/Troop";
import { ClickWrapper } from "../clickWrapper";
import { getTimestamp, toastError, toastSuccess } from "../../utils";
import { ticStore } from "../../store/ticStore";
import flag from "../../../public/assets/icons/flag.png";
import soldierIcon from "../../../public/assets/icons/soldier.png"
import { Coord } from "../../../node_modules/@latticexyz/utils/src/index";
import { store } from "../../store/store";
import { Has, getComponentValue, getComponentValueStrict } from "../../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../../dojo/parseEvent";
import { BuildType } from "../../types/Build";
import { pixelCoordToTileCoord, tileCoordToPixelCoord } from "../../../node_modules/@latticexyz/phaserx/src/index";
import { TILE_HEIGHT, TILE_WIDTH } from "../../phaser/constants";
import { mouseStore } from "../../store/mouseStore";
import { Troop_Speed } from "../../contractconfig";
import { controlStore } from "../../store/controlStore";

export default function TroopItem(params: any) {
    const { timenow } = ticStore()
    const { account, phaserLayer, camera } = store()
    const { coord: lastCoord } = mouseStore()
    // const [lastOwner,setLastOwner] = useState<string|undefined>()
    const {
        networkLayer: {
            components: contractComponents,
            systemCalls: { retreatTroop, troopEnterLand, goFight },
        }
    } = phaserLayer!

    const troop: Troop = params.troop
    const base: Coord = params.base

    const attackClick = async () => {
        if (!account) { return }

        const attackLand = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(troop.to.x), BigInt(troop.to.y)]))
        let lastOwner = ""
        if (attackLand) {
            lastOwner = (attackLand.owner)
        }

        const result = await goFight(account, 1, troop.index)
        console.log("attackClick", result);

        if (result && result.length > 0) {
            const newLand = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(troop.to.x), BigInt(troop.to.y)]))
            let win = false
            if (newLand && newLand.owner != lastOwner) {
                win = true
            }
            if (win) {
                toastSuccess("You Win!")
            } else {
                toastError("You Loss!")
            }
        } else {
            toastError("Attack failed")
        }

    }

    const enterLand = async () => {
        if (!account) {
            return
        }
        const result = await troopEnterLand(account, 1, troop.index)
        if (result && result.length > 0) {
            toastSuccess("Enter success")
        } else {
            toastError("Enter fail")
        }
    }

    const retreat = async () => {
        console.log("retreat", troop);
        if (!account) {
            return
        }
        const result = await retreatTroop(account, 1, troop.index)
        if (result && result.length > 0) {
            toastSuccess("Retreat...")
        } else {
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
            return <span style={{ cursor: "pointer" }} onClick={() => goto(troop.from)}>({troop.from.x},{troop.from.y})</span>
        }
        if (base.x == troop.from.x && base.y == troop.from.y) {
            return <span style={{ cursor: "pointer" }} onClick={() => goto(troop.from)}>Base</span>
        } else {
            return <span style={{ cursor: "pointer" }} onClick={() => goto(troop.from)}>({troop.from.x},{troop.from.y})</span>
        }
    }, [troop])

    const getTo = useMemo(() => {
        if (!base) {
            // return `(${troop.to.x},${troop.to.y})`
            return <span style={{ cursor: "pointer" }} onClick={() => goto(troop.to)}>({troop.to.x},{troop.to.y})</span>
        }
        if (base.x == troop.to.x && base.y == troop.to.y) {
            return <span style={{ cursor: "pointer" }} onClick={() => goto(troop.to)}>Base</span>
        } else {
            return <span style={{ cursor: "pointer" }} onClick={() => goto(troop.to)}>({troop.to.x},{troop.to.y})</span>
            // return `(${troop.to.x},${troop.to.y})`
        }
    }, [troop, account, base])

    const attackButton = useMemo(() => {
        const end = (troop.totalTime - (timenow - troop.startTime)) <= 0
        const retreat = troop.retreat

        const land = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(troop.to.x), BigInt(troop.to.y)]))

        // const land = lands.get(troop.to.x + "_" + troop.to.y)
        let isMy = false
        if (land && land.owner == account?.address) {
            isMy = true
        }
        if (end && !retreat && !isMy) {
            return <span onClick={() => attackClick()} style={{ cursor: "pointer", marginLeft: 10 }}>攻</span>
        }
        return <></>
    }, [troop, timenow])

    const enterButton = useMemo(() => {
        const end = (troop.totalTime - (timenow - troop.startTime)) <= 0
        const land = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(troop.to.x), BigInt(troop.to.y)]))

        let isMy = false
        if (land && land.owner == account?.address) {
            isMy = true
        }
        // console.log("enterbutton",end,land);

        if (isMy && end) {
            return <span style={{marginLeft:10}} onClick={() => { enterLand() }}>驻</span>
        }

        return <></>
    }, [troop, timenow])

    const retreatButton = useMemo(() => {
        const end = (troop.totalTime - (timenow - troop.startTime)) <= 0
        const land = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(troop.to.x), BigInt(troop.to.y)]))
        let toBase = false
        if (land && land.building == BuildType.Base) {
            toBase = true
        }

        if (troop.retreat) {
            if (end || toBase) {
                return <></>
            } else {
                return <p style={{ marginLeft: 10 }}>撤...</p>
            }
        } else {
            if (!toBase) {
                return <span onClick={() => retreat()} style={{ cursor: "pointer", marginLeft: 10 }}>撤</span>
            }
        }
        return <></>
    }, [troop, timenow])

    const goto = (coord: Coord) => {
        console.log("goto");
        const pixelPosition = tileCoordToPixelCoord(coord, TILE_WIDTH, TILE_HEIGHT);
        camera?.centerOn(pixelPosition?.x!, pixelPosition?.y!);
    }

    return (
        <ClickWrapper style={{ marginBottom: 20 }}>
            <div style={{ display: "flex" }}>
                <div style={{ display: "flex", flex: 1, cursor: "pointer", }} onClick={() => goto(troop.to)}>
                    <img src={flag} width={25} />
                    <div style={{ marginTop: 4, marginLeft: 3 }}>Troop{troop.index}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }} >
                    <img style={{ marginLeft: 20 }} height={25} src={soldierIcon} />
                    <div style={{ marginTop: 4, marginLeft: 3 }}>x{troop.amount}</div>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flex: 1 }}>
                    {getFrom}
                    <span> {" => "} </span>
                    {getTo}
                </div>

                <div style={{ color: "coral", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <p style={{ marginLeft: 10 }}>{getTime}</p>
                    {
                        retreatButton
                    }
                    {
                        attackButton
                    }
                    {
                        enterButton
                    }
                </div>

            </div>
        </ClickWrapper>
    )
}