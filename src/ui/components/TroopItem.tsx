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
import { controlStore } from "../../store/controlStore";
import { get_land_level } from "../../types/Land";
import { panelStore } from "../../store/panelStore";

export default function TroopItem(params: any) {
    const { timenow } = ticStore()
    const { account, phaserLayer, camera } = store()
    const {
        networkLayer: {
            components: contractComponents,
            systemCalls: { retreatTroop, troopEnterLand, goFight, attackMonster },
        }
    } = phaserLayer!

    const troop: Troop = params.troop
    const base: Coord = params.base

    const attackMon = async () => {
        if (!account) { return }

        panelStore.setState({ monsterResult: { show: true, status: "loading", pack: 0 } })
        const pack = getComponentValue(contractComponents.LuckyPack, getEntityIdFromKeys([1n, BigInt(account.address)]))
        let oldPack = pack ? pack.balance : 0

        const result = await attackMonster(account, 1, troop.index)
        console.log("attackClick", result);

        if (result && result.length > 0) {
            const newpack = getComponentValue(contractComponents.LuckyPack, getEntityIdFromKeys([1n, BigInt(account.address)]))
            let newPack = newpack ? newpack.balance : 0
            console.log("attackMon", oldPack, newPack);

            if (newPack > oldPack) {
                panelStore.setState({ monsterResult: { show: true, status: "win", pack: newPack - oldPack } })
                toastSuccess("Success! Got " + (newPack - oldPack) + " Lucky Pack!")
            } else {
                panelStore.setState({ monsterResult: { show: true, status: "fail", pack: 0 } })
                toastSuccess("Unlucky. You got 0 pack.")
            }
        } else {
            panelStore.setState({ monsterResult: { show: false, status: "loading", pack: 0 } })
            toastError("Attack failed")
        }
    }

    const maxLand = () => {
        const base = getComponentValue(contractComponents.Base, getEntityIdFromKeys([1n, BigInt(account?.address!)]))
        if (!base) {
            return 10
        }
        const land = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(base.x), BigInt(base.y)]))
        if (!land) {
            return 10
        }
        const max = 10 + 5 * (land?.level - 1)
        return max
    }

    const attackClick = async () => {
        if (!account) { return }

        const level = get_land_level(1, troop.to.x, troop.to.y)
        if (level == 6) {
            attackMon()
            return
        }
        const totalLand = getComponentValue(contractComponents.LandOwner, getEntityIdFromKeys([1n, BigInt(account.address)]))
        const t = totalLand ? totalLand.total : 0
        if (t >= maxLand()) {
            toastError("Exceed max land. Upgrade Base.")
            return
        }

        panelStore.setState({ fightResult: { show: true, status: "loading" } })
        const attackLand = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(troop.to.x), BigInt(troop.to.y)]))
        let lastOwner = attackLand ? attackLand.owner : ""

        const result = await goFight(account, 1, troop.index)
        // console.log("attackClick", result);

        if (result && result.length > 0) {
            const newLand = getComponentValue(contractComponents.Land, getEntityIdFromKeys([1n, BigInt(troop.to.x), BigInt(troop.to.y)]))
            let win = false
            if (newLand && newLand.owner != lastOwner) {
                win = true
            }
            console.log("attackClick", attackLand, newLand);

            if (win) {
                toastSuccess("You Win!")
                panelStore.setState({ fightResult: { show: true, status: "win" } })
            } else {
                toastError("You Lose!")
                panelStore.setState({ fightResult: { show: true, status: "lose" } })
            }
        } else {
            panelStore.setState({ fightResult: { show: false, status: "win" } })
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
            return <span style={{ marginLeft: 10 }} onClick={() => { enterLand() }}>驻</span>
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