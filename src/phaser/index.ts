import { createPhaserEngine } from "../../node_modules/@latticexyz/phaserx/src/index";
import { NetworkLayer } from '../dojo/createNetworkLayer';
import { registerSystems } from './systems/registerSystems';
import { namespaceWorld } from '../../node_modules/@latticexyz/recs/src/index';
import { MAP_HEIGHT, MAP_WIDTH, TILE_HEIGHT, TILE_WIDTH } from "./constants";

export type PhaserLayer = Awaited<ReturnType<typeof createPhaserLayer>>;
type PhaserEngineConfig = Parameters<typeof createPhaserEngine>[0];

export const createPhaserLayer = async (networkLayer: NetworkLayer, phaserConfig: PhaserEngineConfig) => {

    const world = namespaceWorld(networkLayer.world, "phaser");
    const { game, scenes, dispose: disposePhaser } = await createPhaserEngine(phaserConfig);
    world.registerDisposer(disposePhaser);

    const { camera } = scenes.Main;

    // setBounds(x: number, y: number, width: number, height: number, centerOn?: boolean): this;
    camera.phaserCamera.setBounds(-60, -60, MAP_WIDTH * TILE_WIDTH + 200, MAP_HEIGHT * TILE_HEIGHT + 200);
    camera.phaserCamera.centerOn(0, 0);

    const components = {};

    const layer = {
        networkLayer,
        world,
        game,
        scenes,
        components,
    }

    registerSystems(layer);

    return layer
}