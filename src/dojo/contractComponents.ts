/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "../../node_modules/@latticexyz/recs/src/index";

export function defineContractComponents(world: World) {
  return {
    Land: (() => {
      const name = "Land";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          x: RecsType.Number,
          y: RecsType.Number,
          owner: RecsType.String,
          building: RecsType.Number,
          level: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","u64","u64","ContractAddress","u64","u64"],
          },
        }
      );
    })(),
    GlobalConfig: (() => {
      const name = "GlobalConfig";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          MAX_MAP_X: RecsType.Number,
          MAX_MAP_Y: RecsType.Number,
          MULTIPLIER: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","u64","u64","u64"],
          },
        }
      );
    })(),
    WarriorConfig: (() => {
      const name = "WarriorConfig";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          Train_Food: RecsType.Number,
          Train_Gold: RecsType.Number,
          Train_Iron: RecsType.Number,
          Train_Time: RecsType.Number,
          Troop_Food: RecsType.Number,
          Troop_Gold: RecsType.Number,
          Troop_Iron: RecsType.Number,
          Troop_Speed: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","u64","u64","u64","u64","u64","u64","u64","u64"],
          },
        }
      );
    })(),
    BuildConfig: (() => {
      const name = "BuildConfig";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          Land_Gold: RecsType.Number,
          Land_Iron: RecsType.Number,
          Land_Water: RecsType.Number,
          Land_None: RecsType.Number,
          Build_Type_Base: RecsType.Number,
          Build_Type_Farmland: RecsType.Number,
          Build_Type_IronMine: RecsType.Number,
          Build_Type_GoldMine: RecsType.Number,
          Build_Type_Camp: RecsType.Number,
          Build_Type_Fort: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","u64","u64","u64","u64","u64","u64","u64","u64","u64","u64"],
          },
        }
      );
    })(),
    Player: (() => {
      const name = "Player";
      return defineComponent(
        world,
        {
          owner: RecsType.String,
          nick_name: RecsType.String,
          joined_time: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["ContractAddress","felt252","u64"],
          },
        }
      );
    })(),
    ETH: (() => {
      const name = "ETH";
      return defineComponent(
        world,
        {
          owner: RecsType.String,
          balance: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["ContractAddress","u128"],
          },
        }
      );
    })(),
    Food: (() => {
      const name = "Food";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          balance: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64"],
          },
        }
      );
    })(),
    Iron: (() => {
      const name = "Iron";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          balance: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64"],
          },
        }
      );
    })(),
    Gold: (() => {
      const name = "Gold";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          balance: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64"],
          },
        }
      );
    })(),
    Warrior: (() => {
      const name = "Warrior";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          x: RecsType.Number,
          y: RecsType.Number,
          balance: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","u64","u64","u64"],
          },
        }
      );
    })(),
    LandCost: (() => {
      const name = "LandCost";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          x: RecsType.Number,
          y: RecsType.Number,
          cost_gold: RecsType.Number,
          cost_food: RecsType.Number,
          cost_iron: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","u64","u64","u64","u64","u64"],
          },
        }
      );
    })(),
    Troop: (() => {
      const name = "Troop";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          index: RecsType.Number,
          balance: RecsType.Number,
          from_x: RecsType.Number,
          from_y: RecsType.Number,
          to_x: RecsType.Number,
          to_y: RecsType.Number,
          start_time: RecsType.Number,
          distance: RecsType.Number,
          retreat: RecsType.Boolean,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64","u64","u64","u64","u64","u64","u64","u64","bool"],
          },
        }
      );
    })(),
    Training: (() => {
      const name = "Training";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          start_time: RecsType.Number,
          total: RecsType.Number,
          out: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64","u64","u64"],
          },
        }
      );
    })(),
    UserWarrior: (() => {
      const name = "UserWarrior";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          balance: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64"],
          },
        }
      );
    })(),
    BuildPrice: (() => {
      const name = "BuildPrice";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          build_type: RecsType.Number,
          gold: RecsType.Number,
          food: RecsType.Number,
          iron: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","u64","u64","u64","u64"],
          },
        }
      );
    })(),
    LandMiner: (() => {
      const name = "LandMiner";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          x: RecsType.Number,
          y: RecsType.Number,
          miner_x: RecsType.Number,
          miner_y: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","u64","u64","u64","u64"],
          },
        }
      );
    })(),
    LandMining: (() => {
      const name = "LandMining";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          x: RecsType.Number,
          y: RecsType.Number,
          start_time: RecsType.Number,
          mined_x: RecsType.Number,
          mined_y: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","u64","u64","u64","u64","u64"],
          },
        }
      );
    })(),
    Fight: (() => {
      const name = "Fight";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          total: RecsType.Number,
          out: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64","u64"],
          },
        }
      );
    })(),
    MiningConfig: (() => {
      const name = "MiningConfig";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          Food_Speed: RecsType.Number,
          Iron_Speed: RecsType.Number,
          Gold_Speed: RecsType.Number,
          Base_Gold_Speed: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","u64","u64","u64","u64"],
          },
        }
      );
    })(),
    Airdrop: (() => {
      const name = "Airdrop";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          index: RecsType.Number,
          claimed: RecsType.Boolean,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64","bool"],
          },
        }
      );
    })(),
    AirdropConfig: (() => {
      const name = "AirdropConfig";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          index: RecsType.Number,
          reward_warrior: RecsType.Number,
          reward_food: RecsType.Number,
          reward_gold: RecsType.Number,
          reward_iron: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","u64","u64","u64","u64","u64"],
          },
        }
      );
    })(),
    UpgradeCost: (() => {
      const name = "UpgradeCost";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          x: RecsType.Number,
          y: RecsType.Number,
          start_time: RecsType.Number,
          end_time: RecsType.Number,
          target_level: RecsType.Number,
          claimed: RecsType.Boolean,
        },
        {
          metadata: {
            name: name,
            types: ["u64","u64","u64","u64","u64","u64","bool"],
          },
        }
      );
    })(),
    LandOwner: (() => {
      const name = "LandOwner";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          total: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64"],
          },
        }
      );
    })(),
    LuckyPack: (() => {
      const name = "LuckyPack";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          balance: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64"],
          },
        }
      );
    })(),
    RewardPoint: (() => {
      const name = "RewardPoint";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          balance: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64"],
          },
        }
      );
    })(),
    FortOwner: (() => {
      const name = "FortOwner";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          total: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64"],
          },
        }
      );
    })(),
    HBase: (() => {
      const name = "HBase";
      return defineComponent(
        world,
        {
          map_id: RecsType.Number,
          owner: RecsType.String,
          x: RecsType.Number,
          y: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u64","ContractAddress","u64","u64"],
          },
        }
      );
    })(),
  };
}
