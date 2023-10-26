import { useComponentValue, useEntityQuery } from "../../../node_modules/@latticexyz/react";
import { store } from "../../store/store";
import { getEntityIdFromKeys } from "../../dojo/parseEvent";
import { useEffect, useMemo, useState } from "react";
import { Land } from "../../types/Land";
import {
    Has,
    HasValue,
    getComponentValue,
    getComponentValueStrict,
} from "../../../node_modules/@latticexyz/recs/src/index";
import { BuildType } from "../../types/Build";
import { parseTime, toastError, toastSuccess } from "../../utils";
import { ticStore } from "../../store/ticStore";
import { handleSQLResult } from "../../utils/handleutils";
import {
    pixelCoordToTileCoord,
    tileCoordToPixelCoord,
} from "../../../node_modules/@latticexyz/phaserx/src/index";
import { TILE_HEIGHT, TILE_WIDTH } from "../../phaser/constants";
import NesButton from "../components/NesButton";
import styled from "styled-components";
import { updateStore } from "../../store/updateStore";
import LoadingButton from "../components/LoadingButton";
import { playerBuildStore } from "../../store/playerbuildingstore";
import CampItem from "../components/CampItem";


export default function CampPage() {
    const { camps } = playerBuildStore()

    return (
        <div style={{ width: 260, height: 400, lineHeight: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 10, borderRadius: 15, paddingTop: 1 }}>
            <div style={{ padding: 10 }}>Camps</div>
            <div style={{ maxHeight: 360, overflow: "auto", }}>
                {
                    camps.map((land, index) => <CampItem land={land} />)
                }
            </div>
        </div>
    )
}