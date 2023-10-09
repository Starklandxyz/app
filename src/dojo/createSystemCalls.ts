import { SetupNetworkResult } from "./setupNetwork";
import {
  Account,
  shortString,
  GetTransactionReceiptResponse,
} from "starknet";
import { ClientComponents } from "./createClientComponents";
import { getEvents } from "@dojoengine/utils";
import { setComponentsFromEvents } from "./parseEvent";
export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { execute, contractComponents }: SetupNetworkResult,
  { Player }: ClientComponents
) {
  const build_base = async (signer: Account, map_id: number, x: number, y: number) => {
    try {
      // console.log("roll start");
      const tx = await execute(signer, "build_base", [map_id, x, y]);
      // console.log("roll tx");

      const receipt = await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });
      // console.log("roll receipt:", receipt);
      // parseEvents
      let events = getEvents(receipt);
      setComponentsFromEvents(contractComponents, events);
      return events;
    } catch (e) {
      console.log(e);
    } finally {
    }
    return undefined;
  };

  const startMining = async (signer: Account, map_id: number, miner_x: number, miner_y: number,mined_x:number,mined_y:number) => {
    try {
      const tx = await execute(signer, "start_mining", [map_id, miner_x,miner_y,mined_x,mined_y]);
      const receipt = await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });
      // console.log("roll receipt:", receipt);
      let events = getEvents(receipt);
      setComponentsFromEvents(contractComponents, events);
      return events;
    } catch (e) {
      console.log(e);
    } finally {
    }
    return undefined;
  };

  const buildBuilding = async (signer: Account, map_id: number, x: number, y: number,build_type:number) => {
    try {
      const tx = await execute(signer, "build_building", [map_id, x, y,build_type]);
      const receipt = await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });
      // console.log("roll receipt:", receipt);
      let events = getEvents(receipt);
      setComponentsFromEvents(contractComponents, events);
      return events;
    } catch (e) {
      console.log(e);
    } finally {
    }
    return undefined;
  };

  const airdrop = async (signer: Account, map_id: number) => {
    try {
      // console.log("recoverEnergy start");
      const tx = await execute(signer, "admin", [map_id]);

      const receipt = await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });
      // console.log("roll receipt:", receipt);
      const events = getEvents(receipt);
      // console.log(events);
      setComponentsFromEvents(contractComponents, events);
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

  const retreatTroop = async (signer: Account, map_id: number,index:number) => {
    try {
      // console.log("recoverEnergy start");
      const tx = await execute(signer, "retreat_troop", [map_id,index]);

      const receipt = await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });
      // console.log("roll receipt:", receipt);
      const events = getEvents(receipt);
      // console.log(events);
      setComponentsFromEvents(contractComponents, events);
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

  const troopEnterLand = async (signer: Account, map_id: number,index:number) => {
    try {
      // console.log("troopEnterLand start");
      const tx = await execute(signer, "enter_land", [map_id,index]);

      const receipt = await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });
      // console.log("roll receipt:", receipt);
      const events = getEvents(receipt);
      // console.log(events);
      setComponentsFromEvents(contractComponents, events);
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

    // console.log(tx);
    const receipt = await signer.waitForTransaction(tx.transaction_hash, {
      retryInterval: 100,
    });

    // console.log(receipt);

    const events = getEvents(receipt);
    // console.log(events);
    setComponentsFromEvents(contractComponents, events);
    return events;
  };

  const sendTroop = async (
    signer: Account,
    map_id: number,
    amount:number,
    troop_id:number,
    fromx:number,
    fromy:number,
    tox:number,
    toy:number
  ) => {
    const tx = await execute(signer, "send_troop", [map_id,amount,troop_id,fromx,fromy,tox,toy]);
    // console.log(tx);
    const receipt = await signer.waitForTransaction(tx.transaction_hash, {
      retryInterval: 100,
    });

    // console.log(receipt);

    const events = getEvents(receipt);
    // console.log(events);
    setComponentsFromEvents(contractComponents, events);
    return events;
  };

  const trainWarrior = async (
    signer: Account,
    map_id: number,
    amount: number
  ) => {
    const tx = await execute(signer, "train_warrior", [map_id, amount]);
    // console.log(tx);
    const receipt = await signer.waitForTransaction(tx.transaction_hash, {
      retryInterval: 100,
    });

    // console.log(receipt);

    const events = getEvents(receipt);
    // console.log(events);
    setComponentsFromEvents(contractComponents, events);
    return events;
  };

  const spawn = async (signer: Account, nick_name: BigInt) => {
    // console.log("spawn signer:" + signer.address + ",nickname:" + nick_name);
    try {
      const tx = await execute(signer, "spawn", [nick_name.toString()]);

      // console.log(tx);
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


  return {
    airdrop,
    troopEnterLand,
    retreatTroop,
    takeWarrior,
    sendTroop,
    spawn,
    startMining,
    buildBuilding,
    build_base,
    trainWarrior,
  };
}