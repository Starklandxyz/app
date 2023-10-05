import { random_on_chain } from "../utils"
import { BuildType } from "./Build"

export enum LandType{
    None,
    Gold,
    Iron,
    Water
}

export class Land {
    public x = -1
    public y = -1
    public owner: string|undefined
    public build: BuildType = BuildType.None
    public map_id = 0
    public level = 0
}

export const get_land_type = (map_id: number, x: number, y: number) => {
    //土地属性为1-100的随机数,其中 1 是金矿,2~3是铁矿,4~5是水【均无法占领和建设】
    const rand = random_on_chain(x * 99 + y + map_id * 17) % 100n + 1n // 1-100
    // console.log("get_land_type",rand);
    
    var type = LandType.None
    switch (rand) {
        case 1n: type = LandType.Gold; break;
        case 2n:
        case 3n: type = LandType.Iron; break;
        case 4n:
        case 5n: type = LandType.Water; break;
    }
    return type;
}

    //土著蛮族人数为1-50的随机数
    // fn land_barbarians(map_id: u64, x: u64, y: u64) -> u64 {
    //     let r1:u128 = random(x * 999 + y*3 + map_id * 77) % 50 + 1; // 1-50
    //     r1.try_into().unwrap()
    // }
export const get_land_barbarians = (map_id: number, x: number, y: number) => {
    const rand = random_on_chain(x * 999 + y*3 + map_id * 77) % 50n + 1n // 1-100
    return rand
}