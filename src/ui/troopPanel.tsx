import { useCallback, useEffect, useMemo, useState } from "react";
import { ClickWrapper } from "./clickWrapper";
import styled from "styled-components";
import { store } from "../store/store";
import TroopItem from "./components/TroopItem";
import upicon from "../../public/assets/icons/upicon.png"
import downicon from "../../public/assets/icons/downicon.png"
import {
  Has,
  defineSystem,
  getComponentValue,
} from "../../node_modules/@latticexyz/recs/src/index";
import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { handleSQLResult } from "../utils/handleutils";
import { useComponentValue, useEntityQuery } from "../../node_modules/@latticexyz/react";
import { Troop, Troop2Troop } from "../types/Troop";
import NesButton from "./components/NesButton";

export default function TroopPanel() {
  const { account, phaserLayer } = store();
  const [showContent, setShowContent] = useState(true);
  const [hidePanel, setHidePanel] = useState(false);
  const toggleContent = useCallback(() => {
    setShowContent(!showContent);
  }, [showContent]);

  const {
    scenes: {
      Main: {
        input
      },
    },
    networkLayer: {
      components,
      network: { graphSdk },
    },
  } = phaserLayer!;
  const myBase = useComponentValue(
    components.HBase,
    getEntityIdFromKeys([1n, BigInt(account ? account.address : "")])
  );

  const [myTroops, setMyTroops] = useState<Array<Troop>>([]);
  const troops = useEntityQuery([Has(components.Troop)], {
    updateOnValueChange: true,
  });

  useEffect(() => {
    fetchTroops();
  }, []);


  useEffect(() => {
    // input.onKeyPress(
    //   keys => keys.has("T"),
    //   () => {
    //     console.log("input t",hidePanel);
    //     setHidePanel(pre => !pre)
    //   });
  }, [])

  const fetchTroops = async () => {
    const ts = await graphSdk.getAllTroops({ map_id: "0x1" });
    const edges = ts.data.entities?.edges;
    console.log("fetchTroops", edges);
    handleSQLResult(edges, components);
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    const array: Array<Troop> = [];
    troops.map((entity) => {
      const troop = getComponentValue(components.Troop, entity);
      if (troop?.owner == account.address && troop?.start_time != 0) {
        array.push(Troop2Troop(troop));
      }
    });
    setMyTroops(array);
  }, [account, troops]);

  return (
    <ClickWrapper>
      <Container>
        {account && (
          <div
            style={{
              overflow: "auto",
              maxHeight: 320,
              lineHeight: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: 10,
              borderRadius: 15,
              paddingTop: 1,
            }}
          >
            <div style={{ display: "flex" }}>
              <p style={{ flex: 1, fontSize: 20, color: "pink", margin: "4px" }}>
                Troops -{" "}
                <span style={{ fontSize: "17px", color: "lightblue" }}>
                  {" "}
                  {myTroops.length}
                </span>
              </p>
              {/* <NesButton
                style={{
                  height: "30px",
                  alignSelf: "center",
                  justifyContent: "flex-end",
                }}
                onClick={toggleContent}
              >
                Show/Hide
              </NesButton> */}

              <div style={{ width: 50 }}>
                <img data-tooltip-id="my-tooltip"
                  data-tooltip-content="Hide | Show (Shortcut : T)"
                  data-tooltip-place="top" src={hidePanel ? upicon : downicon} onClick={() => setHidePanel(pre => !pre)}
                  style={{ position: "absolute", top: "-5px", right: "10px", cursor: "pointer", transform: "rotate(90deg)", marginBottom: 15 }} />
              </div>
            </div>
            {!hidePanel && (
              <div style={{ marginTop: 15 }}>
                {[...myTroops.values()].map(
                  (value) =>
                    value.owner == account.address &&
                    value.startTime != 0 && (
                      <TroopItem key={value.id} base={myBase} troop={value} />
                    )
                )}
              </div>
            )}
          </div>
        )}
      </Container>
    </ClickWrapper>
  );
}

const Container = styled.div`
  position: absolute;
  top: 100px;
  left: 1%;
  color: white;

  @media (max-width: 768px) {
    top: 150px;
  }
`;
