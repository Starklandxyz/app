import { SetupNetworkResult } from "./setupNetwork";
import {
  Account,
  shortString,
  GetTransactionReceiptResponse,
  CallData,
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
      const tx = await execute(signer, "build_base","execute", [map_id, x, y]);
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

  const startMining = async (signer: Account, map_id: number, miner_x: number, miner_y: number, mined_x: number, mined_y: number) => {
    try {
      const tx = await execute(signer, "start_mining","execute", [map_id, miner_x, miner_y, mined_x, mined_y]);
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

  const buildBuilding = async (signer: Account, map_id: number, x: number, y: number, build_type: number) => {
    try {
      const tx = await execute(signer, "build_building","execute", [map_id, x, y, build_type]);
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

  const removeBuilding = async (signer: Account, map_id: number, x: number, y: number) => {
    try {
      const tx = await execute(signer, "remove_build","execute", [map_id, x, y]);
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

  const goFight = async (signer: Account, map_id: number, troop_index: number) => {
    console.error("goFight info", map_id, troop_index);
    try {
      const tx = await execute(signer, "go_fight","execute", [map_id, troop_index]);
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
    return undefined;
  };

  const attackMonster = async (signer: Account, map_id: number, troop_index: number) => {
    console.error("attackMonster info", map_id, troop_index);
    try {
      const tx = await execute(signer, "attack_monster","execute", [map_id, troop_index]);
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
    return undefined;
  };

  const openPacks = async (signer: Account, map_id: number, amount: number) => {
    console.error("openPacks info", map_id, amount);
    try {
      const tx = await execute(signer, "open_pack","execute", [map_id, amount]);
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
    return undefined;
  };

  const claimMining = async (signer: Account, map_id: number, xs: Array<number>, ys: Array<number>) => {
    try {

      const tx = await execute(signer, "claim_mining","execute", CallData.compile([map_id, xs, ys]));
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
    return undefined;
  };

  const airdrop = async (signer: Account, map_id: number, index: number, x: number = 0, y: number = 0) => {
    try {
      // console.log("recoverEnergy start");
      const tx = await execute(signer, "claim_airdrop","execute", [map_id, index, x, y]);

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

  const upgradeBuild = async (signer: Account, map_id: number, x: number = 0, y: number = 0) => {
    try {
      // console.log("recoverEnergy start");
      const tx = await execute(signer, "upgrade_building","execute", [map_id, x, y]);

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

  const upgradeComplete = async (signer: Account, map_id: number, x: number = 0, y: number = 0) => {
    try {
      // console.log("recoverEnergy start");
      const tx = await execute(signer, "upgrade_compleate","execute", [map_id, x, y]);

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


  const admin = async (signer: Account, map_id: number) => {
    try {
      // console.log("recoverEnergy start");
      const tx = await execute(signer, "admin","execute", [map_id]);

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

  const adminAttack = async (signer: Account, map_id: number, x: number, y: number) => {
    try {
      // console.log("recoverEnergy start");
      const tx = await execute(signer, "admin_attack","execute", [map_id, x, y]);

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

  const retreatTroop = async (signer: Account, map_id: number, index: number) => {
    try {
      // console.log("recoverEnergy start");
      const tx = await execute(signer, "retreat_troop","execute", [map_id, index]);

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

  const troopEnterLand = async (signer: Account, map_id: number, index: number) => {
    try {
      // console.log("troopEnterLand start");
      const tx = await execute(signer, "enter_land","execute", [map_id, index]);

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
    const tx = await execute(signer, "take_warrior","execute", [map_id]);
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
    amount: number,
    troop_id: number,
    fromx: number,
    fromy: number,
    tox: number,
    toy: number
  ) => {
    const tx = await execute(signer, "send_troop","execute", [map_id, amount, troop_id, fromx, fromy, tox, toy]);
    // console.log(tx);
    const receipt = await signer.waitForTransaction(tx.transaction_hash, {
      retryInterval: 100,
    });

    console.log(receipt);

    const events = getEvents(receipt);
    // console.log(events);
    setComponentsFromEvents(contractComponents, events);
    return events;
  };

  const trainWarrior = async (
    signer: Account,
    map_id: number,
    amount: number, xs: Array<number>, ys: Array<number>
  ) => {
    const tx = await execute(signer, "train_warrior","execute", CallData.compile([map_id,amount, xs, ys]));
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

  const buyWarrior = async (
    signer: Account,
    map_id: number,
    amount: number, xs: Array<number>, ys: Array<number>
  ) => {
    const tx = await execute(signer, "train_warrior","buy", CallData.compile([map_id,amount, xs, ys]));
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
      const tx = await execute(signer, "spawn","execute", [nick_name.toString()]);

      // console.log(tx);
      const receipt = await signer.waitForTransaction(tx.transaction_hash, {
        retryInterval: 100,
      });
      console.log("spawn", receipt);
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
    openPacks,
    retreatTroop,
    upgradeBuild,
    takeWarrior,
    sendTroop,
    claimMining,
    upgradeComplete,
    removeBuilding,
    spawn,
    attackMonster,
    startMining,
    buildBuilding,
    build_base,
    adminAttack,
    buyWarrior,
    trainWarrior,
    admin,
    goFight
  };
}