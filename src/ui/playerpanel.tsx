import { getTimestamp, hexToString, positionToCoorp } from "../utils";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { BANK_ID, HOTEL_ID, STARKBUCKS_ID } from "../config";
import { tipStore } from "../store/tipStore";
import { Player2Player, copyPlayer } from "../types";
import { playerStore } from "../store/playerStore";
import { buildStore } from "../store/buildstore";

export default function PlayerPanel() {
    const { player: storePlayer } = playerStore()

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <div
             data-tooltip-id="my-tooltip"
             data-tooltip-content="user name"
             data-tooltip-place="top"
            >{hexToString(storePlayer?.nick_name)}</div>
        </div>)
}