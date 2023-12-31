import {
    defineSceneConfig,
    AssetType,
    defineScaleConfig,
    defineMapConfig,
    defineCameraConfig,
} from "../../node_modules/@latticexyz/phaserx/src/index";
import worldTileset from "/assets/tilesets/world.png";
import arrow1Icon from "/assets/tilesets/arrow1.png";
import arrow2Icon from "/assets/tilesets/arrow2.png";
import arrow3Icon from "/assets/tilesets/arrow3.png";
import armeyIcon from "/assets/tilesets/armey.png";
import { TileAnimations, Tileset } from "../artTypes/world";
import { Sprites, Assets, Maps, Scenes, TILE_HEIGHT, TILE_WIDTH, Animations } from "./constants";

const ANIMATION_INTERVAL = 150;

const mainMap = defineMapConfig({
    chunkSize: TILE_WIDTH * 64, // tile size * tile amount
    tileWidth: TILE_WIDTH,
    tileHeight: TILE_HEIGHT,
    backgroundTile: [Tileset.Grass2],
    animationInterval: ANIMATION_INTERVAL,
    tileAnimations: TileAnimations,
    layers: {
        layers: {
            Background: { tilesets: ["Default"] },
            SelectArea : { tilesets: ["Default"]},
            Foreground: { tilesets: ["Default"] },
            TempOccupy: { tilesets: ["Default"] },
            Occupy: { tilesets: ["Default"] },
            Build: { tilesets: ["Default"]},
            Select: { tilesets: ["Default"]},
            Flag: { tilesets: ["Default"] },
            Soldier: { tilesets: ["Default"] },
            Num: { tilesets: ["Default"] },
            BuildTop: { tilesets: ["Default"] },
        },
        defaultLayer: "Background",
    },
});

export const phaserConfig = {
    sceneConfig: {
        [Scenes.Main]: defineSceneConfig({
            assets: {
                [Assets.Tileset]: {
                    type: AssetType.Image,
                    key: Assets.Tileset,
                    path: worldTileset,
                },
                [Assets.Arrow]: {
                    type: AssetType.Image,
                    key: Assets.Arrow,
                    path: arrow1Icon,
                },
                [Assets.Arrow2]: {
                    type: AssetType.Image,
                    key: Assets.Arrow2,
                    path: arrow2Icon,
                },
                [Assets.Arrow3]: {
                    type: AssetType.Image,
                    key: Assets.Arrow3,
                    path: arrow3Icon,
                },
                [Assets.Armey]: {
                    type: AssetType.Image,
                    key: Assets.Armey,
                    path: armeyIcon,
                },
                [Assets.IconAtlas]:{
                    type:AssetType.MultiAtlas,
                    key:Assets.IconAtlas,
                    path:`assets/tilesets/atlas.json?timestamp=${Date.now()}`,
                    options:{
                        imagePath:"assets/tilesets",
                    }
                },
                [Assets.MainAtlas]: {
                    type: AssetType.MultiAtlas,
                    key: Assets.MainAtlas,
                    // Add a timestamp to the end of the path to prevent caching
                    path: `assets/atlases/atlas.json?timestamp=${Date.now()}`,
                    options: {
                        imagePath: "assets/atlases/",
                    },
                },
            },
            maps: {
                [Maps.Main]: mainMap,
            },
            sprites: {
                [Sprites.Soldier]: {
                    assetKey: Assets.MainAtlas,
                    frame: "sprites/soldier/idle/0.png",
                },
            },
            animations: [
                {
                    key: Animations.SwordsmanIdle,
                    assetKey: Assets.MainAtlas,
                    startFrame: 0,
                    endFrame: 3,
                    frameRate: 6,
                    repeat: -1,
                    prefix: "sprites/soldier/idle/",
                    suffix: ".png",
                },
                {
                    key: Animations.SwordsmanIdleReverse,
                    assetKey: Assets.MainAtlas,
                    startFrame: 4,
                    endFrame: 7,
                    frameRate: 6,
                    repeat: -1,
                    prefix: "sprites/soldier/idle/",
                    suffix: ".png",
                },
            ],
            tilesets: {
                Default: {
                    assetKey: Assets.Tileset,
                    tileWidth: TILE_WIDTH,
                    tileHeight: TILE_HEIGHT,
                }
            },
        }),
    },
    scale: defineScaleConfig({
        parent: "phaser-game",
        zoom: 2,
        mode: Phaser.Scale.NONE,
    }),
    cameraConfig: defineCameraConfig({
        pinchSpeed: 1,
        wheelSpeed: 1,
        maxZoom: 3,
        minZoom: 1,
    }),
    cullingChunkSize: TILE_HEIGHT * 16,
};