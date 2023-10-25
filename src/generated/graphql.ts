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
  total_count: Scalars['Int']['output'];
};

export type AirdropConfigEdge = {
  __typename?: 'AirdropConfigEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<AirdropConfig>;
};

export type AirdropConfigOrder = {
  direction: OrderDirection;
  field: AirdropConfigOrderField;
};

export enum AirdropConfigOrderField {
  Index = 'INDEX',
  MapId = 'MAP_ID',
  RewardFood = 'REWARD_FOOD',
  RewardGold = 'REWARD_GOLD',
  RewardIron = 'REWARD_IRON',
  RewardWarrior = 'REWARD_WARRIOR'
}

export type AirdropConfigWhereInput = {
  index?: InputMaybe<Scalars['u64']['input']>;
  indexEQ?: InputMaybe<Scalars['u64']['input']>;
  indexGT?: InputMaybe<Scalars['u64']['input']>;
  indexGTE?: InputMaybe<Scalars['u64']['input']>;
  indexLT?: InputMaybe<Scalars['u64']['input']>;
  indexLTE?: InputMaybe<Scalars['u64']['input']>;
  indexNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  reward_food?: InputMaybe<Scalars['u64']['input']>;
  reward_foodEQ?: InputMaybe<Scalars['u64']['input']>;
  reward_foodGT?: InputMaybe<Scalars['u64']['input']>;
  reward_foodGTE?: InputMaybe<Scalars['u64']['input']>;
  reward_foodLT?: InputMaybe<Scalars['u64']['input']>;
  reward_foodLTE?: InputMaybe<Scalars['u64']['input']>;
  reward_foodNEQ?: InputMaybe<Scalars['u64']['input']>;
  reward_gold?: InputMaybe<Scalars['u64']['input']>;
  reward_goldEQ?: InputMaybe<Scalars['u64']['input']>;
  reward_goldGT?: InputMaybe<Scalars['u64']['input']>;
  reward_goldGTE?: InputMaybe<Scalars['u64']['input']>;
  reward_goldLT?: InputMaybe<Scalars['u64']['input']>;
  reward_goldLTE?: InputMaybe<Scalars['u64']['input']>;
  reward_goldNEQ?: InputMaybe<Scalars['u64']['input']>;
  reward_iron?: InputMaybe<Scalars['u64']['input']>;
  reward_ironEQ?: InputMaybe<Scalars['u64']['input']>;
  reward_ironGT?: InputMaybe<Scalars['u64']['input']>;
  reward_ironGTE?: InputMaybe<Scalars['u64']['input']>;
  reward_ironLT?: InputMaybe<Scalars['u64']['input']>;
  reward_ironLTE?: InputMaybe<Scalars['u64']['input']>;
  reward_ironNEQ?: InputMaybe<Scalars['u64']['input']>;
  reward_warrior?: InputMaybe<Scalars['u64']['input']>;
  reward_warriorEQ?: InputMaybe<Scalars['u64']['input']>;
  reward_warriorGT?: InputMaybe<Scalars['u64']['input']>;
  reward_warriorGTE?: InputMaybe<Scalars['u64']['input']>;
  reward_warriorLT?: InputMaybe<Scalars['u64']['input']>;
  reward_warriorLTE?: InputMaybe<Scalars['u64']['input']>;
  reward_warriorNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type AirdropConnection = {
  __typename?: 'AirdropConnection';
  edges?: Maybe<Array<Maybe<AirdropEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type AirdropEdge = {
  __typename?: 'AirdropEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Airdrop>;
};

export type AirdropOrder = {
  direction: OrderDirection;
  field: AirdropOrderField;
};

export enum AirdropOrderField {
  Claimed = 'CLAIMED',
  Index = 'INDEX',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type AirdropWhereInput = {
  claimed?: InputMaybe<Scalars['bool']['input']>;
  claimedEQ?: InputMaybe<Scalars['bool']['input']>;
  claimedGT?: InputMaybe<Scalars['bool']['input']>;
  claimedGTE?: InputMaybe<Scalars['bool']['input']>;
  claimedLT?: InputMaybe<Scalars['bool']['input']>;
  claimedLTE?: InputMaybe<Scalars['bool']['input']>;
  claimedNEQ?: InputMaybe<Scalars['bool']['input']>;
  index?: InputMaybe<Scalars['u64']['input']>;
  indexEQ?: InputMaybe<Scalars['u64']['input']>;
  indexGT?: InputMaybe<Scalars['u64']['input']>;
  indexGTE?: InputMaybe<Scalars['u64']['input']>;
  indexLT?: InputMaybe<Scalars['u64']['input']>;
  indexLTE?: InputMaybe<Scalars['u64']['input']>;
  indexNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type BuildConfigEdge = {
  __typename?: 'BuildConfigEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<BuildConfig>;
};

export type BuildConfigOrder = {
  direction: OrderDirection;
  field: BuildConfigOrderField;
};

export enum BuildConfigOrderField {
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
  Build_Type_Base?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_BaseEQ?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_BaseGT?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_BaseGTE?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_BaseLT?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_BaseLTE?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_BaseNEQ?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_Camp?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_CampEQ?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_CampGT?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_CampGTE?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_CampLT?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_CampLTE?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_CampNEQ?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_Farmland?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_FarmlandEQ?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_FarmlandGT?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_FarmlandGTE?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_FarmlandLT?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_FarmlandLTE?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_FarmlandNEQ?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_Fort?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_FortEQ?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_FortGT?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_FortGTE?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_FortLT?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_FortLTE?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_FortNEQ?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_GoldMine?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_GoldMineEQ?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_GoldMineGT?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_GoldMineGTE?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_GoldMineLT?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_GoldMineLTE?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_GoldMineNEQ?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_IronMine?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_IronMineEQ?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_IronMineGT?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_IronMineGTE?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_IronMineLT?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_IronMineLTE?: InputMaybe<Scalars['u64']['input']>;
  Build_Type_IronMineNEQ?: InputMaybe<Scalars['u64']['input']>;
  Land_Gold?: InputMaybe<Scalars['u64']['input']>;
  Land_GoldEQ?: InputMaybe<Scalars['u64']['input']>;
  Land_GoldGT?: InputMaybe<Scalars['u64']['input']>;
  Land_GoldGTE?: InputMaybe<Scalars['u64']['input']>;
  Land_GoldLT?: InputMaybe<Scalars['u64']['input']>;
  Land_GoldLTE?: InputMaybe<Scalars['u64']['input']>;
  Land_GoldNEQ?: InputMaybe<Scalars['u64']['input']>;
  Land_Iron?: InputMaybe<Scalars['u64']['input']>;
  Land_IronEQ?: InputMaybe<Scalars['u64']['input']>;
  Land_IronGT?: InputMaybe<Scalars['u64']['input']>;
  Land_IronGTE?: InputMaybe<Scalars['u64']['input']>;
  Land_IronLT?: InputMaybe<Scalars['u64']['input']>;
  Land_IronLTE?: InputMaybe<Scalars['u64']['input']>;
  Land_IronNEQ?: InputMaybe<Scalars['u64']['input']>;
  Land_None?: InputMaybe<Scalars['u64']['input']>;
  Land_NoneEQ?: InputMaybe<Scalars['u64']['input']>;
  Land_NoneGT?: InputMaybe<Scalars['u64']['input']>;
  Land_NoneGTE?: InputMaybe<Scalars['u64']['input']>;
  Land_NoneLT?: InputMaybe<Scalars['u64']['input']>;
  Land_NoneLTE?: InputMaybe<Scalars['u64']['input']>;
  Land_NoneNEQ?: InputMaybe<Scalars['u64']['input']>;
  Land_Water?: InputMaybe<Scalars['u64']['input']>;
  Land_WaterEQ?: InputMaybe<Scalars['u64']['input']>;
  Land_WaterGT?: InputMaybe<Scalars['u64']['input']>;
  Land_WaterGTE?: InputMaybe<Scalars['u64']['input']>;
  Land_WaterLT?: InputMaybe<Scalars['u64']['input']>;
  Land_WaterLTE?: InputMaybe<Scalars['u64']['input']>;
  Land_WaterNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type BuildPriceEdge = {
  __typename?: 'BuildPriceEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<BuildPrice>;
};

export type BuildPriceOrder = {
  direction: OrderDirection;
  field: BuildPriceOrderField;
};

export enum BuildPriceOrderField {
  BuildType = 'BUILD_TYPE',
  Food = 'FOOD',
  Gold = 'GOLD',
  Iron = 'IRON',
  MapId = 'MAP_ID'
}

export type BuildPriceWhereInput = {
  build_type?: InputMaybe<Scalars['u64']['input']>;
  build_typeEQ?: InputMaybe<Scalars['u64']['input']>;
  build_typeGT?: InputMaybe<Scalars['u64']['input']>;
  build_typeGTE?: InputMaybe<Scalars['u64']['input']>;
  build_typeLT?: InputMaybe<Scalars['u64']['input']>;
  build_typeLTE?: InputMaybe<Scalars['u64']['input']>;
  build_typeNEQ?: InputMaybe<Scalars['u64']['input']>;
  food?: InputMaybe<Scalars['u64']['input']>;
  foodEQ?: InputMaybe<Scalars['u64']['input']>;
  foodGT?: InputMaybe<Scalars['u64']['input']>;
  foodGTE?: InputMaybe<Scalars['u64']['input']>;
  foodLT?: InputMaybe<Scalars['u64']['input']>;
  foodLTE?: InputMaybe<Scalars['u64']['input']>;
  foodNEQ?: InputMaybe<Scalars['u64']['input']>;
  gold?: InputMaybe<Scalars['u64']['input']>;
  goldEQ?: InputMaybe<Scalars['u64']['input']>;
  goldGT?: InputMaybe<Scalars['u64']['input']>;
  goldGTE?: InputMaybe<Scalars['u64']['input']>;
  goldLT?: InputMaybe<Scalars['u64']['input']>;
  goldLTE?: InputMaybe<Scalars['u64']['input']>;
  goldNEQ?: InputMaybe<Scalars['u64']['input']>;
  iron?: InputMaybe<Scalars['u64']['input']>;
  ironEQ?: InputMaybe<Scalars['u64']['input']>;
  ironGT?: InputMaybe<Scalars['u64']['input']>;
  ironGTE?: InputMaybe<Scalars['u64']['input']>;
  ironLT?: InputMaybe<Scalars['u64']['input']>;
  ironLTE?: InputMaybe<Scalars['u64']['input']>;
  ironNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type Eth = {
  __typename?: 'ETH';
  balance?: Maybe<Scalars['u128']['output']>;
  entity?: Maybe<Entity>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
};

export type EthConnection = {
  __typename?: 'ETHConnection';
  edges?: Maybe<Array<Maybe<EthEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EthEdge = {
  __typename?: 'ETHEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Eth>;
};

export type EthOrder = {
  direction: OrderDirection;
  field: EthOrderField;
};

export enum EthOrderField {
  Balance = 'BALANCE',
  Owner = 'OWNER'
}

export type EthWhereInput = {
  balance?: InputMaybe<Scalars['u128']['input']>;
  balanceEQ?: InputMaybe<Scalars['u128']['input']>;
  balanceGT?: InputMaybe<Scalars['u128']['input']>;
  balanceGTE?: InputMaybe<Scalars['u128']['input']>;
  balanceLT?: InputMaybe<Scalars['u128']['input']>;
  balanceLTE?: InputMaybe<Scalars['u128']['input']>;
  balanceNEQ?: InputMaybe<Scalars['u128']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Entity = {
  __typename?: 'Entity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  model_names?: Maybe<Scalars['String']['output']>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type EntityConnection = {
  __typename?: 'EntityConnection';
  edges?: Maybe<Array<Maybe<EntityEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EntityEdge = {
  __typename?: 'EntityEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Entity>;
};

export type Event = {
  __typename?: 'Event';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  systemCall: SystemCall;
  transaction_hash?: Maybe<Scalars['String']['output']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
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
  total_count: Scalars['Int']['output'];
};

export type FightEdge = {
  __typename?: 'FightEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Fight>;
};

export type FightOrder = {
  direction: OrderDirection;
  field: FightOrderField;
};

export enum FightOrderField {
  MapId = 'MAP_ID',
  Out = 'OUT',
  Owner = 'OWNER',
  Total = 'TOTAL'
}

export type FightWhereInput = {
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  out?: InputMaybe<Scalars['u64']['input']>;
  outEQ?: InputMaybe<Scalars['u64']['input']>;
  outGT?: InputMaybe<Scalars['u64']['input']>;
  outGTE?: InputMaybe<Scalars['u64']['input']>;
  outLT?: InputMaybe<Scalars['u64']['input']>;
  outLTE?: InputMaybe<Scalars['u64']['input']>;
  outNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  total?: InputMaybe<Scalars['u64']['input']>;
  totalEQ?: InputMaybe<Scalars['u64']['input']>;
  totalGT?: InputMaybe<Scalars['u64']['input']>;
  totalGTE?: InputMaybe<Scalars['u64']['input']>;
  totalLT?: InputMaybe<Scalars['u64']['input']>;
  totalLTE?: InputMaybe<Scalars['u64']['input']>;
  totalNEQ?: InputMaybe<Scalars['u64']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type FoodEdge = {
  __typename?: 'FoodEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Food>;
};

export type FoodOrder = {
  direction: OrderDirection;
  field: FoodOrderField;
};

export enum FoodOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type FoodWhereInput = {
  balance?: InputMaybe<Scalars['u64']['input']>;
  balanceEQ?: InputMaybe<Scalars['u64']['input']>;
  balanceGT?: InputMaybe<Scalars['u64']['input']>;
  balanceGTE?: InputMaybe<Scalars['u64']['input']>;
  balanceLT?: InputMaybe<Scalars['u64']['input']>;
  balanceLTE?: InputMaybe<Scalars['u64']['input']>;
  balanceNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type FortOwnerEdge = {
  __typename?: 'FortOwnerEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<FortOwner>;
};

export type FortOwnerOrder = {
  direction: OrderDirection;
  field: FortOwnerOrderField;
};

export enum FortOwnerOrderField {
  MapId = 'MAP_ID',
  Owner = 'OWNER',
  Total = 'TOTAL'
}

export type FortOwnerWhereInput = {
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  total?: InputMaybe<Scalars['u64']['input']>;
  totalEQ?: InputMaybe<Scalars['u64']['input']>;
  totalGT?: InputMaybe<Scalars['u64']['input']>;
  totalGTE?: InputMaybe<Scalars['u64']['input']>;
  totalLT?: InputMaybe<Scalars['u64']['input']>;
  totalLTE?: InputMaybe<Scalars['u64']['input']>;
  totalNEQ?: InputMaybe<Scalars['u64']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type GlobalConfigEdge = {
  __typename?: 'GlobalConfigEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<GlobalConfig>;
};

export type GlobalConfigOrder = {
  direction: OrderDirection;
  field: GlobalConfigOrderField;
};

export enum GlobalConfigOrderField {
  MapId = 'MAP_ID',
  MaxMapX = 'MAX_MAP_X',
  MaxMapY = 'MAX_MAP_Y',
  Multiplier = 'MULTIPLIER'
}

export type GlobalConfigWhereInput = {
  MAX_MAP_X?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_XEQ?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_XGT?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_XGTE?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_XLT?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_XLTE?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_XNEQ?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_Y?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_YEQ?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_YGT?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_YGTE?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_YLT?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_YLTE?: InputMaybe<Scalars['u64']['input']>;
  MAX_MAP_YNEQ?: InputMaybe<Scalars['u64']['input']>;
  MULTIPLIER?: InputMaybe<Scalars['u64']['input']>;
  MULTIPLIEREQ?: InputMaybe<Scalars['u64']['input']>;
  MULTIPLIERGT?: InputMaybe<Scalars['u64']['input']>;
  MULTIPLIERGTE?: InputMaybe<Scalars['u64']['input']>;
  MULTIPLIERLT?: InputMaybe<Scalars['u64']['input']>;
  MULTIPLIERLTE?: InputMaybe<Scalars['u64']['input']>;
  MULTIPLIERNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type GoldEdge = {
  __typename?: 'GoldEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Gold>;
};

export type GoldOrder = {
  direction: OrderDirection;
  field: GoldOrderField;
};

export enum GoldOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type GoldWhereInput = {
  balance?: InputMaybe<Scalars['u64']['input']>;
  balanceEQ?: InputMaybe<Scalars['u64']['input']>;
  balanceGT?: InputMaybe<Scalars['u64']['input']>;
  balanceGTE?: InputMaybe<Scalars['u64']['input']>;
  balanceLT?: InputMaybe<Scalars['u64']['input']>;
  balanceLTE?: InputMaybe<Scalars['u64']['input']>;
  balanceNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type HBase = {
  __typename?: 'HBase';
  entity?: Maybe<Entity>;
  map_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  x?: Maybe<Scalars['u64']['output']>;
  y?: Maybe<Scalars['u64']['output']>;
};

export type HBaseConnection = {
  __typename?: 'HBaseConnection';
  edges?: Maybe<Array<Maybe<HBaseEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type HBaseEdge = {
  __typename?: 'HBaseEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<HBase>;
};

export type HBaseOrder = {
  direction: OrderDirection;
  field: HBaseOrderField;
};

export enum HBaseOrderField {
  MapId = 'MAP_ID',
  Owner = 'OWNER',
  X = 'X',
  Y = 'Y'
}

export type HBaseWhereInput = {
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  x?: InputMaybe<Scalars['u64']['input']>;
  xEQ?: InputMaybe<Scalars['u64']['input']>;
  xGT?: InputMaybe<Scalars['u64']['input']>;
  xGTE?: InputMaybe<Scalars['u64']['input']>;
  xLT?: InputMaybe<Scalars['u64']['input']>;
  xLTE?: InputMaybe<Scalars['u64']['input']>;
  xNEQ?: InputMaybe<Scalars['u64']['input']>;
  y?: InputMaybe<Scalars['u64']['input']>;
  yEQ?: InputMaybe<Scalars['u64']['input']>;
  yGT?: InputMaybe<Scalars['u64']['input']>;
  yGTE?: InputMaybe<Scalars['u64']['input']>;
  yLT?: InputMaybe<Scalars['u64']['input']>;
  yLTE?: InputMaybe<Scalars['u64']['input']>;
  yNEQ?: InputMaybe<Scalars['u64']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type IronEdge = {
  __typename?: 'IronEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Iron>;
};

export type IronOrder = {
  direction: OrderDirection;
  field: IronOrderField;
};

export enum IronOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type IronWhereInput = {
  balance?: InputMaybe<Scalars['u64']['input']>;
  balanceEQ?: InputMaybe<Scalars['u64']['input']>;
  balanceGT?: InputMaybe<Scalars['u64']['input']>;
  balanceGTE?: InputMaybe<Scalars['u64']['input']>;
  balanceLT?: InputMaybe<Scalars['u64']['input']>;
  balanceLTE?: InputMaybe<Scalars['u64']['input']>;
  balanceNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
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
  total_count: Scalars['Int']['output'];
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
  total_count: Scalars['Int']['output'];
};

export type LandCostEdge = {
  __typename?: 'LandCostEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<LandCost>;
};

export type LandCostOrder = {
  direction: OrderDirection;
  field: LandCostOrderField;
};

export enum LandCostOrderField {
  CostFood = 'COST_FOOD',
  CostGold = 'COST_GOLD',
  CostIron = 'COST_IRON',
  MapId = 'MAP_ID',
  X = 'X',
  Y = 'Y'
}

export type LandCostWhereInput = {
  cost_food?: InputMaybe<Scalars['u64']['input']>;
  cost_foodEQ?: InputMaybe<Scalars['u64']['input']>;
  cost_foodGT?: InputMaybe<Scalars['u64']['input']>;
  cost_foodGTE?: InputMaybe<Scalars['u64']['input']>;
  cost_foodLT?: InputMaybe<Scalars['u64']['input']>;
  cost_foodLTE?: InputMaybe<Scalars['u64']['input']>;
  cost_foodNEQ?: InputMaybe<Scalars['u64']['input']>;
  cost_gold?: InputMaybe<Scalars['u64']['input']>;
  cost_goldEQ?: InputMaybe<Scalars['u64']['input']>;
  cost_goldGT?: InputMaybe<Scalars['u64']['input']>;
  cost_goldGTE?: InputMaybe<Scalars['u64']['input']>;
  cost_goldLT?: InputMaybe<Scalars['u64']['input']>;
  cost_goldLTE?: InputMaybe<Scalars['u64']['input']>;
  cost_goldNEQ?: InputMaybe<Scalars['u64']['input']>;
  cost_iron?: InputMaybe<Scalars['u64']['input']>;
  cost_ironEQ?: InputMaybe<Scalars['u64']['input']>;
  cost_ironGT?: InputMaybe<Scalars['u64']['input']>;
  cost_ironGTE?: InputMaybe<Scalars['u64']['input']>;
  cost_ironLT?: InputMaybe<Scalars['u64']['input']>;
  cost_ironLTE?: InputMaybe<Scalars['u64']['input']>;
  cost_ironNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  x?: InputMaybe<Scalars['u64']['input']>;
  xEQ?: InputMaybe<Scalars['u64']['input']>;
  xGT?: InputMaybe<Scalars['u64']['input']>;
  xGTE?: InputMaybe<Scalars['u64']['input']>;
  xLT?: InputMaybe<Scalars['u64']['input']>;
  xLTE?: InputMaybe<Scalars['u64']['input']>;
  xNEQ?: InputMaybe<Scalars['u64']['input']>;
  y?: InputMaybe<Scalars['u64']['input']>;
  yEQ?: InputMaybe<Scalars['u64']['input']>;
  yGT?: InputMaybe<Scalars['u64']['input']>;
  yGTE?: InputMaybe<Scalars['u64']['input']>;
  yLT?: InputMaybe<Scalars['u64']['input']>;
  yLTE?: InputMaybe<Scalars['u64']['input']>;
  yNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type LandEdge = {
  __typename?: 'LandEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
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
  total_count: Scalars['Int']['output'];
};

export type LandMinerEdge = {
  __typename?: 'LandMinerEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<LandMiner>;
};

export type LandMinerOrder = {
  direction: OrderDirection;
  field: LandMinerOrderField;
};

export enum LandMinerOrderField {
  MapId = 'MAP_ID',
  MinerX = 'MINER_X',
  MinerY = 'MINER_Y',
  X = 'X',
  Y = 'Y'
}

export type LandMinerWhereInput = {
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  miner_x?: InputMaybe<Scalars['u64']['input']>;
  miner_xEQ?: InputMaybe<Scalars['u64']['input']>;
  miner_xGT?: InputMaybe<Scalars['u64']['input']>;
  miner_xGTE?: InputMaybe<Scalars['u64']['input']>;
  miner_xLT?: InputMaybe<Scalars['u64']['input']>;
  miner_xLTE?: InputMaybe<Scalars['u64']['input']>;
  miner_xNEQ?: InputMaybe<Scalars['u64']['input']>;
  miner_y?: InputMaybe<Scalars['u64']['input']>;
  miner_yEQ?: InputMaybe<Scalars['u64']['input']>;
  miner_yGT?: InputMaybe<Scalars['u64']['input']>;
  miner_yGTE?: InputMaybe<Scalars['u64']['input']>;
  miner_yLT?: InputMaybe<Scalars['u64']['input']>;
  miner_yLTE?: InputMaybe<Scalars['u64']['input']>;
  miner_yNEQ?: InputMaybe<Scalars['u64']['input']>;
  x?: InputMaybe<Scalars['u64']['input']>;
  xEQ?: InputMaybe<Scalars['u64']['input']>;
  xGT?: InputMaybe<Scalars['u64']['input']>;
  xGTE?: InputMaybe<Scalars['u64']['input']>;
  xLT?: InputMaybe<Scalars['u64']['input']>;
  xLTE?: InputMaybe<Scalars['u64']['input']>;
  xNEQ?: InputMaybe<Scalars['u64']['input']>;
  y?: InputMaybe<Scalars['u64']['input']>;
  yEQ?: InputMaybe<Scalars['u64']['input']>;
  yGT?: InputMaybe<Scalars['u64']['input']>;
  yGTE?: InputMaybe<Scalars['u64']['input']>;
  yLT?: InputMaybe<Scalars['u64']['input']>;
  yLTE?: InputMaybe<Scalars['u64']['input']>;
  yNEQ?: InputMaybe<Scalars['u64']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type LandMiningEdge = {
  __typename?: 'LandMiningEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<LandMining>;
};

export type LandMiningOrder = {
  direction: OrderDirection;
  field: LandMiningOrderField;
};

export enum LandMiningOrderField {
  MapId = 'MAP_ID',
  MinedX = 'MINED_X',
  MinedY = 'MINED_Y',
  StartTime = 'START_TIME',
  X = 'X',
  Y = 'Y'
}

export type LandMiningWhereInput = {
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  mined_x?: InputMaybe<Scalars['u64']['input']>;
  mined_xEQ?: InputMaybe<Scalars['u64']['input']>;
  mined_xGT?: InputMaybe<Scalars['u64']['input']>;
  mined_xGTE?: InputMaybe<Scalars['u64']['input']>;
  mined_xLT?: InputMaybe<Scalars['u64']['input']>;
  mined_xLTE?: InputMaybe<Scalars['u64']['input']>;
  mined_xNEQ?: InputMaybe<Scalars['u64']['input']>;
  mined_y?: InputMaybe<Scalars['u64']['input']>;
  mined_yEQ?: InputMaybe<Scalars['u64']['input']>;
  mined_yGT?: InputMaybe<Scalars['u64']['input']>;
  mined_yGTE?: InputMaybe<Scalars['u64']['input']>;
  mined_yLT?: InputMaybe<Scalars['u64']['input']>;
  mined_yLTE?: InputMaybe<Scalars['u64']['input']>;
  mined_yNEQ?: InputMaybe<Scalars['u64']['input']>;
  start_time?: InputMaybe<Scalars['u64']['input']>;
  start_timeEQ?: InputMaybe<Scalars['u64']['input']>;
  start_timeGT?: InputMaybe<Scalars['u64']['input']>;
  start_timeGTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeLT?: InputMaybe<Scalars['u64']['input']>;
  start_timeLTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['u64']['input']>;
  x?: InputMaybe<Scalars['u64']['input']>;
  xEQ?: InputMaybe<Scalars['u64']['input']>;
  xGT?: InputMaybe<Scalars['u64']['input']>;
  xGTE?: InputMaybe<Scalars['u64']['input']>;
  xLT?: InputMaybe<Scalars['u64']['input']>;
  xLTE?: InputMaybe<Scalars['u64']['input']>;
  xNEQ?: InputMaybe<Scalars['u64']['input']>;
  y?: InputMaybe<Scalars['u64']['input']>;
  yEQ?: InputMaybe<Scalars['u64']['input']>;
  yGT?: InputMaybe<Scalars['u64']['input']>;
  yGTE?: InputMaybe<Scalars['u64']['input']>;
  yLT?: InputMaybe<Scalars['u64']['input']>;
  yLTE?: InputMaybe<Scalars['u64']['input']>;
  yNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type LandOrder = {
  direction: OrderDirection;
  field: LandOrderField;
};

export enum LandOrderField {
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
  total_count: Scalars['Int']['output'];
};

export type LandOwnerEdge = {
  __typename?: 'LandOwnerEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<LandOwner>;
};

export type LandOwnerOrder = {
  direction: OrderDirection;
  field: LandOwnerOrderField;
};

export enum LandOwnerOrderField {
  MapId = 'MAP_ID',
  Owner = 'OWNER',
  Total = 'TOTAL'
}

export type LandOwnerWhereInput = {
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  total?: InputMaybe<Scalars['u64']['input']>;
  totalEQ?: InputMaybe<Scalars['u64']['input']>;
  totalGT?: InputMaybe<Scalars['u64']['input']>;
  totalGTE?: InputMaybe<Scalars['u64']['input']>;
  totalLT?: InputMaybe<Scalars['u64']['input']>;
  totalLTE?: InputMaybe<Scalars['u64']['input']>;
  totalNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type LandWhereInput = {
  building?: InputMaybe<Scalars['u64']['input']>;
  buildingEQ?: InputMaybe<Scalars['u64']['input']>;
  buildingGT?: InputMaybe<Scalars['u64']['input']>;
  buildingGTE?: InputMaybe<Scalars['u64']['input']>;
  buildingLT?: InputMaybe<Scalars['u64']['input']>;
  buildingLTE?: InputMaybe<Scalars['u64']['input']>;
  buildingNEQ?: InputMaybe<Scalars['u64']['input']>;
  level?: InputMaybe<Scalars['u64']['input']>;
  levelEQ?: InputMaybe<Scalars['u64']['input']>;
  levelGT?: InputMaybe<Scalars['u64']['input']>;
  levelGTE?: InputMaybe<Scalars['u64']['input']>;
  levelLT?: InputMaybe<Scalars['u64']['input']>;
  levelLTE?: InputMaybe<Scalars['u64']['input']>;
  levelNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  x?: InputMaybe<Scalars['u64']['input']>;
  xEQ?: InputMaybe<Scalars['u64']['input']>;
  xGT?: InputMaybe<Scalars['u64']['input']>;
  xGTE?: InputMaybe<Scalars['u64']['input']>;
  xLT?: InputMaybe<Scalars['u64']['input']>;
  xLTE?: InputMaybe<Scalars['u64']['input']>;
  xNEQ?: InputMaybe<Scalars['u64']['input']>;
  y?: InputMaybe<Scalars['u64']['input']>;
  yEQ?: InputMaybe<Scalars['u64']['input']>;
  yGT?: InputMaybe<Scalars['u64']['input']>;
  yGTE?: InputMaybe<Scalars['u64']['input']>;
  yLT?: InputMaybe<Scalars['u64']['input']>;
  yLTE?: InputMaybe<Scalars['u64']['input']>;
  yNEQ?: InputMaybe<Scalars['u64']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type LuckyPackEdge = {
  __typename?: 'LuckyPackEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<LuckyPack>;
};

export type LuckyPackOrder = {
  direction: OrderDirection;
  field: LuckyPackOrderField;
};

export enum LuckyPackOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type LuckyPackWhereInput = {
  balance?: InputMaybe<Scalars['u64']['input']>;
  balanceEQ?: InputMaybe<Scalars['u64']['input']>;
  balanceGT?: InputMaybe<Scalars['u64']['input']>;
  balanceGTE?: InputMaybe<Scalars['u64']['input']>;
  balanceLT?: InputMaybe<Scalars['u64']['input']>;
  balanceLTE?: InputMaybe<Scalars['u64']['input']>;
  balanceNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Metadata = {
  __typename?: 'Metadata';
  id?: Maybe<Scalars['ID']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type MetadataConnection = {
  __typename?: 'MetadataConnection';
  edges?: Maybe<Array<Maybe<MetadataEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type MetadataEdge = {
  __typename?: 'MetadataEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Metadata>;
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
  total_count: Scalars['Int']['output'];
};

export type MiningConfigEdge = {
  __typename?: 'MiningConfigEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<MiningConfig>;
};

export type MiningConfigOrder = {
  direction: OrderDirection;
  field: MiningConfigOrderField;
};

export enum MiningConfigOrderField {
  BaseGoldSpeed = 'BASE_GOLD_SPEED',
  FoodSpeed = 'FOOD_SPEED',
  GoldSpeed = 'GOLD_SPEED',
  IronSpeed = 'IRON_SPEED',
  MapId = 'MAP_ID'
}

export type MiningConfigWhereInput = {
  Base_Gold_Speed?: InputMaybe<Scalars['u64']['input']>;
  Base_Gold_SpeedEQ?: InputMaybe<Scalars['u64']['input']>;
  Base_Gold_SpeedGT?: InputMaybe<Scalars['u64']['input']>;
  Base_Gold_SpeedGTE?: InputMaybe<Scalars['u64']['input']>;
  Base_Gold_SpeedLT?: InputMaybe<Scalars['u64']['input']>;
  Base_Gold_SpeedLTE?: InputMaybe<Scalars['u64']['input']>;
  Base_Gold_SpeedNEQ?: InputMaybe<Scalars['u64']['input']>;
  Food_Speed?: InputMaybe<Scalars['u64']['input']>;
  Food_SpeedEQ?: InputMaybe<Scalars['u64']['input']>;
  Food_SpeedGT?: InputMaybe<Scalars['u64']['input']>;
  Food_SpeedGTE?: InputMaybe<Scalars['u64']['input']>;
  Food_SpeedLT?: InputMaybe<Scalars['u64']['input']>;
  Food_SpeedLTE?: InputMaybe<Scalars['u64']['input']>;
  Food_SpeedNEQ?: InputMaybe<Scalars['u64']['input']>;
  Gold_Speed?: InputMaybe<Scalars['u64']['input']>;
  Gold_SpeedEQ?: InputMaybe<Scalars['u64']['input']>;
  Gold_SpeedGT?: InputMaybe<Scalars['u64']['input']>;
  Gold_SpeedGTE?: InputMaybe<Scalars['u64']['input']>;
  Gold_SpeedLT?: InputMaybe<Scalars['u64']['input']>;
  Gold_SpeedLTE?: InputMaybe<Scalars['u64']['input']>;
  Gold_SpeedNEQ?: InputMaybe<Scalars['u64']['input']>;
  Iron_Speed?: InputMaybe<Scalars['u64']['input']>;
  Iron_SpeedEQ?: InputMaybe<Scalars['u64']['input']>;
  Iron_SpeedGT?: InputMaybe<Scalars['u64']['input']>;
  Iron_SpeedGTE?: InputMaybe<Scalars['u64']['input']>;
  Iron_SpeedLT?: InputMaybe<Scalars['u64']['input']>;
  Iron_SpeedLTE?: InputMaybe<Scalars['u64']['input']>;
  Iron_SpeedNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type Model = {
  __typename?: 'Model';
  class_hash?: Maybe<Scalars['felt252']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transaction_hash?: Maybe<Scalars['felt252']['output']>;
};

export type ModelConnection = {
  __typename?: 'ModelConnection';
  edges?: Maybe<Array<Maybe<ModelEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type ModelEdge = {
  __typename?: 'ModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Model>;
};

export type ModelUnion = Airdrop | AirdropConfig | BuildConfig | BuildPrice | Eth | Fight | Food | FortOwner | GlobalConfig | Gold | HBase | Iron | Land | LandCost | LandMiner | LandMining | LandOwner | LuckyPack | MiningConfig | Player | RewardPoint | Training | Troop | UpgradeCost | UserWarrior | Warrior | WarriorConfig;

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

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
  total_count: Scalars['Int']['output'];
};

export type PlayerEdge = {
  __typename?: 'PlayerEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Player>;
};

export type PlayerOrder = {
  direction: OrderDirection;
  field: PlayerOrderField;
};

export enum PlayerOrderField {
  JoinedTime = 'JOINED_TIME',
  NickName = 'NICK_NAME',
  Owner = 'OWNER'
}

export type PlayerWhereInput = {
  joined_time?: InputMaybe<Scalars['u64']['input']>;
  joined_timeEQ?: InputMaybe<Scalars['u64']['input']>;
  joined_timeGT?: InputMaybe<Scalars['u64']['input']>;
  joined_timeGTE?: InputMaybe<Scalars['u64']['input']>;
  joined_timeLT?: InputMaybe<Scalars['u64']['input']>;
  joined_timeLTE?: InputMaybe<Scalars['u64']['input']>;
  joined_timeNEQ?: InputMaybe<Scalars['u64']['input']>;
  nick_name?: InputMaybe<Scalars['felt252']['input']>;
  nick_nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nick_nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nick_nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nick_nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nick_nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nick_nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Query = {
  __typename?: 'Query';
  airdropModels?: Maybe<AirdropConnection>;
  airdropconfigModels?: Maybe<AirdropConfigConnection>;
  buildconfigModels?: Maybe<BuildConfigConnection>;
  buildpriceModels?: Maybe<BuildPriceConnection>;
  entities?: Maybe<EntityConnection>;
  entity: Entity;
  ethModels?: Maybe<EthConnection>;
  events?: Maybe<EventConnection>;
  fightModels?: Maybe<FightConnection>;
  foodModels?: Maybe<FoodConnection>;
  fortownerModels?: Maybe<FortOwnerConnection>;
  globalconfigModels?: Maybe<GlobalConfigConnection>;
  goldModels?: Maybe<GoldConnection>;
  hbaseModels?: Maybe<HBaseConnection>;
  ironModels?: Maybe<IronConnection>;
  landModels?: Maybe<LandConnection>;
  landcostModels?: Maybe<LandCostConnection>;
  landminerModels?: Maybe<LandMinerConnection>;
  landminingModels?: Maybe<LandMiningConnection>;
  landownerModels?: Maybe<LandOwnerConnection>;
  luckypackModels?: Maybe<LuckyPackConnection>;
  metadata: Metadata;
  metadatas?: Maybe<MetadataConnection>;
  miningconfigModels?: Maybe<MiningConfigConnection>;
  model: Model;
  models?: Maybe<ModelConnection>;
  playerModels?: Maybe<PlayerConnection>;
  rewardpointModels?: Maybe<RewardPointConnection>;
  system: System;
  systemCall: SystemCall;
  systemCalls?: Maybe<SystemCallConnection>;
  systems?: Maybe<SystemConnection>;
  trainingModels?: Maybe<TrainingConnection>;
  troopModels?: Maybe<TroopConnection>;
  upgradecostModels?: Maybe<UpgradeCostConnection>;
  userwarriorModels?: Maybe<UserWarriorConnection>;
  warriorModels?: Maybe<WarriorConnection>;
  warriorconfigModels?: Maybe<WarriorConfigConnection>;
};


export type QueryAirdropModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AirdropOrder>;
  where?: InputMaybe<AirdropWhereInput>;
};


export type QueryAirdropconfigModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AirdropConfigOrder>;
  where?: InputMaybe<AirdropConfigWhereInput>;
};


export type QueryBuildconfigModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BuildConfigOrder>;
  where?: InputMaybe<BuildConfigWhereInput>;
};


export type QueryBuildpriceModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BuildPriceOrder>;
  where?: InputMaybe<BuildPriceWhereInput>;
};


export type QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEthModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<EthOrder>;
  where?: InputMaybe<EthWhereInput>;
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFightModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<FightOrder>;
  where?: InputMaybe<FightWhereInput>;
};


export type QueryFoodModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<FoodOrder>;
  where?: InputMaybe<FoodWhereInput>;
};


export type QueryFortownerModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<FortOwnerOrder>;
  where?: InputMaybe<FortOwnerWhereInput>;
};


export type QueryGlobalconfigModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<GlobalConfigOrder>;
  where?: InputMaybe<GlobalConfigWhereInput>;
};


export type QueryGoldModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<GoldOrder>;
  where?: InputMaybe<GoldWhereInput>;
};


export type QueryHbaseModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<HBaseOrder>;
  where?: InputMaybe<HBaseWhereInput>;
};


export type QueryIronModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<IronOrder>;
  where?: InputMaybe<IronWhereInput>;
};


export type QueryLandModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LandOrder>;
  where?: InputMaybe<LandWhereInput>;
};


export type QueryLandcostModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LandCostOrder>;
  where?: InputMaybe<LandCostWhereInput>;
};


export type QueryLandminerModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LandMinerOrder>;
  where?: InputMaybe<LandMinerWhereInput>;
};


export type QueryLandminingModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LandMiningOrder>;
  where?: InputMaybe<LandMiningWhereInput>;
};


export type QueryLandownerModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LandOwnerOrder>;
  where?: InputMaybe<LandOwnerWhereInput>;
};


export type QueryLuckypackModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LuckyPackOrder>;
  where?: InputMaybe<LuckyPackWhereInput>;
};


export type QueryMetadataArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMetadatasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMiningconfigModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MiningConfigOrder>;
  where?: InputMaybe<MiningConfigWhereInput>;
};


export type QueryModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPlayerModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<PlayerOrder>;
  where?: InputMaybe<PlayerWhereInput>;
};


export type QueryRewardpointModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<RewardPointOrder>;
  where?: InputMaybe<RewardPointWhereInput>;
};


export type QuerySystemArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySystemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTrainingModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TrainingOrder>;
  where?: InputMaybe<TrainingWhereInput>;
};


export type QueryTroopModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TroopOrder>;
  where?: InputMaybe<TroopWhereInput>;
};


export type QueryUpgradecostModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UpgradeCostOrder>;
  where?: InputMaybe<UpgradeCostWhereInput>;
};


export type QueryUserwarriorModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UserWarriorOrder>;
  where?: InputMaybe<UserWarriorWhereInput>;
};


export type QueryWarriorModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WarriorOrder>;
  where?: InputMaybe<WarriorWhereInput>;
};


export type QueryWarriorconfigModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type RewardPointEdge = {
  __typename?: 'RewardPointEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<RewardPoint>;
};

export type RewardPointOrder = {
  direction: OrderDirection;
  field: RewardPointOrderField;
};

export enum RewardPointOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type RewardPointWhereInput = {
  balance?: InputMaybe<Scalars['u64']['input']>;
  balanceEQ?: InputMaybe<Scalars['u64']['input']>;
  balanceGT?: InputMaybe<Scalars['u64']['input']>;
  balanceGTE?: InputMaybe<Scalars['u64']['input']>;
  balanceLT?: InputMaybe<Scalars['u64']['input']>;
  balanceLTE?: InputMaybe<Scalars['u64']['input']>;
  balanceNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  entityUpdated: Entity;
  modelRegistered: Model;
};


export type SubscriptionEntityUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionModelRegisteredArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type System = {
  __typename?: 'System';
  class_hash?: Maybe<Scalars['felt252']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  systemCalls: Array<SystemCall>;
  transaction_hash?: Maybe<Scalars['felt252']['output']>;
};

export type SystemCall = {
  __typename?: 'SystemCall';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  system: System;
  system_id?: Maybe<Scalars['ID']['output']>;
  transaction_hash?: Maybe<Scalars['String']['output']>;
};

export type SystemCallConnection = {
  __typename?: 'SystemCallConnection';
  edges?: Maybe<Array<Maybe<SystemCallEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type SystemCallEdge = {
  __typename?: 'SystemCallEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<SystemCall>;
};

export type SystemConnection = {
  __typename?: 'SystemConnection';
  edges?: Maybe<Array<Maybe<SystemEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type SystemEdge = {
  __typename?: 'SystemEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
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
  total_count: Scalars['Int']['output'];
};

export type TrainingEdge = {
  __typename?: 'TrainingEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Training>;
};

export type TrainingOrder = {
  direction: OrderDirection;
  field: TrainingOrderField;
};

export enum TrainingOrderField {
  MapId = 'MAP_ID',
  Out = 'OUT',
  Owner = 'OWNER',
  StartTime = 'START_TIME',
  Total = 'TOTAL'
}

export type TrainingWhereInput = {
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  out?: InputMaybe<Scalars['u64']['input']>;
  outEQ?: InputMaybe<Scalars['u64']['input']>;
  outGT?: InputMaybe<Scalars['u64']['input']>;
  outGTE?: InputMaybe<Scalars['u64']['input']>;
  outLT?: InputMaybe<Scalars['u64']['input']>;
  outLTE?: InputMaybe<Scalars['u64']['input']>;
  outNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  start_time?: InputMaybe<Scalars['u64']['input']>;
  start_timeEQ?: InputMaybe<Scalars['u64']['input']>;
  start_timeGT?: InputMaybe<Scalars['u64']['input']>;
  start_timeGTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeLT?: InputMaybe<Scalars['u64']['input']>;
  start_timeLTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['u64']['input']>;
  total?: InputMaybe<Scalars['u64']['input']>;
  totalEQ?: InputMaybe<Scalars['u64']['input']>;
  totalGT?: InputMaybe<Scalars['u64']['input']>;
  totalGTE?: InputMaybe<Scalars['u64']['input']>;
  totalLT?: InputMaybe<Scalars['u64']['input']>;
  totalLTE?: InputMaybe<Scalars['u64']['input']>;
  totalNEQ?: InputMaybe<Scalars['u64']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type TroopEdge = {
  __typename?: 'TroopEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Troop>;
};

export type TroopOrder = {
  direction: OrderDirection;
  field: TroopOrderField;
};

export enum TroopOrderField {
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
  balance?: InputMaybe<Scalars['u64']['input']>;
  balanceEQ?: InputMaybe<Scalars['u64']['input']>;
  balanceGT?: InputMaybe<Scalars['u64']['input']>;
  balanceGTE?: InputMaybe<Scalars['u64']['input']>;
  balanceLT?: InputMaybe<Scalars['u64']['input']>;
  balanceLTE?: InputMaybe<Scalars['u64']['input']>;
  balanceNEQ?: InputMaybe<Scalars['u64']['input']>;
  distance?: InputMaybe<Scalars['u64']['input']>;
  distanceEQ?: InputMaybe<Scalars['u64']['input']>;
  distanceGT?: InputMaybe<Scalars['u64']['input']>;
  distanceGTE?: InputMaybe<Scalars['u64']['input']>;
  distanceLT?: InputMaybe<Scalars['u64']['input']>;
  distanceLTE?: InputMaybe<Scalars['u64']['input']>;
  distanceNEQ?: InputMaybe<Scalars['u64']['input']>;
  from_x?: InputMaybe<Scalars['u64']['input']>;
  from_xEQ?: InputMaybe<Scalars['u64']['input']>;
  from_xGT?: InputMaybe<Scalars['u64']['input']>;
  from_xGTE?: InputMaybe<Scalars['u64']['input']>;
  from_xLT?: InputMaybe<Scalars['u64']['input']>;
  from_xLTE?: InputMaybe<Scalars['u64']['input']>;
  from_xNEQ?: InputMaybe<Scalars['u64']['input']>;
  from_y?: InputMaybe<Scalars['u64']['input']>;
  from_yEQ?: InputMaybe<Scalars['u64']['input']>;
  from_yGT?: InputMaybe<Scalars['u64']['input']>;
  from_yGTE?: InputMaybe<Scalars['u64']['input']>;
  from_yLT?: InputMaybe<Scalars['u64']['input']>;
  from_yLTE?: InputMaybe<Scalars['u64']['input']>;
  from_yNEQ?: InputMaybe<Scalars['u64']['input']>;
  index?: InputMaybe<Scalars['u64']['input']>;
  indexEQ?: InputMaybe<Scalars['u64']['input']>;
  indexGT?: InputMaybe<Scalars['u64']['input']>;
  indexGTE?: InputMaybe<Scalars['u64']['input']>;
  indexLT?: InputMaybe<Scalars['u64']['input']>;
  indexLTE?: InputMaybe<Scalars['u64']['input']>;
  indexNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  retreat?: InputMaybe<Scalars['bool']['input']>;
  retreatEQ?: InputMaybe<Scalars['bool']['input']>;
  retreatGT?: InputMaybe<Scalars['bool']['input']>;
  retreatGTE?: InputMaybe<Scalars['bool']['input']>;
  retreatLT?: InputMaybe<Scalars['bool']['input']>;
  retreatLTE?: InputMaybe<Scalars['bool']['input']>;
  retreatNEQ?: InputMaybe<Scalars['bool']['input']>;
  start_time?: InputMaybe<Scalars['u64']['input']>;
  start_timeEQ?: InputMaybe<Scalars['u64']['input']>;
  start_timeGT?: InputMaybe<Scalars['u64']['input']>;
  start_timeGTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeLT?: InputMaybe<Scalars['u64']['input']>;
  start_timeLTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['u64']['input']>;
  to_x?: InputMaybe<Scalars['u64']['input']>;
  to_xEQ?: InputMaybe<Scalars['u64']['input']>;
  to_xGT?: InputMaybe<Scalars['u64']['input']>;
  to_xGTE?: InputMaybe<Scalars['u64']['input']>;
  to_xLT?: InputMaybe<Scalars['u64']['input']>;
  to_xLTE?: InputMaybe<Scalars['u64']['input']>;
  to_xNEQ?: InputMaybe<Scalars['u64']['input']>;
  to_y?: InputMaybe<Scalars['u64']['input']>;
  to_yEQ?: InputMaybe<Scalars['u64']['input']>;
  to_yGT?: InputMaybe<Scalars['u64']['input']>;
  to_yGTE?: InputMaybe<Scalars['u64']['input']>;
  to_yLT?: InputMaybe<Scalars['u64']['input']>;
  to_yLTE?: InputMaybe<Scalars['u64']['input']>;
  to_yNEQ?: InputMaybe<Scalars['u64']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type UpgradeCostEdge = {
  __typename?: 'UpgradeCostEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<UpgradeCost>;
};

export type UpgradeCostOrder = {
  direction: OrderDirection;
  field: UpgradeCostOrderField;
};

export enum UpgradeCostOrderField {
  Claimed = 'CLAIMED',
  EndTime = 'END_TIME',
  MapId = 'MAP_ID',
  StartTime = 'START_TIME',
  TargetLevel = 'TARGET_LEVEL',
  X = 'X',
  Y = 'Y'
}

export type UpgradeCostWhereInput = {
  claimed?: InputMaybe<Scalars['bool']['input']>;
  claimedEQ?: InputMaybe<Scalars['bool']['input']>;
  claimedGT?: InputMaybe<Scalars['bool']['input']>;
  claimedGTE?: InputMaybe<Scalars['bool']['input']>;
  claimedLT?: InputMaybe<Scalars['bool']['input']>;
  claimedLTE?: InputMaybe<Scalars['bool']['input']>;
  claimedNEQ?: InputMaybe<Scalars['bool']['input']>;
  end_time?: InputMaybe<Scalars['u64']['input']>;
  end_timeEQ?: InputMaybe<Scalars['u64']['input']>;
  end_timeGT?: InputMaybe<Scalars['u64']['input']>;
  end_timeGTE?: InputMaybe<Scalars['u64']['input']>;
  end_timeLT?: InputMaybe<Scalars['u64']['input']>;
  end_timeLTE?: InputMaybe<Scalars['u64']['input']>;
  end_timeNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  start_time?: InputMaybe<Scalars['u64']['input']>;
  start_timeEQ?: InputMaybe<Scalars['u64']['input']>;
  start_timeGT?: InputMaybe<Scalars['u64']['input']>;
  start_timeGTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeLT?: InputMaybe<Scalars['u64']['input']>;
  start_timeLTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['u64']['input']>;
  target_level?: InputMaybe<Scalars['u64']['input']>;
  target_levelEQ?: InputMaybe<Scalars['u64']['input']>;
  target_levelGT?: InputMaybe<Scalars['u64']['input']>;
  target_levelGTE?: InputMaybe<Scalars['u64']['input']>;
  target_levelLT?: InputMaybe<Scalars['u64']['input']>;
  target_levelLTE?: InputMaybe<Scalars['u64']['input']>;
  target_levelNEQ?: InputMaybe<Scalars['u64']['input']>;
  x?: InputMaybe<Scalars['u64']['input']>;
  xEQ?: InputMaybe<Scalars['u64']['input']>;
  xGT?: InputMaybe<Scalars['u64']['input']>;
  xGTE?: InputMaybe<Scalars['u64']['input']>;
  xLT?: InputMaybe<Scalars['u64']['input']>;
  xLTE?: InputMaybe<Scalars['u64']['input']>;
  xNEQ?: InputMaybe<Scalars['u64']['input']>;
  y?: InputMaybe<Scalars['u64']['input']>;
  yEQ?: InputMaybe<Scalars['u64']['input']>;
  yGT?: InputMaybe<Scalars['u64']['input']>;
  yGTE?: InputMaybe<Scalars['u64']['input']>;
  yLT?: InputMaybe<Scalars['u64']['input']>;
  yLTE?: InputMaybe<Scalars['u64']['input']>;
  yNEQ?: InputMaybe<Scalars['u64']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type UserWarriorEdge = {
  __typename?: 'UserWarriorEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<UserWarrior>;
};

export type UserWarriorOrder = {
  direction: OrderDirection;
  field: UserWarriorOrderField;
};

export enum UserWarriorOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  Owner = 'OWNER'
}

export type UserWarriorWhereInput = {
  balance?: InputMaybe<Scalars['u64']['input']>;
  balanceEQ?: InputMaybe<Scalars['u64']['input']>;
  balanceGT?: InputMaybe<Scalars['u64']['input']>;
  balanceGTE?: InputMaybe<Scalars['u64']['input']>;
  balanceLT?: InputMaybe<Scalars['u64']['input']>;
  balanceLTE?: InputMaybe<Scalars['u64']['input']>;
  balanceNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
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
  total_count: Scalars['Int']['output'];
};

export type WarriorConfigEdge = {
  __typename?: 'WarriorConfigEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<WarriorConfig>;
};

export type WarriorConfigOrder = {
  direction: OrderDirection;
  field: WarriorConfigOrderField;
};

export enum WarriorConfigOrderField {
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
  Train_Food?: InputMaybe<Scalars['u64']['input']>;
  Train_FoodEQ?: InputMaybe<Scalars['u64']['input']>;
  Train_FoodGT?: InputMaybe<Scalars['u64']['input']>;
  Train_FoodGTE?: InputMaybe<Scalars['u64']['input']>;
  Train_FoodLT?: InputMaybe<Scalars['u64']['input']>;
  Train_FoodLTE?: InputMaybe<Scalars['u64']['input']>;
  Train_FoodNEQ?: InputMaybe<Scalars['u64']['input']>;
  Train_Gold?: InputMaybe<Scalars['u64']['input']>;
  Train_GoldEQ?: InputMaybe<Scalars['u64']['input']>;
  Train_GoldGT?: InputMaybe<Scalars['u64']['input']>;
  Train_GoldGTE?: InputMaybe<Scalars['u64']['input']>;
  Train_GoldLT?: InputMaybe<Scalars['u64']['input']>;
  Train_GoldLTE?: InputMaybe<Scalars['u64']['input']>;
  Train_GoldNEQ?: InputMaybe<Scalars['u64']['input']>;
  Train_Iron?: InputMaybe<Scalars['u64']['input']>;
  Train_IronEQ?: InputMaybe<Scalars['u64']['input']>;
  Train_IronGT?: InputMaybe<Scalars['u64']['input']>;
  Train_IronGTE?: InputMaybe<Scalars['u64']['input']>;
  Train_IronLT?: InputMaybe<Scalars['u64']['input']>;
  Train_IronLTE?: InputMaybe<Scalars['u64']['input']>;
  Train_IronNEQ?: InputMaybe<Scalars['u64']['input']>;
  Train_Time?: InputMaybe<Scalars['u64']['input']>;
  Train_TimeEQ?: InputMaybe<Scalars['u64']['input']>;
  Train_TimeGT?: InputMaybe<Scalars['u64']['input']>;
  Train_TimeGTE?: InputMaybe<Scalars['u64']['input']>;
  Train_TimeLT?: InputMaybe<Scalars['u64']['input']>;
  Train_TimeLTE?: InputMaybe<Scalars['u64']['input']>;
  Train_TimeNEQ?: InputMaybe<Scalars['u64']['input']>;
  Troop_Food?: InputMaybe<Scalars['u64']['input']>;
  Troop_FoodEQ?: InputMaybe<Scalars['u64']['input']>;
  Troop_FoodGT?: InputMaybe<Scalars['u64']['input']>;
  Troop_FoodGTE?: InputMaybe<Scalars['u64']['input']>;
  Troop_FoodLT?: InputMaybe<Scalars['u64']['input']>;
  Troop_FoodLTE?: InputMaybe<Scalars['u64']['input']>;
  Troop_FoodNEQ?: InputMaybe<Scalars['u64']['input']>;
  Troop_Gold?: InputMaybe<Scalars['u64']['input']>;
  Troop_GoldEQ?: InputMaybe<Scalars['u64']['input']>;
  Troop_GoldGT?: InputMaybe<Scalars['u64']['input']>;
  Troop_GoldGTE?: InputMaybe<Scalars['u64']['input']>;
  Troop_GoldLT?: InputMaybe<Scalars['u64']['input']>;
  Troop_GoldLTE?: InputMaybe<Scalars['u64']['input']>;
  Troop_GoldNEQ?: InputMaybe<Scalars['u64']['input']>;
  Troop_Iron?: InputMaybe<Scalars['u64']['input']>;
  Troop_IronEQ?: InputMaybe<Scalars['u64']['input']>;
  Troop_IronGT?: InputMaybe<Scalars['u64']['input']>;
  Troop_IronGTE?: InputMaybe<Scalars['u64']['input']>;
  Troop_IronLT?: InputMaybe<Scalars['u64']['input']>;
  Troop_IronLTE?: InputMaybe<Scalars['u64']['input']>;
  Troop_IronNEQ?: InputMaybe<Scalars['u64']['input']>;
  Troop_Speed?: InputMaybe<Scalars['u64']['input']>;
  Troop_SpeedEQ?: InputMaybe<Scalars['u64']['input']>;
  Troop_SpeedGT?: InputMaybe<Scalars['u64']['input']>;
  Troop_SpeedGTE?: InputMaybe<Scalars['u64']['input']>;
  Troop_SpeedLT?: InputMaybe<Scalars['u64']['input']>;
  Troop_SpeedLTE?: InputMaybe<Scalars['u64']['input']>;
  Troop_SpeedNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type WarriorConnection = {
  __typename?: 'WarriorConnection';
  edges?: Maybe<Array<Maybe<WarriorEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type WarriorEdge = {
  __typename?: 'WarriorEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Warrior>;
};

export type WarriorOrder = {
  direction: OrderDirection;
  field: WarriorOrderField;
};

export enum WarriorOrderField {
  Balance = 'BALANCE',
  MapId = 'MAP_ID',
  X = 'X',
  Y = 'Y'
}

export type WarriorWhereInput = {
  balance?: InputMaybe<Scalars['u64']['input']>;
  balanceEQ?: InputMaybe<Scalars['u64']['input']>;
  balanceGT?: InputMaybe<Scalars['u64']['input']>;
  balanceGTE?: InputMaybe<Scalars['u64']['input']>;
  balanceLT?: InputMaybe<Scalars['u64']['input']>;
  balanceLTE?: InputMaybe<Scalars['u64']['input']>;
  balanceNEQ?: InputMaybe<Scalars['u64']['input']>;
  map_id?: InputMaybe<Scalars['u64']['input']>;
  map_idEQ?: InputMaybe<Scalars['u64']['input']>;
  map_idGT?: InputMaybe<Scalars['u64']['input']>;
  map_idGTE?: InputMaybe<Scalars['u64']['input']>;
  map_idLT?: InputMaybe<Scalars['u64']['input']>;
  map_idLTE?: InputMaybe<Scalars['u64']['input']>;
  map_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  x?: InputMaybe<Scalars['u64']['input']>;
  xEQ?: InputMaybe<Scalars['u64']['input']>;
  xGT?: InputMaybe<Scalars['u64']['input']>;
  xGTE?: InputMaybe<Scalars['u64']['input']>;
  xLT?: InputMaybe<Scalars['u64']['input']>;
  xLTE?: InputMaybe<Scalars['u64']['input']>;
  xNEQ?: InputMaybe<Scalars['u64']['input']>;
  y?: InputMaybe<Scalars['u64']['input']>;
  yEQ?: InputMaybe<Scalars['u64']['input']>;
  yGT?: InputMaybe<Scalars['u64']['input']>;
  yGTE?: InputMaybe<Scalars['u64']['input']>;
  yLT?: InputMaybe<Scalars['u64']['input']>;
  yLTE?: InputMaybe<Scalars['u64']['input']>;
  yNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type GetAllPlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPlayersQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH', owner?: any | null, balance?: any | null } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player', owner?: any | null, nick_name?: any | null, joined_time?: any | null } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetAirdropByKeyQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAirdropByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop', map_id?: any | null, owner?: any | null, index?: any | null, claimed?: any | null } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetBaseByKeyQueryVariables = Exact<{
  key?: InputMaybe<Scalars['String']['input']>;
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBaseByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner', map_id?: any | null, owner?: any | null, total?: any | null } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase', map_id?: any | null, owner?: any | null, x?: any | null, y?: any | null } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetUserWarriorByKeyQueryVariables = Exact<{
  key?: InputMaybe<Scalars['String']['input']>;
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserWarriorByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetWarriorConfigQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetWarriorConfigQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig', map_id?: any | null, Train_Food?: any | null, Train_Gold?: any | null, Train_Iron?: any | null, Train_Time?: any | null, Troop_Food?: any | null, Troop_Iron?: any | null, Troop_Gold?: any | null, Troop_Speed?: any | null } | null> | null } | null } | null> | null } | null };

export type GetAirdropConfigQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAirdropConfigQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig', map_id?: any | null, index?: any | null, reward_warrior?: any | null, reward_food?: any | null, reward_gold?: any | null, reward_iron?: any | null } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetWarriorByLocationQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  y?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetWarriorByLocationQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior', map_id?: any | null, x?: any | null, y?: any | null, balance?: any | null } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetTrainingByKeyQueryVariables = Exact<{
  key?: InputMaybe<Scalars['String']['input']>;
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTrainingByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training', start_time?: any | null, total?: any | null, out?: any | null } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetAllBaseQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllBaseQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase', owner?: any | null, map_id?: any | null, x?: any | null, y?: any | null } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner', owner?: any | null, map_id?: any | null, total?: any | null } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetLandByKeyQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  y?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetLandByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land', map_id?: any | null, x?: any | null, y?: any | null, owner?: any | null, building?: any | null, level?: any | null } | { __typename: 'LandCost', map_id?: any | null, x?: any | null, y?: any | null, cost_gold?: any | null, cost_iron?: any | null, cost_food?: any | null } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior', map_id?: any | null, x?: any | null, y?: any | null, balance?: any | null } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetAllLandsQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllLandsQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land', map_id?: any | null, x?: any | null, y?: any | null, owner?: any | null, building?: any | null, level?: any | null } | { __typename: 'LandCost', map_id?: any | null, x?: any | null, y?: any | null, cost_gold?: any | null, cost_iron?: any | null, cost_food?: any | null } | { __typename: 'LandMiner', map_id?: any | null, x?: any | null, y?: any | null, miner_x?: any | null, miner_y?: any | null } | { __typename: 'LandMining', map_id?: any | null, x?: any | null, y?: any | null, start_time?: any | null, mined_x?: any | null, mined_y?: any | null } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost', map_id?: any | null, x?: any | null, y?: any | null, start_time?: any | null, end_time?: any | null, target_level?: any | null, claimed?: any | null } | { __typename: 'UserWarrior' } | { __typename: 'Warrior', map_id?: any | null, x?: any | null, y?: any | null, balance?: any | null } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetEthByKeyQueryVariables = Exact<{
  key?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetEthByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH', balance?: any | null } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetLandMinerByKeyQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  y?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetLandMinerByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner', map_id?: any | null, x?: any | null, y?: any | null, miner_x?: any | null, miner_y?: any | null } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetResoucesByKeyQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetResoucesByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'HBase' } | { __typename: 'Iron', map_id?: any | null, owner?: any | null, balance?: any | null } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetBuildPriceQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBuildPriceQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice', map_id?: any | null, build_type?: any | null, gold?: any | null, food?: any | null, iron?: any | null } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetTroopsByKeyQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTroopsByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop', map_id?: any | null, owner?: any | null, index?: any | null, balance?: any | null, from_x?: any | null, from_y?: any | null, to_x?: any | null, to_y?: any | null, start_time?: any | null, distance?: any | null } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetAllTroopsQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllTroopsQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop', map_id?: any | null, owner?: any | null, index?: any | null, balance?: any | null, from_x?: any | null, from_y?: any | null, to_x?: any | null, to_y?: any | null, start_time?: any | null, distance?: any | null, retreat?: any | null } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetMiningConfigQueryVariables = Exact<{
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMiningConfigQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig', map_id?: any | null, Food_Speed?: any | null, Iron_Speed?: any | null, Gold_Speed?: any | null, Base_Gold_Speed?: any | null } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetLandMinerQueryVariables = Exact<{
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetLandMinerQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner', map_id?: any | null, x?: any | null, y?: any | null, miner_x?: any | null, miner_y?: any | null } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetLandQueryVariables = Exact<{
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetLandQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land', map_id?: any | null, x?: any | null, y?: any | null, owner?: any | null, building?: any | null, level?: any | null } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetPlayerQueryVariables = Exact<{
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetPlayerQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player', owner?: any | null, nick_name?: any | null, joined_time?: any | null } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetTroopQueryVariables = Exact<{
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetTroopQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop', map_id?: any | null, owner?: any | null, index?: any | null, balance?: any | null, from_x?: any | null, from_y?: any | null, to_x?: any | null, to_y?: any | null, start_time?: any | null, distance?: any | null, retreat?: any | null } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior' } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };

export type GetWarriorQueryVariables = Exact<{
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetWarriorQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Airdrop' } | { __typename: 'AirdropConfig' } | { __typename: 'BuildConfig' } | { __typename: 'BuildPrice' } | { __typename: 'ETH' } | { __typename: 'Fight' } | { __typename: 'Food' } | { __typename: 'FortOwner' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'HBase' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'LandMiner' } | { __typename: 'LandMining' } | { __typename: 'LandOwner' } | { __typename: 'LuckyPack' } | { __typename: 'MiningConfig' } | { __typename: 'Player' } | { __typename: 'RewardPoint' } | { __typename: 'Training' } | { __typename: 'Troop' } | { __typename: 'UpgradeCost' } | { __typename: 'UserWarrior' } | { __typename: 'Warrior', map_id?: any | null, x?: any | null, y?: any | null, balance?: any | null } | { __typename: 'WarriorConfig' } | null> | null } | null } | null> | null } | null };


export const GetAllPlayersDocument = gql`
    query getAllPlayers {
  entities(offset: 0, limit: 1000, keys: ["%"]) {
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
          __typename
          ... on HBase {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
export const GetTrainingByKeyDocument = gql`
    query getTrainingByKey($key: String, $map_id: String) {
  entities(first: 1000, keys: [$map_id, $key]) {
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
          __typename
          ... on HBase {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
            mined_x
            mined_y
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
  entities(first: 1000, keys: [$map_id, $key, "*"]) {
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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
    total_count
    edges {
      node {
        keys
        models {
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