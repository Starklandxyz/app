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
        },
        {
          metadata: {
            name: name,
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
          },
        }
      );
    })(),
    Base: (() => {
      const name = "Base";
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
        },
        {
          metadata: {
            name: name,
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
          },
        }
      );
    })(),
  };
}
