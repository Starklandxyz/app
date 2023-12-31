import { Coord } from "../../node_modules/@latticexyz/utils/src/index";
import { MAP_WIDTH } from "../phaser/constants";
import { ToastContainer, ToastPosition, toast } from 'react-toastify';
import * as scure from "@scure/starknet"

export function isValidArray(input: any): input is any[] {
    return Array.isArray(input) && input != null;
}

export const getTimestamp = () => {
    let timestamp = Math.floor(Date.now() / 1000);
    // console.log(timestampInSeconds);
    return timestamp;
}

export function getFirstComponentByType(entities: any[] | null | undefined, typename: string): any | null {
    if (!isValidArray(entities)) return null;

    for (let entity of entities) {
        if (isValidArray(entity?.node.components)) {
            const foundComponent = entity.node.components.find((comp: any) => comp.__typename === typename);
            if (foundComponent) return foundComponent;
        }
    }

    return null;
}

export function extractAndCleanKey(entities?: any[] | null | undefined): string | null {
    if (!isValidArray(entities) || !entities[0]?.keys) return null;

    return entities[0].keys.replace(/,/g, '');
}

export function getRandomIntBetween(m: number, n: number): number {
    return m + Math.floor(Math.random() * (n - m + 1));
}

export function positionToCoorp(position: number): Coord {
    const size = MAP_WIDTH
    const ycount = Math.floor(position / size)
    var x = position % size
    if (ycount % 2 == 0) {
        x = position % size;
    }
    if (ycount % 2 == 1) {
        x = size - position % size - 1
    }
    const y = ycount * 3 + 1
    return { x: x, y: y };
}

export function positionToBuildingCoorp(position: number): Coord {
    const size = MAP_WIDTH
    position = position - 1
    const ycount = Math.floor(position / size)
    var x = position % size
    if (ycount % 2 == 0) {
        x = position % size;
    }
    if (ycount % 2 == 1) {
        x = size - position % size - 1
    }
    const y = ycount * 3

    return { x: x, y: y }
}

export function buildingCoorpToPosition(coord: Coord): number {
    var position = -1
    const size = MAP_WIDTH
    const x = coord.x
    const y = coord.y

    if (y % 3 != 0) {
        return position
    }
    if (x >= size) {
        return position
    }
    if (x < 0) {
        return position
    }

    const ycount = Math.floor(y / 3)
    if (ycount % 2 == 0) {
        position = ycount * size + x
    }
    if (ycount % 2 == 1) {
        position = ycount * size - x - 1 + size
    }
    position = position + 1;
    return position
}

export function truncateString(str: string, frontLen: number, endLen: number) {
    return str.slice(0, frontLen) + '..' + str.slice(-endLen);
}

export function stringToHex(str: string): string {
    return Array.from(encodeURI(str)).map(char => {
        return char.charCodeAt(0).toString(16);
    }).join('');
}

export function hexToString(hex: string | undefined): string {
    // console.log(`hex: ${hex}`);

    if (!hex) {
        return ''
    }
    try {
        let str = '';
        for (let i = 2; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        const result = decodeURI(str);
        return handleUserName(result)
    } catch (error) {
        console.error(error);
    }
    return ''
}

export function toastError(msg: string, position: ToastPosition = "top-center") {
    toast.error(msg, {
        position: position,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    });
}

export function toastWarning(msg: string, position: ToastPosition = "top-center") {
    toast.warning(msg, {
        position: position,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    });
}

export function toastInfo(msg: string, position: ToastPosition = "top-center") {
    toast.info(msg, {
        position: position,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    });
}

export function toastSuccess(msg: string, position: ToastPosition = "top-center") {
    toast.success(msg, {
        position: position,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    });
}

export const random_on_chain = (seed_: number) => {
    const seed = BigInt(seed_)
    let hashStr = scure.poseidonHashMany([seed, seed * 7n, seed * 29n])
    let low = "0x" + hashStr.toString(16).slice(-32)
    // console.log("hash:",hashStr.toString(16),low);
    let hex = BigInt(low)
    return hex
}

export const parseTime = (sec: number, showzero = true) => {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec - h * 3600) / 60)
    const s = sec - h * 3600 - m * 60


    var hs = h + ""
    if (h < 10) {
        hs = "0" + h
    }
    var ms = m + ""
    if (m < 10) {
        ms = "0" + m
    }
    var ss = s + ""
    if (s < 10) {
        ss = "0" + s
    }
    var result = ""
    if (h == 0) {
        result = `${m}m:${s}s`
        if (!showzero && s == 0) {
            result = `${m}m`
        }
    } else {
        result = `${h}h:${m}m:${s}s`
        if (!showzero && s == 0) {
            result = `${h}h:${m}m`
        }
    }
    // console.log("parseTime",sec,h,m,s);
    // console.log("parseTime",hs,ms,ss,result);

    return result
}


export const calDistanceFromBase = (base: Coord, to: Coord) => {
    // console.log("calDistance");
    const dis1 = Math.abs(base.x - to.x) + Math.abs(base.y - to.y)
    let dis = dis1
    const dis2 = Math.abs(base.x + 1 - to.x) + Math.abs(base.y - to.y)
    if (dis > dis2) {
        dis = dis2
    }
    const dis3 = Math.abs(base.x + 1 - to.x) + Math.abs(base.y + 1 - to.y)
    if (dis > dis3) {
        dis = dis3
    }
    const dis4 = Math.abs(base.x - to.x) + Math.abs(base.y + 1 - to.y)
    if (dis > dis4) {
        dis = dis4
    }
    return dis
}


export const calDistanceToBase = (base: Coord, from: Coord) => {
    const dis1 = Math.abs(base.x - from.x) + Math.abs(base.y - from.y)
    let dis = dis1
    const dis2 = Math.abs(base.x + 1 - from.x) + Math.abs(base.y - from.y)
    if (dis > dis2) {
        dis = dis2
    }
    const dis3 = Math.abs(base.x + 1 - from.x) + Math.abs(base.y + 1 - from.y)
    if (dis > dis3) {
        dis = dis3
    }
    const dis4 = Math.abs(base.x - from.x) + Math.abs(base.y + 1 - from.y)
    if (dis > dis4) {
        dis = dis4
    }
    return dis
}

export const handleUserName = (username: string, isSelf: boolean = false) => {
    if (isSelf) {
        return username
    }
    if (username.includes("Kill")) {
        return "User001"
    }
    return username
}