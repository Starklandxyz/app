import { SetupNetworkResult } from "./setupNetwork";
import {
  Account,
  shortString,
  GetTransactionReceiptResponse,
} from "starknet";
import { ClientComponents } from "./createClientComponents";
import { getEvents, setComponentsFromEvents } from "@dojoengine/utils";
export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { execute, contractComponents }: SetupNetworkResult,
  { Player }: ClientComponents
) {
  const build_base = async (signer: Account, map_id: number, x: number, y: number) => {
    try {
      console.log("roll start");
      const tx = await execute(signer, "build_base", [map_id, x, y]);
      console.log("roll tx");

      const receipt = await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });
      console.log("roll receipt:", receipt);
      // parseEvents
      let events = getEvents(receipt);
      // setComponentsFromEvents(contractComponents, events);
      return events;
    } catch (e) {
      console.log(e);
    } finally {
    }
    return undefined;
  };

  const airdrop = async (signer: Account, map_id: number) => {
    try {
      console.log("recoverEnergy start");
      const tx = await execute(signer, "admin", [map_id]);

      const receipt = await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });
      console.log("roll receipt:", receipt);
      const events = getEvents(receipt);
      console.log(events);
      return events;
    } catch (e) {
      console.log(e);
      // Position.removeOverride(positionId);
      // Moves.removeOverride(movesId);
    } finally {
      // Position.removeOverride(positionId);
      // Moves.removeOverride(movesId);
    }
    return undefined;
  };

  const takeWarrior = async (
    signer: Account,
    map_id: number
  ) => {
    const tx = await execute(signer, "take_warrior", [map_id]);
    // console.log("buyEnergy signer:" + signer.address + ",amount:" + amount);

    // TODO: override gold

    console.log(tx);
    const receipt = await signer.waitForTransaction(tx.transaction_hash, {
      retryInterval: 100,
    });

    console.log(receipt);

    const events = getEvents(receipt);
    console.log(events);

    // return player,land
    return events;
  };


  const buyGold = async (
    signer: Account,
    amount: number
  ) => {
    const tx = await execute(signer, "buy_gold", [amount]);
    console.log("buyGold signer:" + signer.address + ",amount:" + amount);

    // TODO: override gold

    console.log(tx);
    const receipt = await signer.waitForTransaction(tx.transaction_hash, {
      retryInterval: 100,
    });

    console.log(receipt);

    const events = getEvents(receipt);
    console.log(events);

    // return player,land
    return events;
  };

  const trainWarrior = async (
    signer: Account,
    map_id: number,
    amount: number
  ) => {
    const tx = await execute(signer, "train_warrior", [map_id, amount]);
    console.log(tx);
    const receipt = await signer.waitForTransaction(tx.transaction_hash, {
      retryInterval: 100,
    });

    console.log(receipt);

    const events = getEvents(receipt);
    console.log(events);

    // return player,land
    return events;
  };

  //TODO : buy back on chain
  const buyBack = async (signer: Account) => {
    const tx = await execute(signer, "buy", []);

    // TODO: override gold

    console.log(tx);
    const receipt = await signer.waitForTransaction(tx.transaction_hash, {
      retryInterval: 100,
    });

    console.log(receipt);

    const events = parseEvent(receipt);
    console.log(events);
    // return player1 player2 townhall land
    return events;
  };

  const spawn = async (signer: Account, nick_name: BigInt) => {
    console.log("spawn signer:" + signer.address + ",nickname:" + nick_name);
    try {
      const tx = await execute(signer, "spawn", [nick_name.toString()]);

      console.log(tx);
      const receipt = await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });

      let events = getEvents(receipt);
      setComponentsFromEvents(contractComponents, events);
      return events;

    } catch (e) {
      console.log(e);
    } finally {
    }
    return null;
  };

  const explode = async (signer: Account, price: number) => {
    console.log(`explode`)
    // const entityId = parseInt(signer.address) as EntityIndex;
    try {
      const tx = await execute(signer, "explode", [price]);

      console.log(tx);
      const receipt = await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });

      const events = parseEvent(receipt);
      console.log(events);
      // Player Townhall land
      return events;
      // const entity = parseInt(events[0].entity.toString()) as EntityIndex;

      // const playerEvent = events[0] as Player;

      // console.log("spawn event nick name",playerEvent.nick_name);
      // store.setState({player})
    } catch (e) {
      console.log(e);
      return null
      // Player.removeOverride(positionId);
      // Moves.removeOverride(movesId);
    } finally {
      // Position.removeOverride(positionId);
      // Moves.removeOverride(movesId);
    }
  };

  const adminRoll = async (signer: Account, position: number) => {
    console.log(`adminRoll`)
    try {
      const tx = await execute(signer, "admin_roll", [position]);

      console.log(tx);
      const receipt = await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });
      console.log(receipt);

      const events = parseEvent(receipt);
      console.log(events);
      return events;
    } catch (e) {
      console.log(e);
      return null
    } finally {
    }

  };

  return {
    airdrop,
    takeWarrior,
    spawn,
    build_base,
    trainWarrior,
    buyBack,
    explode,
    adminRoll,
    buyGold
  };
}

// TODO: Move types and generalise this

export enum Direction {
  Left = 0,
  Right = 1,
  Up = 2,
  Down = 3,
}

export enum ComponentEvents {
  Player = "Player",
  Land = "Land",
  GlobalConfig = "GlobalConfig",
  Food = "Food",
  Iron = "Iron",
  Gold = "Gold",
  Warrior = "Warrior",
  Base = "Base",
  LandCost = "LandCost",
  ETH = "ETH"
}

export interface BaseEvent {
  type: ComponentEvents;
  entity: string;
}

export interface Player extends BaseEvent {
  nick_name: string,
  joined_time: number;
}

export interface Land extends BaseEvent {
  position: number;
  owner: string;
  building_type: number;
  price: number;
}

export interface Townhall extends BaseEvent {
  id: number;
  gold: number;
}

export interface ETH extends BaseEvent {
  id: number;
  balance: bigint;
}

export interface Base extends BaseEvent {
  id: number;
  map_id: bigint;
  x: bigint;
  y: bigint;
}

export const parseEvent = (
  receipt: GetTransactionReceiptResponse
): Array<Player | Land | ETH | Base> => {
  // if(typeof receipt == SuccessfulTransactionReceiptResponse)
  if (receipt.status == "NOT_RECEIVED" || receipt.status == "REJECTED" || receipt.status == "REVERTED") {
    return []
  }

  if (!receipt.events) {
    throw new Error(`No events found`);
  }

  let events: Array<Player | Land | Base | ETH> = [];

  for (let raw of receipt.events) {
    const decodedEventType = shortString.decodeShortString(raw.data[0]);

    switch (decodedEventType) {
      case ComponentEvents.Player:
        if (raw.data.length < 6) {
          throw new Error("Insufficient data for Moves event.");
        }
        const playerData: Player = {
          type: ComponentEvents.Player,
          entity: raw.data[2],
          nick_name: (raw.data[5]),
          joined_time: Number(raw.data[6]),
        };
        console.log("parseEvent player", raw.data[5], playerData.nick_name);
        events.push(playerData);
        break;

      case ComponentEvents.Land:
        const landData: Land = {
          type: ComponentEvents.Land,
          entity: raw.data[2],
          position: Number(raw.data[2]),
          owner: String(raw.data[5]),
          building_type: Number(raw.data[6]),
          price: Number(raw.data[7]),
        };
        if (Number(raw.data[10]) != 0) {
          landData.price = Number(raw.data[10]);
          landData.building_type = 0;
        }
        events.push(landData);
        break;

      case ComponentEvents.ETH:
        const eth: ETH = {
          type: ComponentEvents.ETH,
          entity: raw.data[2],
          id: Number(raw.data[2]),
          balance: BigInt(raw.data[5]),
        };

        events.push(eth);
        break;
      case ComponentEvents.Base:
        const base: Base = {
          type: ComponentEvents.Base,
          entity: raw.data[2],
          id: Number(raw.data[2]),
          map_id: BigInt(raw.data[5]),
          x: BigInt(raw.data[6]),
          y: BigInt(raw.data[7])
        };
        events.push(base);
        break;

      default: break;
      // throw new Error("Unsupported event type.");
    }
  }

  return events;
};
