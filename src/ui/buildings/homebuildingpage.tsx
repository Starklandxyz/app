import { useComponentValue, useEntityQuery } from "@dojoengine/react";
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
import { toastError, toastSuccess } from "../../utils";
import { ticStore } from "../../store/ticStore";
import { handleSQLResult } from "../../utils/handleutils";
import {
  pixelCoordToTileCoord,
  tileCoordToPixelCoord,
} from "../../../node_modules/@latticexyz/phaserx/src/index";
import { TILE_HEIGHT, TILE_WIDTH } from "../../phaser/constants";
import NesButton from "../components/NesButton";
import styled from "styled-components";
import { Direction } from "../../generated/graphql";
import { updateStore } from "../../store/updateStore";

export default function BasePage() {
  const { account, phaserLayer, camera } = store();
  const { timenow } = ticStore();

  const {
    networkLayer: {
      systemCalls: { claimMining, upgradeComplete },
      components: contractComponents,
      network: { graphSdk },
    },
  } = phaserLayer!;

  // const [base, setBase] = useState<Land>()
  const base = useComponentValue(
    contractComponents.Base,
    getEntityIdFromKeys([1n, account ? BigInt(account.address) : 0n])
  );
  const miningConfig = useComponentValue(
    contractComponents.MiningConfig,
    getEntityIdFromKeys([1n])
  );
  const update_base = useComponentValue(contractComponents.UpgradeCost, getEntityIdFromKeys([1n, BigInt(base ? base.x : 0), BigInt(base ? base.y : 0)]))

  const [baseland, setBaseland] = useState<Array<Land>>([]);
  const [farmland, setFarmland] = useState<Array<Land>>([]);
  const [ironMine, setIronmine] = useState<Array<Land>>([]);
  const [goldmine, setGoldmine] = useState<Array<Land>>([]);
  const [camp, setcamp] = useState<Array<Land>>([]);

  const landEntities = useEntityQuery([Has(contractComponents.Land)], {
    updateOnValueChange: true,
  });

  useEffect(() => {
    fetchMiningConfig();
  }, []);

  const fetchMiningConfig = async () => {
    const result = await graphSdk.getMiningConfig({ map_id: "0x1" });
    console.log("fetchMiningConfig", result);

    const edges = result.data.entities?.edges;
    handleSQLResult(edges, contractComponents);
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    const fs: Array<Land> = [];
    const bs: Array<Land> = [];
    const camps: Array<Land> = [];
    const golds: Array<Land> = [];
    const irons: Array<Land> = [];

    landEntities.map((entity) => {
      const value = getComponentValue(contractComponents.Land, entity);
      // console.log("landEntities", value);
      if (value && value.owner == account.address) {
        const land = new Land();
        land.build = value.building;
        land.level = value.level;
        land.map_id = value.map_id;
        land.owner = value.owner;
        land.x = value.x;
        land.y = value.y;
        switch (value.building) {
          case BuildType.Base:
            bs.push(land);
            break;
          case BuildType.Farmland:
            fs.push(land);
            break;
          case BuildType.GoldMine:
            golds.push(land);
            break;
          case BuildType.IronMine:
            irons.push(land);
            break;
          case BuildType.Camp:
            camps.push(land);
            break;
        }
      }
    });
    setBaseland(bs);
    setFarmland(fs);
    setIronmine(irons);
    setGoldmine(golds);
    setcamp(camps);
  }, [landEntities, account]);

  const claimAll = async () => {
    // const land = farmland[0]
    if (!account) {
      toastError("Create account first");
      return;
    }
    const xs: Array<number> = [];
    const ys: Array<number> = [];
    const base = getComponentValue(
      contractComponents.Base,
      getEntityIdFromKeys([1n, BigInt(account.address)])
    );
    if (!base) {
      toastError("Create base first");
      return;
    }
    xs.push(base.x);
    ys.push(base.y);

    farmland.map((land) => {
      xs.push(land.x);
      ys.push(land.y);
    });
    ironMine.map((land) => {
      xs.push(land.x);
      ys.push(land.y);
    });
    goldmine.map((land) => {
      xs.push(land.x);
      ys.push(land.y);
    });

    const result = await claimMining(account!, 1, xs, ys);
    if (result && result.length > 0) {
      toastSuccess("Claim success");
    } else {
      toastError("Claim failed");
    }
  };

  const calClaimable = (lands: Land[], speed: number) => {
    // const config = getComponentValue(contractComponents.MiningConfig, getEntityIdFromKeys([1n]))
    // if (!miningConfig) {
    //     return 0
    // }
    let total = 0;
    lands.map((land) => {
      const mining = getComponentValue(
        contractComponents.LandMining,
        getEntityIdFromKeys([1n, BigInt(land.x), BigInt(land.y)])
      );
      if (mining) {
        if (mining.start_time == 0) {
          return;
        } else {
          const total_time = timenow - mining.start_time;
          const t = (total_time * speed) / 1_000_000;
          // console.log("foodClaimable", total);
          total += t;
        }
      }
      return;
    });
    return total;
  };

  const foodClaimable = useMemo(() => {
    if (!miningConfig) {
      return 0;
    }
    return calClaimable(farmland, miningConfig.Food_Speed).toFixed(2);
  }, [timenow]);

  const ironClaimable = useMemo(() => {
    if (!miningConfig) {
      return 0;
    }
    return calClaimable(ironMine, miningConfig.Iron_Speed).toFixed(2);
  }, [timenow]);

  const calBaseClaimable = () => {
    if (!miningConfig) {
      return 0;
    }
    if (!account) {
      return 0;
    }
    const base = getComponentValue(
      contractComponents.Base,
      getEntityIdFromKeys([1n, BigInt(account.address)])
    );
    if (!base) {
      return 0;
    }
    const land = new Land();
    land.x = base.x;
    land.y = base.y;
    return calClaimable([land], miningConfig.Base_Gold_Speed);
  };

  const goldClaimable = useMemo(() => {
    if (!miningConfig) {
      return 0;
    }
    const t1 = calClaimable(goldmine, miningConfig.Gold_Speed);
    const t2 = calBaseClaimable();
    const t = t1 + t2;
    return t.toFixed(2);
  }, [timenow]);

  const getBaseLevel = useMemo(() => {
    if (!base) {
      return 1;
    }
    let level = 1;
    baseland.map((land) => {
      if (land.x == base.x && land.y == base.y) {
        level = land.level;
      }
    });
    return level;
  }, [base, baseland]);

  const getFarmlandPerHour = useMemo(() => {
    if (!miningConfig) {
      return;
    }
    const total =
      (3600 * miningConfig.Food_Speed * farmland.length) / 1_000_000;
    return total;
  }, [miningConfig, farmland]);

  const getGoldMinePerHour = useMemo(() => {
    if (!miningConfig) {
      return;
    }
    const total =
      (3600 * miningConfig.Gold_Speed * goldmine.length) / 1_000_000;
    return total;
  }, [miningConfig, goldmine]);

  const getIronMinePerHour = useMemo(() => {
    if (!miningConfig) {
      return;
    }
    const total =
      (3600 * miningConfig.Iron_Speed * ironMine.length) / 1_000_000;
    return total;
  }, [miningConfig, ironMine]);

  const getBaseGoldPerHour = useMemo(() => {
    if (!miningConfig) {
      return;
    }
    const total = (3600 * miningConfig.Base_Gold_Speed) / 1_000_000;
    return total;
  }, [miningConfig, base]);

  const zoomto = (land: Land) => {
    const pixelPosition = tileCoordToPixelCoord(
      { x: land.x + 1, y: land.y + 1 },
      TILE_WIDTH,
      TILE_HEIGHT
    );
    camera?.centerOn(pixelPosition?.x!, pixelPosition?.y!);
  };

  const finishUpgrade = async () => {
    const result = await upgradeComplete(account!, 1, base.x, base.y)
    if (result && result.length > 0) {
      toastSuccess("Upgrade success")
    } else {
      toastError("Upgrade fail")
    }
  }

  const updateBase = () => {
    if (!base) {
      toastError("Build a base first")
      return
    }
    updateStore.setState({ updateLand: { x: base.x, y: base.y } })
  }

  const updateButton = useMemo(() => {
    // const update_cost = getComponentValue()
    if (update_base && !update_base.claimed) {
      if (timenow > update_base.end_time) {
        return <><NesButton style={{ minHeight: 30 }} onClick={() => finishUpgrade()}>Confirm Upgrade</NesButton></>
      } else {
        const total = update_base.end_time - update_base.start_time
        const used = timenow - update_base.start_time
        return <>{used}s/{total}s Updating...</>
      }
    }
    return <NesButton style={{ minHeight: 30 }} onClick={() => updateBase()}>Upgrade</NesButton>
  }, [timenow, update_base])

  const campCapacity = useMemo(() => {
    let total = 0
    for (let index = 0; index < camp.length; index++) {
      const element = camp[index];
      total += element.level * 30
    }
    return total
  }, [camp])

  return (
    <div
      style={{
        width: 240,
        height: 400,
        lineHeight: 0.3,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        borderRadius: 15,
        paddingTop: 1,
      }}
    >

      <div
        style={{
          border: "1px solid yellow",
          borderRadius: 10,
          padding: "12px 6px",
          marginTop: "12px",
        }}
      >
        {base && (
          <ResourceItem>
            <span className="name" onClick={() => zoomto(base)} style={{ cursor: "pointer" }}>
              Base {base?.x},{base?.y}{" "}
            </span>
            <span className="speed">{getBaseGoldPerHour} Gold/H</span>
          </ResourceItem>
        )}

        <div style={{ display: "flex", marginTop: "8px", paddingLeft: "6px" }}>
          <span style={{ fontWeight: "bold", flex: 1, margin: "auto" }}>
            LV {getBaseLevel}
          </span>
          {updateButton}
        </div>
      </div>
      <div
        style={{
          border: "1px solid yellow",
          borderRadius: 10,
          padding: "12px 6px",
          marginTop: "12px",
        }}
      >
        <ResourceItem>
          <span className="name"> Camp - </span>
          <span className="level">{camp.length}</span>
          <span className="speed">+{campCapacity} Capacity</span>
        </ResourceItem>

        <ResourceItem>
          <span className="name">Farmlands -</span>
          <span className="level">{farmland.length}</span>
          <span className="speed">+{getFarmlandPerHour} Food/H</span>
        </ResourceItem>
        <ResourceItem>
          <span className="name">GoldMine -&nbsp;</span>
          <span className="level">{goldmine.length}</span>
          <span className="speed" style={{ marginLeft: 10 }}>
            +{getGoldMinePerHour} Gold/H
          </span>
        </ResourceItem>
        <ResourceItem>
          <span className="name">IronMine -&nbsp;</span>
          <span className="level" style={{ marginLeft: 5 }}>
            {ironMine.length}
          </span>
          <span className="speed" style={{ marginLeft: 10 }}>
            +{getIronMinePerHour} Iron/H
          </span>
        </ResourceItem>
      </div>

      <div
        style={{
          border: "1px solid yellow",
          borderRadius: 10,
          padding: "12px 6px",
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex" }}>
          <span style={{ alignSelf: "center", flex: 1 }}>Claimable</span>
          <NesButton
            onClick={() => claimAll()}
            style={{ marginRight: 4, height: 26, justifyContent: "flex-end" }}
          >
            Claim All
          </NesButton>
        </div>

        <div>
          <ResourceItem>
            <span className="name">Food:</span>
            <span className="speed">{foodClaimable}</span>
          </ResourceItem>
          <ResourceItem>
            <span className="name">Gold:</span>
            <span className="speed">{goldClaimable}</span>
          </ResourceItem>
          <ResourceItem>
            <span className="name">Iron:</span>
            <span className="speed">{ironClaimable}</span>
          </ResourceItem>
        </div>
      </div>
    </div>
  );
}

const ResourceItem = styled.div`
  display: flex;
  margin-top: 4px;
  span {
    line-height: 20px;
  }
  .name {
    margin-left: 3px;
  }

  .level {
    margin-left: 5px;
  }

  .speed {
    text-align: right;
    flex: 1;
  }
`;
