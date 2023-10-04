import { BANK_ID, BOMB_ID, BUILDING_PRICES, HOTEL_ID, STARKBUCKS_ID } from "../config"
import { ComponentEvents, Player } from "../dojo/createSystemCalls"
import { Land as LandSQL, Player as PlayerSQL } from "../generated/graphql";
import { BuildType } from "./Build";
import { Land } from "./Land";

export class Building {
    public position: number = 0
    public type: number = 1
    public price: number = 0
    public owner: string = ""
    public enable = true
    public isMine = false
    //     { value: '10', label: 'Lv1 : $10' },
    //     { value: '20', label: 'Lv2 : $20' },
    //     { value: '50', label: 'Lv3 : $50' },
    //     { value: '100', label: 'Lv4 : $100' },
    //     { value: '200', label: 'Lv5 : $200' },
    //     { value: '300', label: 'Lv6 : $300' },
    //     { value: '500', label: 'Lv7 : $500' },
    //     { value: '1000', label: 'Lv8 : $1000' },
    // ];
    public static BombPrices = [10, 20, 50, 100, 200, 300, 500, 1000]

    constructor(type: number, price: number, owner: string, position: number) {
        this.type = type
        this.price = price
        this.owner = owner
        this.position = position
    }

    public getName = () => {
        switch (this.type) {
            case BOMB_ID: return "Bomb";
            case HOTEL_ID: return "Hotel";
            case BANK_ID: return "Bank";
            case STARKBUCKS_ID: return "Starkbucks";
        }
    }

    public getLevel = () => {
        var price0 = 0;
        var level = 1;
        if (this.type == BOMB_ID) {
            for (let index = 0; index < Building.BombPrices.length; index++) {
                const element = Building.BombPrices[index];
                if (element == this.price) {
                    level = index + 1;
                    break
                }
            }
            return level
        }

        switch (this.type) {
            case BOMB_ID: return 1;
            case HOTEL_ID: price0 = BUILDING_PRICES['Hotel']; break;
            case STARKBUCKS_ID: price0 = BUILDING_PRICES['Starkbucks']; break;
            case BANK_ID: price0 = BUILDING_PRICES['Bank']; break;
        }
        const ratio = this.price / price0;
        level = Math.floor(Math.log(ratio) / Math.log(1.3)) + 1
        // console.log("getLevel ", this.price, price0, ratio, level);
        return level;
    }
}

export function Player2Player(player_: PlayerSQL): Player {
    const player: Player = {
        type: ComponentEvents.Player,
        entity: "",
        nick_name: player_.nick_name,
        joined_time: player_.joined_time,
    }
    return player;
}


export const Land2Land = (land_: LandSQL) => {
    const land: Land = {
        x: land_.x,
        y: land_.y,
        owner: land_.owner,
        build: BuildType.None,
        map_id: land_.map_id,
        level: land_.level
    }
    switch (land_.building) {
        case 1: land.build = BuildType.Base; break;
        case 2: land.build = BuildType.Farmland; break;
        case 3: land.build = BuildType.IronMine; break;
        case 4: land.build = BuildType.GoldMine; break;
        case 5: land.build = BuildType.Camp; break;
    }
    return land;
}

export function copyPlayer(player_: Player): Player {
    const player: Player = {
        type: player_.type,
        entity: player_.entity,
        nick_name: player_.nick_name,
        joined_time: player_.joined_time,
    }
    return player;
}