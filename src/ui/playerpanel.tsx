import { getTimestamp, hexToString, positionToCoorp } from "../utils";
import { playerStore } from "../store/playerStore";
import foodIcon from "../../public/assets/icons/food.png"
import ironIcon from "../../public/assets/icons/iron.png"
import goldIcon from "../../public/assets/icons/gold.png"
import soldierIcon from "../../public/assets/icons/soldier.png"
import flagIcon from "../../public/assets/icons/flag.png"
import landIcon from "../../public/assets/icons/landicon.png"

export default function PlayerPanel() {
    const { player: storePlayer } = playerStore()

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <div
                data-tooltip-id="my-tooltip"
                data-tooltip-content="user name"
                data-tooltip-place="top"
            >{hexToString(storePlayer?.nick_name)}</div>
            <div data-tooltip-id="my-tooltip"
                data-tooltip-content="Food"
                data-tooltip-place="top" style={{ marginTop: -5, marginRight: 4 }}>
                <img src={foodIcon} width={30} height={30} style={{ marginRight: 5 }} />100
            </div>
            <div data-tooltip-id="my-tooltip"
                data-tooltip-content="Gold"
                data-tooltip-place="top" style={{ marginTop: -5, marginRight: 4 }}>
                <img src={goldIcon} width={30} height={30} style={{ marginRight: 5 }} />100
            </div>
            <div data-tooltip-id="my-tooltip"
                data-tooltip-content="Iron"
                data-tooltip-place="top" style={{ marginTop: -5, marginRight: 4 }}>
                <img src={ironIcon} width={30} height={30} style={{ marginRight: 5 }} />100
            </div>
            <div data-tooltip-id="my-tooltip"
                data-tooltip-content="Land"
                data-tooltip-place="top" style={{ marginTop: -5, marginRight: 4 }}>
                <img src={landIcon} width={30} height={30} style={{ marginRight: 5 }} />1/10
            </div>
            <div data-tooltip-id="my-tooltip"
                data-tooltip-content="Soldiers"
                data-tooltip-place="top" style={{ marginTop: -5, marginRight: 4 }}>
                <img src={soldierIcon} width={30} height={30} style={{ marginRight: 5 }} />6/10
            </div>
            <div data-tooltip-id="my-tooltip"
                data-tooltip-content="Troops"
                data-tooltip-place="top" style={{ marginTop: -5, marginRight: 4 }}>
                <img src={flagIcon} width={30} height={30} style={{ marginRight: 5 }} />1/1
            </div>
        </div>)
}