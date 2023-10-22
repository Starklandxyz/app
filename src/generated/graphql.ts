import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ContractAddress: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  bool: { input: any; output: any; }
  felt252: { input: any; output: any; }
  u64: { input: any; output: any; }
  u128: { input: any; output: any; }
};

export type Airdrop = {
  __typename?: 'Airdrop';
  claimed?: Maybe<Scalars['bool']['output']>;
  entity?: Maybe<Entity>;
  index?: Maybe<Scalars['u64']['output']>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
};

export type AirdropConfig = {
  __typename?: 'AirdropConfig';
  entity?: Maybe<Entity>;
  index?: Maybe<Scalars['u64']['output']>;
  map_id?: Maybe<Scalars['u64']['output']>;
  reward_food?: Maybe<Scalars['u64']['output']>;
  reward_gold?: Maybe<Scalars['u64']['output']>;
  reward_iron?: Maybe<Scalars['u64']['output']>;
  reward_warrior?: Maybe<Scalars['u64']['output']>;
};

export type AirdropConfigConnection = {
  __typename?: 'AirdropConfigConnection';
  edges?: Maybe<Array<Maybe<AirdropConfigEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type AirdropConfigEdge = {
  __typename?: 'AirdropConfigEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<AirdropConfig>;
};

export type AirdropConfigOrder = {
  direction: Direction;
  field: AirdropConfigOrderOrderField;
};

export enum AirdropConfigOrderOrderField {
  Index = 'INDEX',
  MapId = 'MAP_ID',
  RewardFood = 'REWARD_FOOD',
  RewardGold = 'REWARD_GOLD',
  RewardIron = 'REWARD_IRON',
  RewardWarrior = 'REWARD_WARRIOR'
}

export type AirdropConfigWhereInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
  indexGT?: InputMaybe<Scalars['Int']['input']>;
  indexGTE?: InputMaybe<Scalars['Int']['input']>;
  indexLT?: InputMaybe<Scalars['Int']['input']>;
  indexLTE?: InputMaybe<Scalars['Int']['input']>;
  indexNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  reward_food?: InputMaybe<Scalars['Int']['input']>;
  reward_foodGT?: InputMaybe<Scalars['Int']['input']>;
  reward_foodGTE?: InputMaybe<Scalars['Int']['input']>;
  reward_foodLT?: InputMaybe<Scalars['Int']['input']>;
  reward_foodLTE?: InputMaybe<Scalars['Int']['input']>;
  reward_foodNEQ?: InputMaybe<Scalars['Int']['input']>;
  reward_gold?: InputMaybe<Scalars['Int']['input']>;
  reward_goldGT?: InputMaybe<Scalars['Int']['input']>;
  reward_goldGTE?: InputMaybe<Scalars['Int']['input']>;
  reward_goldLT?: InputMaybe<Scalars['Int']['input']>;
  reward_goldLTE?: InputMaybe<Scalars['Int']['input']>;
  reward_goldNEQ?: InputMaybe<Scalars['Int']['input']>;
  reward_iron?: InputMaybe<Scalars['Int']['input']>;
  reward_ironGT?: InputMaybe<Scalars['Int']['input']>;
  reward_ironGTE?: InputMaybe<Scalars['Int']['input']>;
  reward_ironLT?: InputMaybe<Scalars['Int']['input']>;
  reward_ironLTE?: InputMaybe<Scalars['Int']['input']>;
  reward_ironNEQ?: InputMaybe<Scalars['Int']['input']>;
  reward_warrior?: InputMaybe<Scalars['Int']['input']>;
  reward_warriorGT?: InputMaybe<Scalars['Int']['input']>;
  reward_warriorGTE?: InputMaybe<Scalars['Int']['input']>;
  reward_warriorLT?: InputMaybe<Scalars['Int']['input']>;
  reward_warriorLTE?: InputMaybe<Scalars['Int']['input']>;
  reward_warriorNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type AirdropConnection = {
  __typename?: 'AirdropConnection';
  edges?: Maybe<Array<Maybe<AirdropEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type AirdropEdge = {
  __typename?: 'AirdropEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Airdrop>;
};

export type AirdropOrder = {
  direction: Direction;
  field: AirdropOrderOrderField;
};

export enum AirdropOrderOrderField {
  Claimed = 'CLAIMED',
  Index = 'INDEX',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type AirdropWhereInput = {
  claimed?: InputMaybe<Scalars['Int']['input']>;
  claimedGT?: InputMaybe<Scalars['Int']['input']>;
  claimedGTE?: InputMaybe<Scalars['Int']['input']>;
  claimedLT?: InputMaybe<Scalars['Int']['input']>;
  claimedLTE?: InputMaybe<Scalars['Int']['input']>;
  claimedNEQ?: InputMaybe<Scalars['Int']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  indexGT?: InputMaybe<Scalars['Int']['input']>;
  indexGTE?: InputMaybe<Scalars['Int']['input']>;
  indexLT?: InputMaybe<Scalars['Int']['input']>;
  indexLTE?: InputMaybe<Scalars['Int']['input']>;
  indexNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type Base = {
  __typename?: 'Base';
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  x?: Maybe<Scalars['u64']['output']>;
  y?: Maybe<Scalars['u64']['output']>;
};

export type BaseConnection = {
  __typename?: 'BaseConnection';
  edges?: Maybe<Array<Maybe<BaseEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type BaseEdge = {
  __typename?: 'BaseEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Base>;
};

export type BaseOrder = {
  direction: Direction;
  field: BaseOrderOrderField;
};

export enum BaseOrderOrderField {
  MapId = 'MAP_ID',
  Owner = 'OWNER',
  X = 'X',
  Y = 'Y'
}

export type BaseWhereInput = {
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['Int']['input']>;
  xGT?: InputMaybe<Scalars['Int']['input']>;
  xGTE?: InputMaybe<Scalars['Int']['input']>;
  xLT?: InputMaybe<Scalars['Int']['input']>;
  xLTE?: InputMaybe<Scalars['Int']['input']>;
  xNEQ?: InputMaybe<Scalars['Int']['input']>;
  y?: InputMaybe<Scalars['Int']['input']>;
  yGT?: InputMaybe<Scalars['Int']['input']>;
  yGTE?: InputMaybe<Scalars['Int']['input']>;
  yLT?: InputMaybe<Scalars['Int']['input']>;
  yLTE?: InputMaybe<Scalars['Int']['input']>;
  yNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type BuildConfig = {
  __typename?: 'BuildConfig';
  Build_Type_Base?: Maybe<Scalars['u64']['output']>;
  Build_Type_Camp?: Maybe<Scalars['u64']['output']>;
  Build_Type_Farmland?: Maybe<Scalars['u64']['output']>;
  Build_Type_Fort?: Maybe<Scalars['u64']['output']>;
  Build_Type_GoldMine?: Maybe<Scalars['u64']['output']>;
  Build_Type_IronMine?: Maybe<Scalars['u64']['output']>;
  Land_Gold?: Maybe<Scalars['u64']['output']>;
  Land_Iron?: Maybe<Scalars['u64']['output']>;
  Land_None?: Maybe<Scalars['u64']['output']>;
  Land_Water?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
};

export type BuildConfigConnection = {
  __typename?: 'BuildConfigConnection';
  edges?: Maybe<Array<Maybe<BuildConfigEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type BuildConfigEdge = {
  __typename?: 'BuildConfigEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<BuildConfig>;
};

export type BuildConfigOrder = {
  direction: Direction;
  field: BuildConfigOrderOrderField;
};

export enum BuildConfigOrderOrderField {
  BuildTypeBase = 'BUILD_TYPE_BASE',
  BuildTypeCamp = 'BUILD_TYPE_CAMP',
  BuildTypeFarmland = 'BUILD_TYPE_FARMLAND',
  BuildTypeFort = 'BUILD_TYPE_FORT',
  BuildTypeGoldmine = 'BUILD_TYPE_GOLDMINE',
  BuildTypeIronmine = 'BUILD_TYPE_IRONMINE',
  LandGold = 'LAND_GOLD',
  LandIron = 'LAND_IRON',
  LandNone = 'LAND_NONE',
  LandWater = 'LAND_WATER',
  MapId = 'MAP_ID'
}

export type BuildConfigWhereInput = {
  Build_Type_Base?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_BaseGT?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_BaseGTE?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_BaseLT?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_BaseLTE?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_BaseNEQ?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_Camp?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_CampGT?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_CampGTE?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_CampLT?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_CampLTE?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_CampNEQ?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_Farmland?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_FarmlandGT?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_FarmlandGTE?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_FarmlandLT?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_FarmlandLTE?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_FarmlandNEQ?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_Fort?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_FortGT?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_FortGTE?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_FortLT?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_FortLTE?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_FortNEQ?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_GoldMine?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_GoldMineGT?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_GoldMineGTE?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_GoldMineLT?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_GoldMineLTE?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_GoldMineNEQ?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_IronMine?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_IronMineGT?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_IronMineGTE?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_IronMineLT?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_IronMineLTE?: InputMaybe<Scalars['Int']['input']>;
  Build_Type_IronMineNEQ?: InputMaybe<Scalars['Int']['input']>;
  Land_Gold?: InputMaybe<Scalars['Int']['input']>;
  Land_GoldGT?: InputMaybe<Scalars['Int']['input']>;
  Land_GoldGTE?: InputMaybe<Scalars['Int']['input']>;
  Land_GoldLT?: InputMaybe<Scalars['Int']['input']>;
  Land_GoldLTE?: InputMaybe<Scalars['Int']['input']>;
  Land_GoldNEQ?: InputMaybe<Scalars['Int']['input']>;
  Land_Iron?: InputMaybe<Scalars['Int']['input']>;
  Land_IronGT?: InputMaybe<Scalars['Int']['input']>;
  Land_IronGTE?: InputMaybe<Scalars['Int']['input']>;
  Land_IronLT?: InputMaybe<Scalars['Int']['input']>;
  Land_IronLTE?: InputMaybe<Scalars['Int']['input']>;
  Land_IronNEQ?: InputMaybe<Scalars['Int']['input']>;
  Land_None?: InputMaybe<Scalars['Int']['input']>;
  Land_NoneGT?: InputMaybe<Scalars['Int']['input']>;
  Land_NoneGTE?: InputMaybe<Scalars['Int']['input']>;
  Land_NoneLT?: InputMaybe<Scalars['Int']['input']>;
  Land_NoneLTE?: InputMaybe<Scalars['Int']['input']>;
  Land_NoneNEQ?: InputMaybe<Scalars['Int']['input']>;
  Land_Water?: InputMaybe<Scalars['Int']['input']>;
  Land_WaterGT?: InputMaybe<Scalars['Int']['input']>;
  Land_WaterGTE?: InputMaybe<Scalars['Int']['input']>;
  Land_WaterLT?: InputMaybe<Scalars['Int']['input']>;
  Land_WaterLTE?: InputMaybe<Scalars['Int']['input']>;
  Land_WaterNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type BuildPrice = {
  __typename?: 'BuildPrice';
  build_type?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  food?: Maybe<Scalars['u64']['output']>;
  gold?: Maybe<Scalars['u64']['output']>;
  iron?: Maybe<Scalars['u64']['output']>;
  map_id?: Maybe<Scalars['u64']['output']>;
};

export type BuildPriceConnection = {
  __typename?: 'BuildPriceConnection';
  edges?: Maybe<Array<Maybe<BuildPriceEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type BuildPriceEdge = {
  __typename?: 'BuildPriceEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<BuildPrice>;
};

export type BuildPriceOrder = {
  direction: Direction;
  field: BuildPriceOrderOrderField;
};

export enum BuildPriceOrderOrderField {
  BuildType = 'BUILD_TYPE',
  Food = 'FOOD',
  Gold = 'GOLD',
  Iron = 'IRON',
  MapId = 'MAP_ID'
}

export type BuildPriceWhereInput = {
  build_type?: InputMaybe<Scalars['Int']['input']>;
  build_typeGT?: InputMaybe<Scalars['Int']['input']>;
  build_typeGTE?: InputMaybe<Scalars['Int']['input']>;
  build_typeLT?: InputMaybe<Scalars['Int']['input']>;
  build_typeLTE?: InputMaybe<Scalars['Int']['input']>;
  build_typeNEQ?: InputMaybe<Scalars['Int']['input']>;
  food?: InputMaybe<Scalars['Int']['input']>;
  foodGT?: InputMaybe<Scalars['Int']['input']>;
  foodGTE?: InputMaybe<Scalars['Int']['input']>;
  foodLT?: InputMaybe<Scalars['Int']['input']>;
  foodLTE?: InputMaybe<Scalars['Int']['input']>;
  foodNEQ?: InputMaybe<Scalars['Int']['input']>;
  gold?: InputMaybe<Scalars['Int']['input']>;
  goldGT?: InputMaybe<Scalars['Int']['input']>;
  goldGTE?: InputMaybe<Scalars['Int']['input']>;
  goldLT?: InputMaybe<Scalars['Int']['input']>;
  goldLTE?: InputMaybe<Scalars['Int']['input']>;
  goldNEQ?: InputMaybe<Scalars['Int']['input']>;
  iron?: InputMaybe<Scalars['Int']['input']>;
  ironGT?: InputMaybe<Scalars['Int']['input']>;
  ironGTE?: InputMaybe<Scalars['Int']['input']>;
  ironLT?: InputMaybe<Scalars['Int']['input']>;
  ironLTE?: InputMaybe<Scalars['Int']['input']>;
  ironNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Component = {
  __typename?: 'Component';
  classHash?: Maybe<Scalars['felt252']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type ComponentConnection = {
  __typename?: 'ComponentConnection';
  edges?: Maybe<Array<Maybe<ComponentEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type ComponentEdge = {
  __typename?: 'ComponentEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Component>;
};

export type ComponentUnion = Airdrop | AirdropConfig | Base | BuildConfig | BuildPrice | Eth | Fight | Food | FortOwner | GlobalConfig | Gold | Iron | Land | LandCost | LandMiner | LandMining | LandOwner | LuckyPack | MiningConfig | Player | RewardPoint | Training | Troop | UpgradeCost | UserWarrior | Warrior | WarriorConfig;

export enum Direction {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Eth = {
  __typename?: 'ETH';
  balance?: Maybe<Scalars['u128']['output']>;
  entity?: Maybe<Entity>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
};

export type EthConnection = {
  __typename?: 'ETHConnection';
  edges?: Maybe<Array<Maybe<EthEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type EthEdge = {
  __typename?: 'ETHEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Eth>;
};

export type EthOrder = {
  direction: Direction;
  field: EthOrderOrderField;
};

export enum EthOrderOrderField {
  Balance = 'BALANCE',
  Owner = 'OWNER'
}

export type EthWhereInput = {
  balance?: InputMaybe<Scalars['String']['input']>;
  balanceGT?: InputMaybe<Scalars['String']['input']>;
  balanceGTE?: InputMaybe<Scalars['String']['input']>;
  balanceLT?: InputMaybe<Scalars['String']['input']>;
  balanceLTE?: InputMaybe<Scalars['String']['input']>;
  balanceNEQ?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type Entity = {
  __typename?: 'Entity';
  componentNames?: Maybe<Scalars['String']['output']>;
  components?: Maybe<Array<Maybe<ComponentUnion>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EntityConnection = {
  __typename?: 'EntityConnection';
  edges?: Maybe<Array<Maybe<EntityEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type EntityEdge = {
  __typename?: 'EntityEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Entity>;
};

export type Event = {
  __typename?: 'Event';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Scalars['String']['output']>;
  systemCall: SystemCall;
  systemCallId?: Maybe<Scalars['Int']['output']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Event>;
};

export type Fight = {
  __typename?: 'Fight';
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  out?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  total?: Maybe<Scalars['u64']['output']>;
};

export type FightConnection = {
  __typename?: 'FightConnection';
  edges?: Maybe<Array<Maybe<FightEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type FightEdge = {
  __typename?: 'FightEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Fight>;
};

export type FightOrder = {
  direction: Direction;
  field: FightOrderOrderField;
};

export enum FightOrderOrderField {
  MapId = 'MAP_ID',
  Out = 'OUT',
  Owner = 'OWNER',
  Total = 'TOTAL'
}

export type FightWhereInput = {
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  out?: InputMaybe<Scalars['Int']['input']>;
  outGT?: InputMaybe<Scalars['Int']['input']>;
  outGTE?: InputMaybe<Scalars['Int']['input']>;
  outLT?: InputMaybe<Scalars['Int']['input']>;
  outLTE?: InputMaybe<Scalars['Int']['input']>;
  outNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
  total?: InputMaybe<Scalars['Int']['input']>;
  totalGT?: InputMaybe<Scalars['Int']['input']>;
  totalGTE?: InputMaybe<Scalars['Int']['input']>;
  totalLT?: InputMaybe<Scalars['Int']['input']>;
  totalLTE?: InputMaybe<Scalars['Int']['input']>;
  totalNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Food = {
  __typename?: 'Food';
  balance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
};

export type FoodConnection = {
  __typename?: 'FoodConnection';
  edges?: Maybe<Array<Maybe<FoodEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type FoodEdge = {
  __typename?: 'FoodEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Food>;
};

export type FoodOrder = {
  direction: Direction;
  field: FoodOrderOrderField;
};

export enum FoodOrderOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type FoodWhereInput = {
  balance?: InputMaybe<Scalars['Int']['input']>;
  balanceGT?: InputMaybe<Scalars['Int']['input']>;
  balanceGTE?: InputMaybe<Scalars['Int']['input']>;
  balanceLT?: InputMaybe<Scalars['Int']['input']>;
  balanceLTE?: InputMaybe<Scalars['Int']['input']>;
  balanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type FortOwner = {
  __typename?: 'FortOwner';
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  total?: Maybe<Scalars['u64']['output']>;
};

export type FortOwnerConnection = {
  __typename?: 'FortOwnerConnection';
  edges?: Maybe<Array<Maybe<FortOwnerEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type FortOwnerEdge = {
  __typename?: 'FortOwnerEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<FortOwner>;
};

export type FortOwnerOrder = {
  direction: Direction;
  field: FortOwnerOrderOrderField;
};

export enum FortOwnerOrderOrderField {
  MapId = 'MAP_ID',
  Owner = 'OWNER',
  Total = 'TOTAL'
}

export type FortOwnerWhereInput = {
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
  total?: InputMaybe<Scalars['Int']['input']>;
  totalGT?: InputMaybe<Scalars['Int']['input']>;
  totalGTE?: InputMaybe<Scalars['Int']['input']>;
  totalLT?: InputMaybe<Scalars['Int']['input']>;
  totalLTE?: InputMaybe<Scalars['Int']['input']>;
  totalNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type GlobalConfig = {
  __typename?: 'GlobalConfig';
  MAX_MAP_X?: Maybe<Scalars['u64']['output']>;
  MAX_MAP_Y?: Maybe<Scalars['u64']['output']>;
  MULTIPLIER?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
};

export type GlobalConfigConnection = {
  __typename?: 'GlobalConfigConnection';
  edges?: Maybe<Array<Maybe<GlobalConfigEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type GlobalConfigEdge = {
  __typename?: 'GlobalConfigEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<GlobalConfig>;
};

export type GlobalConfigOrder = {
  direction: Direction;
  field: GlobalConfigOrderOrderField;
};

export enum GlobalConfigOrderOrderField {
  MapId = 'MAP_ID',
  MaxMapX = 'MAX_MAP_X',
  MaxMapY = 'MAX_MAP_Y',
  Multiplier = 'MULTIPLIER'
}

export type GlobalConfigWhereInput = {
  MAX_MAP_X?: InputMaybe<Scalars['Int']['input']>;
  MAX_MAP_XGT?: InputMaybe<Scalars['Int']['input']>;
  MAX_MAP_XGTE?: InputMaybe<Scalars['Int']['input']>;
  MAX_MAP_XLT?: InputMaybe<Scalars['Int']['input']>;
  MAX_MAP_XLTE?: InputMaybe<Scalars['Int']['input']>;
  MAX_MAP_XNEQ?: InputMaybe<Scalars['Int']['input']>;
  MAX_MAP_Y?: InputMaybe<Scalars['Int']['input']>;
  MAX_MAP_YGT?: InputMaybe<Scalars['Int']['input']>;
  MAX_MAP_YGTE?: InputMaybe<Scalars['Int']['input']>;
  MAX_MAP_YLT?: InputMaybe<Scalars['Int']['input']>;
  MAX_MAP_YLTE?: InputMaybe<Scalars['Int']['input']>;
  MAX_MAP_YNEQ?: InputMaybe<Scalars['Int']['input']>;
  MULTIPLIER?: InputMaybe<Scalars['Int']['input']>;
  MULTIPLIERGT?: InputMaybe<Scalars['Int']['input']>;
  MULTIPLIERGTE?: InputMaybe<Scalars['Int']['input']>;
  MULTIPLIERLT?: InputMaybe<Scalars['Int']['input']>;
  MULTIPLIERLTE?: InputMaybe<Scalars['Int']['input']>;
  MULTIPLIERNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Gold = {
  __typename?: 'Gold';
  balance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
};

export type GoldConnection = {
  __typename?: 'GoldConnection';
  edges?: Maybe<Array<Maybe<GoldEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type GoldEdge = {
  __typename?: 'GoldEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Gold>;
};

export type GoldOrder = {
  direction: Direction;
  field: GoldOrderOrderField;
};

export enum GoldOrderOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type GoldWhereInput = {
  balance?: InputMaybe<Scalars['Int']['input']>;
  balanceGT?: InputMaybe<Scalars['Int']['input']>;
  balanceGTE?: InputMaybe<Scalars['Int']['input']>;
  balanceLT?: InputMaybe<Scalars['Int']['input']>;
  balanceLTE?: InputMaybe<Scalars['Int']['input']>;
  balanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type Iron = {
  __typename?: 'Iron';
  balance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
};

export type IronConnection = {
  __typename?: 'IronConnection';
  edges?: Maybe<Array<Maybe<IronEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type IronEdge = {
  __typename?: 'IronEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Iron>;
};

export type IronOrder = {
  direction: Direction;
  field: IronOrderOrderField;
};

export enum IronOrderOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type IronWhereInput = {
  balance?: InputMaybe<Scalars['Int']['input']>;
  balanceGT?: InputMaybe<Scalars['Int']['input']>;
  balanceGTE?: InputMaybe<Scalars['Int']['input']>;
  balanceLT?: InputMaybe<Scalars['Int']['input']>;
  balanceLTE?: InputMaybe<Scalars['Int']['input']>;
  balanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type Land = {
  __typename?: 'Land';
  building?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  level?: Maybe<Scalars['u64']['output']>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  x?: Maybe<Scalars['u64']['output']>;
  y?: Maybe<Scalars['u64']['output']>;
};

export type LandConnection = {
  __typename?: 'LandConnection';
  edges?: Maybe<Array<Maybe<LandEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type LandCost = {
  __typename?: 'LandCost';
  cost_food?: Maybe<Scalars['u64']['output']>;
  cost_gold?: Maybe<Scalars['u64']['output']>;
  cost_iron?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  x?: Maybe<Scalars['u64']['output']>;
  y?: Maybe<Scalars['u64']['output']>;
};

export type LandCostConnection = {
  __typename?: 'LandCostConnection';
  edges?: Maybe<Array<Maybe<LandCostEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type LandCostEdge = {
  __typename?: 'LandCostEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<LandCost>;
};

export type LandCostOrder = {
  direction: Direction;
  field: LandCostOrderOrderField;
};

export enum LandCostOrderOrderField {
  CostFood = 'COST_FOOD',
  CostGold = 'COST_GOLD',
  CostIron = 'COST_IRON',
  MapId = 'MAP_ID',
  X = 'X',
  Y = 'Y'
}

export type LandCostWhereInput = {
  cost_food?: InputMaybe<Scalars['Int']['input']>;
  cost_foodGT?: InputMaybe<Scalars['Int']['input']>;
  cost_foodGTE?: InputMaybe<Scalars['Int']['input']>;
  cost_foodLT?: InputMaybe<Scalars['Int']['input']>;
  cost_foodLTE?: InputMaybe<Scalars['Int']['input']>;
  cost_foodNEQ?: InputMaybe<Scalars['Int']['input']>;
  cost_gold?: InputMaybe<Scalars['Int']['input']>;
  cost_goldGT?: InputMaybe<Scalars['Int']['input']>;
  cost_goldGTE?: InputMaybe<Scalars['Int']['input']>;
  cost_goldLT?: InputMaybe<Scalars['Int']['input']>;
  cost_goldLTE?: InputMaybe<Scalars['Int']['input']>;
  cost_goldNEQ?: InputMaybe<Scalars['Int']['input']>;
  cost_iron?: InputMaybe<Scalars['Int']['input']>;
  cost_ironGT?: InputMaybe<Scalars['Int']['input']>;
  cost_ironGTE?: InputMaybe<Scalars['Int']['input']>;
  cost_ironLT?: InputMaybe<Scalars['Int']['input']>;
  cost_ironLTE?: InputMaybe<Scalars['Int']['input']>;
  cost_ironNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  x?: InputMaybe<Scalars['Int']['input']>;
  xGT?: InputMaybe<Scalars['Int']['input']>;
  xGTE?: InputMaybe<Scalars['Int']['input']>;
  xLT?: InputMaybe<Scalars['Int']['input']>;
  xLTE?: InputMaybe<Scalars['Int']['input']>;
  xNEQ?: InputMaybe<Scalars['Int']['input']>;
  y?: InputMaybe<Scalars['Int']['input']>;
  yGT?: InputMaybe<Scalars['Int']['input']>;
  yGTE?: InputMaybe<Scalars['Int']['input']>;
  yLT?: InputMaybe<Scalars['Int']['input']>;
  yLTE?: InputMaybe<Scalars['Int']['input']>;
  yNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type LandEdge = {
  __typename?: 'LandEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Land>;
};

export type LandMiner = {
  __typename?: 'LandMiner';
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  miner_x?: Maybe<Scalars['u64']['output']>;
  miner_y?: Maybe<Scalars['u64']['output']>;
  x?: Maybe<Scalars['u64']['output']>;
  y?: Maybe<Scalars['u64']['output']>;
};

export type LandMinerConnection = {
  __typename?: 'LandMinerConnection';
  edges?: Maybe<Array<Maybe<LandMinerEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type LandMinerEdge = {
  __typename?: 'LandMinerEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<LandMiner>;
};

export type LandMinerOrder = {
  direction: Direction;
  field: LandMinerOrderOrderField;
};

export enum LandMinerOrderOrderField {
  MapId = 'MAP_ID',
  MinerX = 'MINER_X',
  MinerY = 'MINER_Y',
  X = 'X',
  Y = 'Y'
}

export type LandMinerWhereInput = {
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  miner_x?: InputMaybe<Scalars['Int']['input']>;
  miner_xGT?: InputMaybe<Scalars['Int']['input']>;
  miner_xGTE?: InputMaybe<Scalars['Int']['input']>;
  miner_xLT?: InputMaybe<Scalars['Int']['input']>;
  miner_xLTE?: InputMaybe<Scalars['Int']['input']>;
  miner_xNEQ?: InputMaybe<Scalars['Int']['input']>;
  miner_y?: InputMaybe<Scalars['Int']['input']>;
  miner_yGT?: InputMaybe<Scalars['Int']['input']>;
  miner_yGTE?: InputMaybe<Scalars['Int']['input']>;
  miner_yLT?: InputMaybe<Scalars['Int']['input']>;
  miner_yLTE?: InputMaybe<Scalars['Int']['input']>;
  miner_yNEQ?: InputMaybe<Scalars['Int']['input']>;
  x?: InputMaybe<Scalars['Int']['input']>;
  xGT?: InputMaybe<Scalars['Int']['input']>;
  xGTE?: InputMaybe<Scalars['Int']['input']>;
  xLT?: InputMaybe<Scalars['Int']['input']>;
  xLTE?: InputMaybe<Scalars['Int']['input']>;
  xNEQ?: InputMaybe<Scalars['Int']['input']>;
  y?: InputMaybe<Scalars['Int']['input']>;
  yGT?: InputMaybe<Scalars['Int']['input']>;
  yGTE?: InputMaybe<Scalars['Int']['input']>;
  yLT?: InputMaybe<Scalars['Int']['input']>;
  yLTE?: InputMaybe<Scalars['Int']['input']>;
  yNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type LandMining = {
  __typename?: 'LandMining';
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  mined_x?: Maybe<Scalars['u64']['output']>;
  mined_y?: Maybe<Scalars['u64']['output']>;
  start_time?: Maybe<Scalars['u64']['output']>;
  x?: Maybe<Scalars['u64']['output']>;
  y?: Maybe<Scalars['u64']['output']>;
};

export type LandMiningConnection = {
  __typename?: 'LandMiningConnection';
  edges?: Maybe<Array<Maybe<LandMiningEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type LandMiningEdge = {
  __typename?: 'LandMiningEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<LandMining>;
};

export type LandMiningOrder = {
  direction: Direction;
  field: LandMiningOrderOrderField;
};

export enum LandMiningOrderOrderField {
  MapId = 'MAP_ID',
  MinedX = 'MINED_X',
  MinedY = 'MINED_Y',
  StartTime = 'START_TIME',
  X = 'X',
  Y = 'Y'
}

export type LandMiningWhereInput = {
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  mined_x?: InputMaybe<Scalars['Int']['input']>;
  mined_xGT?: InputMaybe<Scalars['Int']['input']>;
  mined_xGTE?: InputMaybe<Scalars['Int']['input']>;
  mined_xLT?: InputMaybe<Scalars['Int']['input']>;
  mined_xLTE?: InputMaybe<Scalars['Int']['input']>;
  mined_xNEQ?: InputMaybe<Scalars['Int']['input']>;
  mined_y?: InputMaybe<Scalars['Int']['input']>;
  mined_yGT?: InputMaybe<Scalars['Int']['input']>;
  mined_yGTE?: InputMaybe<Scalars['Int']['input']>;
  mined_yLT?: InputMaybe<Scalars['Int']['input']>;
  mined_yLTE?: InputMaybe<Scalars['Int']['input']>;
  mined_yNEQ?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  start_timeGT?: InputMaybe<Scalars['Int']['input']>;
  start_timeGTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeLT?: InputMaybe<Scalars['Int']['input']>;
  start_timeLTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['Int']['input']>;
  x?: InputMaybe<Scalars['Int']['input']>;
  xGT?: InputMaybe<Scalars['Int']['input']>;
  xGTE?: InputMaybe<Scalars['Int']['input']>;
  xLT?: InputMaybe<Scalars['Int']['input']>;
  xLTE?: InputMaybe<Scalars['Int']['input']>;
  xNEQ?: InputMaybe<Scalars['Int']['input']>;
  y?: InputMaybe<Scalars['Int']['input']>;
  yGT?: InputMaybe<Scalars['Int']['input']>;
  yGTE?: InputMaybe<Scalars['Int']['input']>;
  yLT?: InputMaybe<Scalars['Int']['input']>;
  yLTE?: InputMaybe<Scalars['Int']['input']>;
  yNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type LandOrder = {
  direction: Direction;
  field: LandOrderOrderField;
};

export enum LandOrderOrderField {
  Building = 'BUILDING',
  Level = 'LEVEL',
  MapId = 'MAP_ID',
  Owner = 'OWNER',
  X = 'X',
  Y = 'Y'
}

export type LandOwner = {
  __typename?: 'LandOwner';
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  total?: Maybe<Scalars['u64']['output']>;
};

export type LandOwnerConnection = {
  __typename?: 'LandOwnerConnection';
  edges?: Maybe<Array<Maybe<LandOwnerEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type LandOwnerEdge = {
  __typename?: 'LandOwnerEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<LandOwner>;
};

export type LandOwnerOrder = {
  direction: Direction;
  field: LandOwnerOrderOrderField;
};

export enum LandOwnerOrderOrderField {
  MapId = 'MAP_ID',
  Owner = 'OWNER',
  Total = 'TOTAL'
}

export type LandOwnerWhereInput = {
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
  total?: InputMaybe<Scalars['Int']['input']>;
  totalGT?: InputMaybe<Scalars['Int']['input']>;
  totalGTE?: InputMaybe<Scalars['Int']['input']>;
  totalLT?: InputMaybe<Scalars['Int']['input']>;
  totalLTE?: InputMaybe<Scalars['Int']['input']>;
  totalNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type LandWhereInput = {
  building?: InputMaybe<Scalars['Int']['input']>;
  buildingGT?: InputMaybe<Scalars['Int']['input']>;
  buildingGTE?: InputMaybe<Scalars['Int']['input']>;
  buildingLT?: InputMaybe<Scalars['Int']['input']>;
  buildingLTE?: InputMaybe<Scalars['Int']['input']>;
  buildingNEQ?: InputMaybe<Scalars['Int']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  levelGT?: InputMaybe<Scalars['Int']['input']>;
  levelGTE?: InputMaybe<Scalars['Int']['input']>;
  levelLT?: InputMaybe<Scalars['Int']['input']>;
  levelLTE?: InputMaybe<Scalars['Int']['input']>;
  levelNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['Int']['input']>;
  xGT?: InputMaybe<Scalars['Int']['input']>;
  xGTE?: InputMaybe<Scalars['Int']['input']>;
  xLT?: InputMaybe<Scalars['Int']['input']>;
  xLTE?: InputMaybe<Scalars['Int']['input']>;
  xNEQ?: InputMaybe<Scalars['Int']['input']>;
  y?: InputMaybe<Scalars['Int']['input']>;
  yGT?: InputMaybe<Scalars['Int']['input']>;
  yGTE?: InputMaybe<Scalars['Int']['input']>;
  yLT?: InputMaybe<Scalars['Int']['input']>;
  yLTE?: InputMaybe<Scalars['Int']['input']>;
  yNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type LuckyPack = {
  __typename?: 'LuckyPack';
  balance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
};

export type LuckyPackConnection = {
  __typename?: 'LuckyPackConnection';
  edges?: Maybe<Array<Maybe<LuckyPackEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type LuckyPackEdge = {
  __typename?: 'LuckyPackEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<LuckyPack>;
};

export type LuckyPackOrder = {
  direction: Direction;
  field: LuckyPackOrderOrderField;
};

export enum LuckyPackOrderOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type LuckyPackWhereInput = {
  balance?: InputMaybe<Scalars['Int']['input']>;
  balanceGT?: InputMaybe<Scalars['Int']['input']>;
  balanceGTE?: InputMaybe<Scalars['Int']['input']>;
  balanceLT?: InputMaybe<Scalars['Int']['input']>;
  balanceLTE?: InputMaybe<Scalars['Int']['input']>;
  balanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type MiningConfig = {
  __typename?: 'MiningConfig';
  Base_Gold_Speed?: Maybe<Scalars['u64']['output']>;
  Food_Speed?: Maybe<Scalars['u64']['output']>;
  Gold_Speed?: Maybe<Scalars['u64']['output']>;
  Iron_Speed?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
};

export type MiningConfigConnection = {
  __typename?: 'MiningConfigConnection';
  edges?: Maybe<Array<Maybe<MiningConfigEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type MiningConfigEdge = {
  __typename?: 'MiningConfigEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<MiningConfig>;
};

export type MiningConfigOrder = {
  direction: Direction;
  field: MiningConfigOrderOrderField;
};

export enum MiningConfigOrderOrderField {
  BaseGoldSpeed = 'BASE_GOLD_SPEED',
  FoodSpeed = 'FOOD_SPEED',
  GoldSpeed = 'GOLD_SPEED',
  IronSpeed = 'IRON_SPEED',
  MapId = 'MAP_ID'
}

export type MiningConfigWhereInput = {
  Base_Gold_Speed?: InputMaybe<Scalars['Int']['input']>;
  Base_Gold_SpeedGT?: InputMaybe<Scalars['Int']['input']>;
  Base_Gold_SpeedGTE?: InputMaybe<Scalars['Int']['input']>;
  Base_Gold_SpeedLT?: InputMaybe<Scalars['Int']['input']>;
  Base_Gold_SpeedLTE?: InputMaybe<Scalars['Int']['input']>;
  Base_Gold_SpeedNEQ?: InputMaybe<Scalars['Int']['input']>;
  Food_Speed?: InputMaybe<Scalars['Int']['input']>;
  Food_SpeedGT?: InputMaybe<Scalars['Int']['input']>;
  Food_SpeedGTE?: InputMaybe<Scalars['Int']['input']>;
  Food_SpeedLT?: InputMaybe<Scalars['Int']['input']>;
  Food_SpeedLTE?: InputMaybe<Scalars['Int']['input']>;
  Food_SpeedNEQ?: InputMaybe<Scalars['Int']['input']>;
  Gold_Speed?: InputMaybe<Scalars['Int']['input']>;
  Gold_SpeedGT?: InputMaybe<Scalars['Int']['input']>;
  Gold_SpeedGTE?: InputMaybe<Scalars['Int']['input']>;
  Gold_SpeedLT?: InputMaybe<Scalars['Int']['input']>;
  Gold_SpeedLTE?: InputMaybe<Scalars['Int']['input']>;
  Gold_SpeedNEQ?: InputMaybe<Scalars['Int']['input']>;
  Iron_Speed?: InputMaybe<Scalars['Int']['input']>;
  Iron_SpeedGT?: InputMaybe<Scalars['Int']['input']>;
  Iron_SpeedGTE?: InputMaybe<Scalars['Int']['input']>;
  Iron_SpeedLT?: InputMaybe<Scalars['Int']['input']>;
  Iron_SpeedLTE?: InputMaybe<Scalars['Int']['input']>;
  Iron_SpeedNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Player = {
  __typename?: 'Player';
  entity?: Maybe<Entity>;
  joined_time?: Maybe<Scalars['u64']['output']>;
  nick_name?: Maybe<Scalars['felt252']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
};

export type PlayerConnection = {
  __typename?: 'PlayerConnection';
  edges?: Maybe<Array<Maybe<PlayerEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type PlayerEdge = {
  __typename?: 'PlayerEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Player>;
};

export type PlayerOrder = {
  direction: Direction;
  field: PlayerOrderOrderField;
};

export enum PlayerOrderOrderField {
  JoinedTime = 'JOINED_TIME',
  NickName = 'NICK_NAME',
  Owner = 'OWNER'
}

export type PlayerWhereInput = {
  joined_time?: InputMaybe<Scalars['Int']['input']>;
  joined_timeGT?: InputMaybe<Scalars['Int']['input']>;
  joined_timeGTE?: InputMaybe<Scalars['Int']['input']>;
  joined_timeLT?: InputMaybe<Scalars['Int']['input']>;
  joined_timeLTE?: InputMaybe<Scalars['Int']['input']>;
  joined_timeNEQ?: InputMaybe<Scalars['Int']['input']>;
  nick_name?: InputMaybe<Scalars['String']['input']>;
  nick_nameGT?: InputMaybe<Scalars['String']['input']>;
  nick_nameGTE?: InputMaybe<Scalars['String']['input']>;
  nick_nameLT?: InputMaybe<Scalars['String']['input']>;
  nick_nameLTE?: InputMaybe<Scalars['String']['input']>;
  nick_nameNEQ?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  airdropComponents?: Maybe<AirdropConnection>;
  airdropconfigComponents?: Maybe<AirdropConfigConnection>;
  baseComponents?: Maybe<BaseConnection>;
  buildconfigComponents?: Maybe<BuildConfigConnection>;
  buildpriceComponents?: Maybe<BuildPriceConnection>;
  component: Component;
  components?: Maybe<ComponentConnection>;
  entities?: Maybe<EntityConnection>;
  entity: Entity;
  ethComponents?: Maybe<EthConnection>;
  event: Event;
  events?: Maybe<EventConnection>;
  fightComponents?: Maybe<FightConnection>;
  foodComponents?: Maybe<FoodConnection>;
  fortownerComponents?: Maybe<FortOwnerConnection>;
  globalconfigComponents?: Maybe<GlobalConfigConnection>;
  goldComponents?: Maybe<GoldConnection>;
  ironComponents?: Maybe<IronConnection>;
  landComponents?: Maybe<LandConnection>;
  landcostComponents?: Maybe<LandCostConnection>;
  landminerComponents?: Maybe<LandMinerConnection>;
  landminingComponents?: Maybe<LandMiningConnection>;
  landownerComponents?: Maybe<LandOwnerConnection>;
  luckypackComponents?: Maybe<LuckyPackConnection>;
  miningconfigComponents?: Maybe<MiningConfigConnection>;
  playerComponents?: Maybe<PlayerConnection>;
  rewardpointComponents?: Maybe<RewardPointConnection>;
  system: System;
  systemCall: SystemCall;
  systemCalls?: Maybe<SystemCallConnection>;
  systems?: Maybe<SystemConnection>;
  trainingComponents?: Maybe<TrainingConnection>;
  troopComponents?: Maybe<TroopConnection>;
  upgradecostComponents?: Maybe<UpgradeCostConnection>;
  userwarriorComponents?: Maybe<UserWarriorConnection>;
  warriorComponents?: Maybe<WarriorConnection>;
  warriorconfigComponents?: Maybe<WarriorConfigConnection>;
};


export type QueryAirdropComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AirdropOrder>;
  where?: InputMaybe<AirdropWhereInput>;
};


export type QueryAirdropconfigComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AirdropConfigOrder>;
  where?: InputMaybe<AirdropConfigWhereInput>;
};


export type QueryBaseComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BaseOrder>;
  where?: InputMaybe<BaseWhereInput>;
};


export type QueryBuildconfigComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BuildConfigOrder>;
  where?: InputMaybe<BuildConfigWhereInput>;
};


export type QueryBuildpriceComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BuildPriceOrder>;
  where?: InputMaybe<BuildPriceWhereInput>;
};


export type QueryComponentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEthComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<EthOrder>;
  where?: InputMaybe<EthWhereInput>;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFightComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<FightOrder>;
  where?: InputMaybe<FightWhereInput>;
};


export type QueryFoodComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<FoodOrder>;
  where?: InputMaybe<FoodWhereInput>;
};


export type QueryFortownerComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<FortOwnerOrder>;
  where?: InputMaybe<FortOwnerWhereInput>;
};


export type QueryGlobalconfigComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<GlobalConfigOrder>;
  where?: InputMaybe<GlobalConfigWhereInput>;
};


export type QueryGoldComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<GoldOrder>;
  where?: InputMaybe<GoldWhereInput>;
};


export type QueryIronComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<IronOrder>;
  where?: InputMaybe<IronWhereInput>;
};


export type QueryLandComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LandOrder>;
  where?: InputMaybe<LandWhereInput>;
};


export type QueryLandcostComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LandCostOrder>;
  where?: InputMaybe<LandCostWhereInput>;
};


export type QueryLandminerComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LandMinerOrder>;
  where?: InputMaybe<LandMinerWhereInput>;
};


export type QueryLandminingComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LandMiningOrder>;
  where?: InputMaybe<LandMiningWhereInput>;
};


export type QueryLandownerComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LandOwnerOrder>;
  where?: InputMaybe<LandOwnerWhereInput>;
};


export type QueryLuckypackComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LuckyPackOrder>;
  where?: InputMaybe<LuckyPackWhereInput>;
};


export type QueryMiningconfigComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MiningConfigOrder>;
  where?: InputMaybe<MiningConfigWhereInput>;
};


export type QueryPlayerComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<PlayerOrder>;
  where?: InputMaybe<PlayerWhereInput>;
};


export type QueryRewardpointComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<RewardPointOrder>;
  where?: InputMaybe<RewardPointWhereInput>;
};


export type QuerySystemArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTrainingComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TrainingOrder>;
  where?: InputMaybe<TrainingWhereInput>;
};


export type QueryTroopComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TroopOrder>;
  where?: InputMaybe<TroopWhereInput>;
};


export type QueryUpgradecostComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UpgradeCostOrder>;
  where?: InputMaybe<UpgradeCostWhereInput>;
};


export type QueryUserwarriorComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UserWarriorOrder>;
  where?: InputMaybe<UserWarriorWhereInput>;
};


export type QueryWarriorComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WarriorOrder>;
  where?: InputMaybe<WarriorWhereInput>;
};


export type QueryWarriorconfigComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WarriorConfigOrder>;
  where?: InputMaybe<WarriorConfigWhereInput>;
};

export type RewardPoint = {
  __typename?: 'RewardPoint';
  balance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
};

export type RewardPointConnection = {
  __typename?: 'RewardPointConnection';
  edges?: Maybe<Array<Maybe<RewardPointEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type RewardPointEdge = {
  __typename?: 'RewardPointEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<RewardPoint>;
};

export type RewardPointOrder = {
  direction: Direction;
  field: RewardPointOrderOrderField;
};

export enum RewardPointOrderOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type RewardPointWhereInput = {
  balance?: InputMaybe<Scalars['Int']['input']>;
  balanceGT?: InputMaybe<Scalars['Int']['input']>;
  balanceGTE?: InputMaybe<Scalars['Int']['input']>;
  balanceLT?: InputMaybe<Scalars['Int']['input']>;
  balanceLTE?: InputMaybe<Scalars['Int']['input']>;
  balanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  componentRegistered: Component;
  entityUpdated: Entity;
};

export type System = {
  __typename?: 'System';
  classHash?: Maybe<Scalars['felt252']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  systemCalls: Array<SystemCall>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type SystemCall = {
  __typename?: 'SystemCall';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  system: System;
  systemId?: Maybe<Scalars['ID']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type SystemCallConnection = {
  __typename?: 'SystemCallConnection';
  edges?: Maybe<Array<Maybe<SystemCallEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type SystemCallEdge = {
  __typename?: 'SystemCallEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<SystemCall>;
};

export type SystemConnection = {
  __typename?: 'SystemConnection';
  edges?: Maybe<Array<Maybe<SystemEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type SystemEdge = {
  __typename?: 'SystemEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<System>;
};

export type Training = {
  __typename?: 'Training';
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  out?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  start_time?: Maybe<Scalars['u64']['output']>;
  total?: Maybe<Scalars['u64']['output']>;
};

export type TrainingConnection = {
  __typename?: 'TrainingConnection';
  edges?: Maybe<Array<Maybe<TrainingEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type TrainingEdge = {
  __typename?: 'TrainingEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Training>;
};

export type TrainingOrder = {
  direction: Direction;
  field: TrainingOrderOrderField;
};

export enum TrainingOrderOrderField {
  MapId = 'MAP_ID',
  Out = 'OUT',
  Owner = 'OWNER',
  StartTime = 'START_TIME',
  Total = 'TOTAL'
}

export type TrainingWhereInput = {
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  out?: InputMaybe<Scalars['Int']['input']>;
  outGT?: InputMaybe<Scalars['Int']['input']>;
  outGTE?: InputMaybe<Scalars['Int']['input']>;
  outLT?: InputMaybe<Scalars['Int']['input']>;
  outLTE?: InputMaybe<Scalars['Int']['input']>;
  outNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  start_timeGT?: InputMaybe<Scalars['Int']['input']>;
  start_timeGTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeLT?: InputMaybe<Scalars['Int']['input']>;
  start_timeLTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['Int']['input']>;
  total?: InputMaybe<Scalars['Int']['input']>;
  totalGT?: InputMaybe<Scalars['Int']['input']>;
  totalGTE?: InputMaybe<Scalars['Int']['input']>;
  totalLT?: InputMaybe<Scalars['Int']['input']>;
  totalLTE?: InputMaybe<Scalars['Int']['input']>;
  totalNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Troop = {
  __typename?: 'Troop';
  balance?: Maybe<Scalars['u64']['output']>;
  distance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  from_x?: Maybe<Scalars['u64']['output']>;
  from_y?: Maybe<Scalars['u64']['output']>;
  index?: Maybe<Scalars['u64']['output']>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  retreat?: Maybe<Scalars['bool']['output']>;
  start_time?: Maybe<Scalars['u64']['output']>;
  to_x?: Maybe<Scalars['u64']['output']>;
  to_y?: Maybe<Scalars['u64']['output']>;
};

export type TroopConnection = {
  __typename?: 'TroopConnection';
  edges?: Maybe<Array<Maybe<TroopEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type TroopEdge = {
  __typename?: 'TroopEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Troop>;
};

export type TroopOrder = {
  direction: Direction;
  field: TroopOrderOrderField;
};

export enum TroopOrderOrderField {
  Balance = 'BALANCE',
  Distance = 'DISTANCE',
  FromX = 'FROM_X',
  FromY = 'FROM_Y',
  Index = 'INDEX',
  MapId = 'MAP_ID',
  Owner = 'OWNER',
  Retreat = 'RETREAT',
  StartTime = 'START_TIME',
  ToX = 'TO_X',
  ToY = 'TO_Y'
}

export type TroopWhereInput = {
  balance?: InputMaybe<Scalars['Int']['input']>;
  balanceGT?: InputMaybe<Scalars['Int']['input']>;
  balanceGTE?: InputMaybe<Scalars['Int']['input']>;
  balanceLT?: InputMaybe<Scalars['Int']['input']>;
  balanceLTE?: InputMaybe<Scalars['Int']['input']>;
  balanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  distance?: InputMaybe<Scalars['Int']['input']>;
  distanceGT?: InputMaybe<Scalars['Int']['input']>;
  distanceGTE?: InputMaybe<Scalars['Int']['input']>;
  distanceLT?: InputMaybe<Scalars['Int']['input']>;
  distanceLTE?: InputMaybe<Scalars['Int']['input']>;
  distanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  from_x?: InputMaybe<Scalars['Int']['input']>;
  from_xGT?: InputMaybe<Scalars['Int']['input']>;
  from_xGTE?: InputMaybe<Scalars['Int']['input']>;
  from_xLT?: InputMaybe<Scalars['Int']['input']>;
  from_xLTE?: InputMaybe<Scalars['Int']['input']>;
  from_xNEQ?: InputMaybe<Scalars['Int']['input']>;
  from_y?: InputMaybe<Scalars['Int']['input']>;
  from_yGT?: InputMaybe<Scalars['Int']['input']>;
  from_yGTE?: InputMaybe<Scalars['Int']['input']>;
  from_yLT?: InputMaybe<Scalars['Int']['input']>;
  from_yLTE?: InputMaybe<Scalars['Int']['input']>;
  from_yNEQ?: InputMaybe<Scalars['Int']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  indexGT?: InputMaybe<Scalars['Int']['input']>;
  indexGTE?: InputMaybe<Scalars['Int']['input']>;
  indexLT?: InputMaybe<Scalars['Int']['input']>;
  indexLTE?: InputMaybe<Scalars['Int']['input']>;
  indexNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
  retreat?: InputMaybe<Scalars['Int']['input']>;
  retreatGT?: InputMaybe<Scalars['Int']['input']>;
  retreatGTE?: InputMaybe<Scalars['Int']['input']>;
  retreatLT?: InputMaybe<Scalars['Int']['input']>;
  retreatLTE?: InputMaybe<Scalars['Int']['input']>;
  retreatNEQ?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  start_timeGT?: InputMaybe<Scalars['Int']['input']>;
  start_timeGTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeLT?: InputMaybe<Scalars['Int']['input']>;
  start_timeLTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['Int']['input']>;
  to_x?: InputMaybe<Scalars['Int']['input']>;
  to_xGT?: InputMaybe<Scalars['Int']['input']>;
  to_xGTE?: InputMaybe<Scalars['Int']['input']>;
  to_xLT?: InputMaybe<Scalars['Int']['input']>;
  to_xLTE?: InputMaybe<Scalars['Int']['input']>;
  to_xNEQ?: InputMaybe<Scalars['Int']['input']>;
  to_y?: InputMaybe<Scalars['Int']['input']>;
  to_yGT?: InputMaybe<Scalars['Int']['input']>;
  to_yGTE?: InputMaybe<Scalars['Int']['input']>;
  to_yLT?: InputMaybe<Scalars['Int']['input']>;
  to_yLTE?: InputMaybe<Scalars['Int']['input']>;
  to_yNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type UpgradeCost = {
  __typename?: 'UpgradeCost';
  claimed?: Maybe<Scalars['bool']['output']>;
  end_time?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  start_time?: Maybe<Scalars['u64']['output']>;
  target_level?: Maybe<Scalars['u64']['output']>;
  x?: Maybe<Scalars['u64']['output']>;
  y?: Maybe<Scalars['u64']['output']>;
};

export type UpgradeCostConnection = {
  __typename?: 'UpgradeCostConnection';
  edges?: Maybe<Array<Maybe<UpgradeCostEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type UpgradeCostEdge = {
  __typename?: 'UpgradeCostEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<UpgradeCost>;
};

export type UpgradeCostOrder = {
  direction: Direction;
  field: UpgradeCostOrderOrderField;
};

export enum UpgradeCostOrderOrderField {
  Claimed = 'CLAIMED',
  EndTime = 'END_TIME',
  MapId = 'MAP_ID',
  StartTime = 'START_TIME',
  TargetLevel = 'TARGET_LEVEL',
  X = 'X',
  Y = 'Y'
}

export type UpgradeCostWhereInput = {
  claimed?: InputMaybe<Scalars['Int']['input']>;
  claimedGT?: InputMaybe<Scalars['Int']['input']>;
  claimedGTE?: InputMaybe<Scalars['Int']['input']>;
  claimedLT?: InputMaybe<Scalars['Int']['input']>;
  claimedLTE?: InputMaybe<Scalars['Int']['input']>;
  claimedNEQ?: InputMaybe<Scalars['Int']['input']>;
  end_time?: InputMaybe<Scalars['Int']['input']>;
  end_timeGT?: InputMaybe<Scalars['Int']['input']>;
  end_timeGTE?: InputMaybe<Scalars['Int']['input']>;
  end_timeLT?: InputMaybe<Scalars['Int']['input']>;
  end_timeLTE?: InputMaybe<Scalars['Int']['input']>;
  end_timeNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  start_timeGT?: InputMaybe<Scalars['Int']['input']>;
  start_timeGTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeLT?: InputMaybe<Scalars['Int']['input']>;
  start_timeLTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['Int']['input']>;
  target_level?: InputMaybe<Scalars['Int']['input']>;
  target_levelGT?: InputMaybe<Scalars['Int']['input']>;
  target_levelGTE?: InputMaybe<Scalars['Int']['input']>;
  target_levelLT?: InputMaybe<Scalars['Int']['input']>;
  target_levelLTE?: InputMaybe<Scalars['Int']['input']>;
  target_levelNEQ?: InputMaybe<Scalars['Int']['input']>;
  x?: InputMaybe<Scalars['Int']['input']>;
  xGT?: InputMaybe<Scalars['Int']['input']>;
  xGTE?: InputMaybe<Scalars['Int']['input']>;
  xLT?: InputMaybe<Scalars['Int']['input']>;
  xLTE?: InputMaybe<Scalars['Int']['input']>;
  xNEQ?: InputMaybe<Scalars['Int']['input']>;
  y?: InputMaybe<Scalars['Int']['input']>;
  yGT?: InputMaybe<Scalars['Int']['input']>;
  yGTE?: InputMaybe<Scalars['Int']['input']>;
  yLT?: InputMaybe<Scalars['Int']['input']>;
  yLTE?: InputMaybe<Scalars['Int']['input']>;
  yNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type UserWarrior = {
  __typename?: 'UserWarrior';
  balance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
};

export type UserWarriorConnection = {
  __typename?: 'UserWarriorConnection';
  edges?: Maybe<Array<Maybe<UserWarriorEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type UserWarriorEdge = {
  __typename?: 'UserWarriorEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<UserWarrior>;
};

export type UserWarriorOrder = {
  direction: Direction;
  field: UserWarriorOrderOrderField;
};

export enum UserWarriorOrderOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type UserWarriorWhereInput = {
  balance?: InputMaybe<Scalars['Int']['input']>;
  balanceGT?: InputMaybe<Scalars['Int']['input']>;
  balanceGTE?: InputMaybe<Scalars['Int']['input']>;
  balanceLT?: InputMaybe<Scalars['Int']['input']>;
  balanceLTE?: InputMaybe<Scalars['Int']['input']>;
  balanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type Warrior = {
  __typename?: 'Warrior';
  balance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  x?: Maybe<Scalars['u64']['output']>;
  y?: Maybe<Scalars['u64']['output']>;
};

export type WarriorConfig = {
  __typename?: 'WarriorConfig';
  Train_Food?: Maybe<Scalars['u64']['output']>;
  Train_Gold?: Maybe<Scalars['u64']['output']>;
  Train_Iron?: Maybe<Scalars['u64']['output']>;
  Train_Time?: Maybe<Scalars['u64']['output']>;
  Troop_Food?: Maybe<Scalars['u64']['output']>;
  Troop_Gold?: Maybe<Scalars['u64']['output']>;
  Troop_Iron?: Maybe<Scalars['u64']['output']>;
  Troop_Speed?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
};

export type WarriorConfigConnection = {
  __typename?: 'WarriorConfigConnection';
  edges?: Maybe<Array<Maybe<WarriorConfigEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type WarriorConfigEdge = {
  __typename?: 'WarriorConfigEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<WarriorConfig>;
};

export type WarriorConfigOrder = {
  direction: Direction;
  field: WarriorConfigOrderOrderField;
};

export enum WarriorConfigOrderOrderField {
  MapId = 'MAP_ID',
  TrainFood = 'TRAIN_FOOD',
  TrainGold = 'TRAIN_GOLD',
  TrainIron = 'TRAIN_IRON',
  TrainTime = 'TRAIN_TIME',
  TroopFood = 'TROOP_FOOD',
  TroopGold = 'TROOP_GOLD',
  TroopIron = 'TROOP_IRON',
  TroopSpeed = 'TROOP_SPEED'
}

export type WarriorConfigWhereInput = {
  Train_Food?: InputMaybe<Scalars['Int']['input']>;
  Train_FoodGT?: InputMaybe<Scalars['Int']['input']>;
  Train_FoodGTE?: InputMaybe<Scalars['Int']['input']>;
  Train_FoodLT?: InputMaybe<Scalars['Int']['input']>;
  Train_FoodLTE?: InputMaybe<Scalars['Int']['input']>;
  Train_FoodNEQ?: InputMaybe<Scalars['Int']['input']>;
  Train_Gold?: InputMaybe<Scalars['Int']['input']>;
  Train_GoldGT?: InputMaybe<Scalars['Int']['input']>;
  Train_GoldGTE?: InputMaybe<Scalars['Int']['input']>;
  Train_GoldLT?: InputMaybe<Scalars['Int']['input']>;
  Train_GoldLTE?: InputMaybe<Scalars['Int']['input']>;
  Train_GoldNEQ?: InputMaybe<Scalars['Int']['input']>;
  Train_Iron?: InputMaybe<Scalars['Int']['input']>;
  Train_IronGT?: InputMaybe<Scalars['Int']['input']>;
  Train_IronGTE?: InputMaybe<Scalars['Int']['input']>;
  Train_IronLT?: InputMaybe<Scalars['Int']['input']>;
  Train_IronLTE?: InputMaybe<Scalars['Int']['input']>;
  Train_IronNEQ?: InputMaybe<Scalars['Int']['input']>;
  Train_Time?: InputMaybe<Scalars['Int']['input']>;
  Train_TimeGT?: InputMaybe<Scalars['Int']['input']>;
  Train_TimeGTE?: InputMaybe<Scalars['Int']['input']>;
  Train_TimeLT?: InputMaybe<Scalars['Int']['input']>;
  Train_TimeLTE?: InputMaybe<Scalars['Int']['input']>;
  Train_TimeNEQ?: InputMaybe<Scalars['Int']['input']>;
  Troop_Food?: InputMaybe<Scalars['Int']['input']>;
  Troop_FoodGT?: InputMaybe<Scalars['Int']['input']>;
  Troop_FoodGTE?: InputMaybe<Scalars['Int']['input']>;
  Troop_FoodLT?: InputMaybe<Scalars['Int']['input']>;
  Troop_FoodLTE?: InputMaybe<Scalars['Int']['input']>;
  Troop_FoodNEQ?: InputMaybe<Scalars['Int']['input']>;
  Troop_Gold?: InputMaybe<Scalars['Int']['input']>;
  Troop_GoldGT?: InputMaybe<Scalars['Int']['input']>;
  Troop_GoldGTE?: InputMaybe<Scalars['Int']['input']>;
  Troop_GoldLT?: InputMaybe<Scalars['Int']['input']>;
  Troop_GoldLTE?: InputMaybe<Scalars['Int']['input']>;
  Troop_GoldNEQ?: InputMaybe<Scalars['Int']['input']>;
  Troop_Iron?: InputMaybe<Scalars['Int']['input']>;
  Troop_IronGT?: InputMaybe<Scalars['Int']['input']>;
  Troop_IronGTE?: InputMaybe<Scalars['Int']['input']>;
  Troop_IronLT?: InputMaybe<Scalars['Int']['input']>;
  Troop_IronLTE?: InputMaybe<Scalars['Int']['input']>;
  Troop_IronNEQ?: InputMaybe<Scalars['Int']['input']>;
  Troop_Speed?: InputMaybe<Scalars['Int']['input']>;
  Troop_SpeedGT?: InputMaybe<Scalars['Int']['input']>;
  Troop_SpeedGTE?: InputMaybe<Scalars['Int']['input']>;
  Troop_SpeedLT?: InputMaybe<Scalars['Int']['input']>;
  Troop_SpeedLTE?: InputMaybe<Scalars['Int']['input']>;
  Troop_SpeedNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type WarriorConnection = {
  __typename?: 'WarriorConnection';
  edges?: Maybe<Array<Maybe<WarriorEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type WarriorEdge = {
  __typename?: 'WarriorEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Warrior>;
};

export type WarriorOrder = {
  direction: Direction;
  field: WarriorOrderOrderField;
};

export enum WarriorOrderOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  X = 'X',
  Y = 'Y'
}

export type WarriorWhereInput = {
  balance?: InputMaybe<Scalars['Int']['input']>;
  balanceGT?: InputMaybe<Scalars['Int']['input']>;
  balanceGTE?: InputMaybe<Scalars['Int']['input']>;
  balanceLT?: InputMaybe<Scalars['Int']['input']>;
  balanceLTE?: InputMaybe<Scalars['Int']['input']>;
  balanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  map_id?: InputMaybe<Scalars['Int']['input']>;
  map_idGT?: InputMaybe<Scalars['Int']['input']>;
  map_idGTE?: InputMaybe<Scalars['Int']['input']>;
  map_idLT?: InputMaybe<Scalars['Int']['input']>;
  map_idLTE?: InputMaybe<Scalars['Int']['input']>;
  map_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  x?: InputMaybe<Scalars['Int']['input']>;
  xGT?: InputMaybe<Scalars['Int']['input']>;
  xGTE?: InputMaybe<Scalars['Int']['input']>;
  xLT?: InputMaybe<Scalars['Int']['input']>;
  xLTE?: InputMaybe<Scalars['Int']['input']>;
  xNEQ?: InputMaybe<Scalars['Int']['input']>;
  y?: InputMaybe<Scalars['Int']['input']>;
  yGT?: InputMaybe<Scalars['Int']['input']>;
  yGTE?: InputMaybe<Scalars['Int']['input']>;
  yLT?: InputMaybe<Scalars['Int']['input']>;
  yLTE?: InputMaybe<Scalars['Int']['input']>;
  yNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type GetAllPlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPlayersQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH', owner?: any | null, balance?: any | null } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player', owner?: any | null, nick_name?: any | null, joined_time?: any | null } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetAirdropByKeyQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAirdropByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop', map_id?: any | null, owner?: any | null, index?: any | null, claimed?: any | null } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetBaseByKeyQueryVariables = Exact<{
  key?: InputMaybe<Scalars['String']['input']>;
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBaseByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base', map_id?: any | null, owner?: any | null, x?: any | null, y?: any | null } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner', map_id?: any | null, owner?: any | null, total?: any | null } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetUserWarriorByKeyQueryVariables = Exact<{
  key?: InputMaybe<Scalars['String']['input']>;
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserWarriorByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetWarriorConfigQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetWarriorConfigQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig', map_id?: any | null, Train_Food?: any | null, Train_Gold?: any | null, Train_Iron?: any | null, Train_Time?: any | null, Troop_Food?: any | null, Troop_Iron?: any | null, Troop_Gold?: any | null, Troop_Speed?: any | null } | null> | null } | null } | null> | null } | null };

export type GetAirdropConfigQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAirdropConfigQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig', map_id?: any | null, index?: any | null, reward_warrior?: any | null, reward_food?: any | null, reward_gold?: any | null, reward_iron?: any | null } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetWarriorByLocationQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  y?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetWarriorByLocationQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior', x?: any | null, y?: any | null, balance?: any | null } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetTrainingByKeyQueryVariables = Exact<{
  key?: InputMaybe<Scalars['String']['input']>;
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTrainingByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training', start_time?: any | null, total?: any | null, out?: any | null } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetAllBaseQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllBaseQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base', owner?: any | null, map_id?: any | null, x?: any | null, y?: any | null } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner', owner?: any | null, map_id?: any | null, total?: any | null } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetLandByKeyQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  y?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetLandByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land', map_id?: any | null, x?: any | null, y?: any | null, owner?: any | null, building?: any | null, level?: any | null } | { __typename: 'LandCost', map_id?: any | null, x?: any | null, y?: any | null, cost_gold?: any | null, cost_iron?: any | null, cost_food?: any | null } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior', map_id?: any | null, x?: any | null, y?: any | null, balance?: any | null } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetAllLandsQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllLandsQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land', map_id?: any | null, x?: any | null, y?: any | null, owner?: any | null, building?: any | null, level?: any | null } | { __typename: 'LandCost', map_id?: any | null, x?: any | null, y?: any | null, cost_gold?: any | null, cost_iron?: any | null, cost_food?: any | null } | { __typename: 'LandMiner', map_id?: any | null, x?: any | null, y?: any | null, miner_x?: any | null, miner_y?: any | null } | { __typename: 'LandMining', map_id?: any | null, x?: any | null, y?: any | null, start_time?: any | null } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost', map_id?: any | null, x?: any | null, y?: any | null, start_time?: any | null, end_time?: any | null, target_level?: any | null, claimed?: any | null } | { __typename: 'UserWarrior' } | { __typename: 'Warrior', map_id?: any | null, x?: any | null, y?: any | null, balance?: any | null } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetEthByKeyQueryVariables = Exact<{
  key?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetEthByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH', balance?: any | null } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetLandMinerByKeyQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  y?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetLandMinerByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner', map_id?: any | null, x?: any | null, y?: any | null, miner_x?: any | null, miner_y?: any | null } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetResoucesByKeyQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetResoucesByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'Iron', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetBuildPriceQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBuildPriceQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice', map_id?: any | null, build_type?: any | null, gold?: any | null, food?: any | null, iron?: any | null } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetTroopsByKeyQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTroopsByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop', map_id?: any | null, owner?: any | null, index?: any | null, balance?: any | null, from_x?: any | null, from_y?: any | null, to_x?: any | null, to_y?: any | null, start_time?: any | null, distance?: any | null } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetAllTroopsQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllTroopsQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop', map_id?: any | null, owner?: any | null, index?: any | null, balance?: any | null, from_x?: any | null, from_y?: any | null, to_x?: any | null, to_y?: any | null, start_time?: any | null, distance?: any | null, retreat?: any | null } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetMiningConfigQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMiningConfigQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig', map_id?: any | null, Food_Speed?: any | null, Iron_Speed?: any | null, Gold_Speed?: any | null, Base_Gold_Speed?: any | null } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetLandMinerQueryVariables = Exact<{
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetLandMinerQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner', map_id?: any | null, x?: any | null, y?: any | null, miner_x?: any | null, miner_y?: any | null } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetLandQueryVariables = Exact<{
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetLandQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land', map_id?: any | null, x?: any | null, y?: any | null, owner?: any | null, building?: any | null, level?: any | null } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetPlayerQueryVariables = Exact<{
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetPlayerQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player', owner?: any | null, nick_name?: any | null, joined_time?: any | null } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetTroopQueryVariables = Exact<{
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetTroopQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop', map_id?: any | null, owner?: any | null, index?: any | null, balance?: any | null, from_x?: any | null, from_y?: any | null, to_x?: any | null, to_y?: any | null, start_time?: any | null, distance?: any | null, retreat?: any | null } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetWarriorQueryVariables = Exact<{
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetWarriorQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'Base' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior', map_id?: any | null, x?: any | null, y?: any | null, balance?: any | null } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };


export const GetAllPlayersDocument = gql`
    query getAllPlayers {
  entities(first: 1000, keys: ["%"]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on Player {
            owner
            nick_name
            joined_time
          }
          __typename
          ... on ETH {
            owner
            balance
          }
        }
      }
    }
  }
}
    `;
export const GetAirdropByKeyDocument = gql`
    query getAirdropByKey($map_id: String, $key: String) {
  entities(first: 1000, keys: [$map_id, $key, "%"]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on Airdrop {
            map_id
            owner
            index
            claimed
          }
        }
      }
    }
  }
}
    `;
export const GetBaseByKeyDocument = gql`
    query getBaseByKey($key: String, $map_id: String) {
  entities(first: 1000, keys: [$map_id, $key]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on Base {
            map_id
            owner
            x
            y
          }
          __typename
          ... on FortOwner {
            map_id
            owner
            total
          }
        }
      }
    }
  }
}
    `;
export const GetUserWarriorByKeyDocument = gql`
    query getUserWarriorByKey($key: String, $map_id: String) {
  entities(first: 1000, keys: [$map_id, $key]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on UserWarrior {
            map_id
            owner
            balance
          }
          __typename
          ... on LuckyPack {
            map_id
            owner
            balance
          }
          __typename
          ... on RewardPoint {
            map_id
            owner
            balance
          }
        }
      }
    }
  }
}
    `;
export const GetWarriorConfigDocument = gql`
    query getWarriorConfig($map_id: String) {
  entities(first: 1000, keys: [$map_id]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on WarriorConfig {
            map_id
            Train_Food
            Train_Gold
            Train_Iron
            Train_Time
            Troop_Food
            Troop_Iron
            Troop_Gold
            Troop_Speed
          }
        }
      }
    }
  }
}
    `;
export const GetAirdropConfigDocument = gql`
    query getAirdropConfig($map_id: String) {
  entities(first: 1000, keys: [$map_id, "%"]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on AirdropConfig {
            map_id
            index
            reward_warrior
            reward_food
            reward_gold
            reward_iron
          }
        }
      }
    }
  }
}
    `;
export const GetWarriorByLocationDocument = gql`
    query getWarriorByLocation($map_id: String, $x: String, $y: String) {
  entities(first: 1000, keys: [$map_id, $x, $y]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on Warrior {
            x
            y
            balance
          }
        }
      }
    }
  }
}
    `;
export const GetTrainingByKeyDocument = gql`
    query getTrainingByKey($key: String, $map_id: String) {
  entities(first: 1000, keys: [$map_id, $key]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on Training {
            start_time
            total
            out
          }
        }
      }
    }
  }
}
    `;
export const GetAllBaseDocument = gql`
    query getAllBase($map_id: String) {
  entities(first: 1000, keys: [$map_id, "%"]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on Base {
            owner
            map_id
            x
            y
          }
          __typename
          ... on LandOwner {
            owner
            map_id
            total
          }
          __typename
          ... on RewardPoint {
            map_id
            owner
            balance
          }
          __typename
          ... on UserWarrior {
            map_id
            owner
            balance
          }
        }
      }
    }
  }
}
    `;
export const GetLandByKeyDocument = gql`
    query getLandByKey($map_id: String, $x: String, $y: String) {
  entities(first: 1, keys: [$map_id, $x, $y]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on Land {
            map_id
            x
            y
            owner
            building
            level
          }
          __typename
          ... on Warrior {
            map_id
            x
            y
            balance
          }
          __typename
          ... on LandCost {
            map_id
            x
            y
            cost_gold
            cost_iron
            cost_food
          }
        }
      }
    }
  }
}
    `;
export const GetAllLandsDocument = gql`
    query getAllLands($map_id: String) {
  entities(first: 1000, keys: [$map_id, "%", "%"]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on Land {
            map_id
            x
            y
            owner
            building
            level
          }
          __typename
          ... on LandMiner {
            map_id
            x
            y
            miner_x
            miner_y
          }
          __typename
          ... on LandMining {
            map_id
            x
            y
            start_time
          }
          __typename
          ... on Warrior {
            map_id
            x
            y
            balance
          }
          __typename
          ... on UpgradeCost {
            map_id
            x
            y
            start_time
            end_time
            target_level
            claimed
          }
          __typename
          ... on LandCost {
            map_id
            x
            y
            cost_gold
            cost_iron
            cost_food
          }
        }
      }
    }
  }
}
    `;
export const GetEthByKeyDocument = gql`
    query getETHByKey($key: String) {
  entities(first: 1000, keys: [$key]) {
    edges {
      node {
        keys
        components {
          __typename
          ... on ETH {
            balance
          }
        }
      }
    }
  }
}
    `;
export const GetLandMinerByKeyDocument = gql`
    query getLandMinerByKey($map_id: String, $x: String, $y: String) {
  entities(first: 1000, keys: [$map_id, $x, $y]) {
    edges {
      node {
        keys
        components {
          __typename
          ... on LandMiner {
            map_id
            x
            y
            miner_x
            miner_y
          }
        }
      }
    }
  }
}
    `;
export const GetResoucesByKeyDocument = gql`
    query getResoucesByKey($map_id: String, $key: String) {
  entities(first: 1000, keys: [$map_id, $key]) {
    edges {
      node {
        keys
        components {
          __typename
          ... on Food {
            map_id
            owner
            balance
          }
          __typename
          ... on Gold {
            map_id
            owner
            balance
          }
          __typename
          ... on Iron {
            map_id
            owner
            balance
          }
        }
      }
    }
  }
}
    `;
export const GetBuildPriceDocument = gql`
    query getBuildPrice($map_id: String) {
  entities(first: 1000, keys: [$map_id, "%"]) {
    edges {
      node {
        keys
        components {
          __typename
          ... on BuildPrice {
            map_id
            build_type
            gold
            food
            iron
          }
        }
      }
    }
  }
}
    `;
export const GetTroopsByKeyDocument = gql`
    query getTroopsByKey($map_id: String, $key: String) {
  entities(first: 1000, keys: [$map_id, $key, "%"]) {
    edges {
      node {
        keys
        components {
          __typename
          ... on Troop {
            map_id
            owner
            index
            balance
            from_x
            from_y
            to_x
            to_y
            start_time
            distance
          }
        }
      }
    }
  }
}
    `;
export const GetAllTroopsDocument = gql`
    query getAllTroops($map_id: String) {
  entities(first: 1000, keys: [$map_id, "%", "%"]) {
    edges {
      node {
        keys
        components {
          __typename
          ... on Troop {
            map_id
            owner
            index
            balance
            from_x
            from_y
            to_x
            to_y
            start_time
            distance
            retreat
          }
        }
      }
    }
  }
}
    `;
export const GetMiningConfigDocument = gql`
    query getMiningConfig($map_id: String) {
  entities(first: 1000, keys: [$map_id]) {
    edges {
      node {
        keys
        components {
          __typename
          ... on MiningConfig {
            map_id
            Food_Speed
            Iron_Speed
            Gold_Speed
            Base_Gold_Speed
          }
        }
      }
    }
  }
}
    `;
export const GetLandMinerDocument = gql`
    query getLandMiner($keys: [String]) {
  entities(first: 1000, keys: $keys) {
    edges {
      node {
        keys
        components {
          __typename
          ... on LandMiner {
            map_id
            x
            y
            miner_x
            miner_y
          }
        }
      }
    }
  }
}
    `;
export const GetLandDocument = gql`
    query getLand($keys: [String]) {
  entities(first: 1000, keys: $keys) {
    edges {
      node {
        keys
        components {
          __typename
          ... on Land {
            map_id
            x
            y
            owner
            building
            level
          }
        }
      }
    }
  }
}
    `;
export const GetPlayerDocument = gql`
    query getPlayer($keys: [String]) {
  entities(first: 1000, keys: $keys) {
    edges {
      node {
        keys
        components {
          __typename
          ... on Player {
            owner
            nick_name
            joined_time
          }
        }
      }
    }
  }
}
    `;
export const GetTroopDocument = gql`
    query getTroop($keys: [String]) {
  entities(first: 1000, keys: $keys) {
    edges {
      node {
        keys
        components {
          __typename
          ... on Troop {
            map_id
            owner
            index
            balance
            from_x
            from_y
            to_x
            to_y
            start_time
            distance
            retreat
          }
        }
      }
    }
  }
}
    `;
export const GetWarriorDocument = gql`
    query getWarrior($keys: [String]) {
  entities(first: 1000, keys: $keys) {
    edges {
      node {
        keys
        components {
          __typename
          ... on Warrior {
            map_id
            x
            y
            balance
          }
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GetAllPlayersDocumentString = print(GetAllPlayersDocument);
const GetAirdropByKeyDocumentString = print(GetAirdropByKeyDocument);
const GetBaseByKeyDocumentString = print(GetBaseByKeyDocument);
const GetUserWarriorByKeyDocumentString = print(GetUserWarriorByKeyDocument);
const GetWarriorConfigDocumentString = print(GetWarriorConfigDocument);
const GetAirdropConfigDocumentString = print(GetAirdropConfigDocument);
const GetWarriorByLocationDocumentString = print(GetWarriorByLocationDocument);
const GetTrainingByKeyDocumentString = print(GetTrainingByKeyDocument);
const GetAllBaseDocumentString = print(GetAllBaseDocument);
const GetLandByKeyDocumentString = print(GetLandByKeyDocument);
const GetAllLandsDocumentString = print(GetAllLandsDocument);
const GetEthByKeyDocumentString = print(GetEthByKeyDocument);
const GetLandMinerByKeyDocumentString = print(GetLandMinerByKeyDocument);
const GetResoucesByKeyDocumentString = print(GetResoucesByKeyDocument);
const GetBuildPriceDocumentString = print(GetBuildPriceDocument);
const GetTroopsByKeyDocumentString = print(GetTroopsByKeyDocument);
const GetAllTroopsDocumentString = print(GetAllTroopsDocument);
const GetMiningConfigDocumentString = print(GetMiningConfigDocument);
const GetLandMinerDocumentString = print(GetLandMinerDocument);
const GetLandDocumentString = print(GetLandDocument);
const GetPlayerDocumentString = print(GetPlayerDocument);
const GetTroopDocumentString = print(GetTroopDocument);
const GetWarriorDocumentString = print(GetWarriorDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getAllPlayers(variables?: GetAllPlayersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetAllPlayersQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAllPlayersQuery>(GetAllPlayersDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllPlayers', 'query');
    },
    getAirdropByKey(variables?: GetAirdropByKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetAirdropByKeyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAirdropByKeyQuery>(GetAirdropByKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAirdropByKey', 'query');
    },
    getBaseByKey(variables?: GetBaseByKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetBaseByKeyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetBaseByKeyQuery>(GetBaseByKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBaseByKey', 'query');
    },
    getUserWarriorByKey(variables?: GetUserWarriorByKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetUserWarriorByKeyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetUserWarriorByKeyQuery>(GetUserWarriorByKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserWarriorByKey', 'query');
    },
    getWarriorConfig(variables?: GetWarriorConfigQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetWarriorConfigQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetWarriorConfigQuery>(GetWarriorConfigDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getWarriorConfig', 'query');
    },
    getAirdropConfig(variables?: GetAirdropConfigQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetAirdropConfigQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAirdropConfigQuery>(GetAirdropConfigDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAirdropConfig', 'query');
    },
    getWarriorByLocation(variables?: GetWarriorByLocationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetWarriorByLocationQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetWarriorByLocationQuery>(GetWarriorByLocationDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getWarriorByLocation', 'query');
    },
    getTrainingByKey(variables?: GetTrainingByKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetTrainingByKeyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetTrainingByKeyQuery>(GetTrainingByKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTrainingByKey', 'query');
    },
    getAllBase(variables?: GetAllBaseQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetAllBaseQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAllBaseQuery>(GetAllBaseDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllBase', 'query');
    },
    getLandByKey(variables?: GetLandByKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetLandByKeyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetLandByKeyQuery>(GetLandByKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getLandByKey', 'query');
    },
    getAllLands(variables?: GetAllLandsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetAllLandsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAllLandsQuery>(GetAllLandsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllLands', 'query');
    },
    getETHByKey(variables?: GetEthByKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetEthByKeyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetEthByKeyQuery>(GetEthByKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getETHByKey', 'query');
    },
    getLandMinerByKey(variables?: GetLandMinerByKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetLandMinerByKeyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetLandMinerByKeyQuery>(GetLandMinerByKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getLandMinerByKey', 'query');
    },
    getResoucesByKey(variables?: GetResoucesByKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetResoucesByKeyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetResoucesByKeyQuery>(GetResoucesByKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getResoucesByKey', 'query');
    },
    getBuildPrice(variables?: GetBuildPriceQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetBuildPriceQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetBuildPriceQuery>(GetBuildPriceDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBuildPrice', 'query');
    },
    getTroopsByKey(variables?: GetTroopsByKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetTroopsByKeyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetTroopsByKeyQuery>(GetTroopsByKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTroopsByKey', 'query');
    },
    getAllTroops(variables?: GetAllTroopsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetAllTroopsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAllTroopsQuery>(GetAllTroopsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllTroops', 'query');
    },
    getMiningConfig(variables?: GetMiningConfigQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetMiningConfigQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetMiningConfigQuery>(GetMiningConfigDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMiningConfig', 'query');
    },
    getLandMiner(variables?: GetLandMinerQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetLandMinerQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetLandMinerQuery>(GetLandMinerDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getLandMiner', 'query');
    },
    getLand(variables?: GetLandQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetLandQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetLandQuery>(GetLandDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getLand', 'query');
    },
    getPlayer(variables?: GetPlayerQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetPlayerQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetPlayerQuery>(GetPlayerDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPlayer', 'query');
    },
    getTroop(variables?: GetTroopQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetTroopQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetTroopQuery>(GetTroopDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTroop', 'query');
    },
    getWarrior(variables?: GetWarriorQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetWarriorQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetWarriorQuery>(GetWarriorDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getWarrior', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;