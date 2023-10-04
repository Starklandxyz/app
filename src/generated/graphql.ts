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
  felt252: { input: any; output: any; }
  u64: { input: any; output: any; }
  u128: { input: any; output: any; }
};

export type Base = {
  __typename?: 'Base';
  entity?: Maybe<Entity>;
  id?: Maybe<Scalars['ContractAddress']['output']>;
  map_id?: Maybe<Scalars['u64']['output']>;
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
  Id = 'ID',
  MapId = 'MAP_ID',
  X = 'X',
  Y = 'Y'
}

export type BaseWhereInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  idGT?: InputMaybe<Scalars['String']['input']>;
  idGTE?: InputMaybe<Scalars['String']['input']>;
  idLT?: InputMaybe<Scalars['String']['input']>;
  idLTE?: InputMaybe<Scalars['String']['input']>;
  idNEQ?: InputMaybe<Scalars['String']['input']>;
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

export type ComponentUnion = Base | Eth | Food | GlobalConfig | Gold | Iron | Land | LandCost | Player | Warrior;

export enum Direction {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Eth = {
  __typename?: 'ETH';
  balance?: Maybe<Scalars['u128']['output']>;
  entity?: Maybe<Entity>;
  id?: Maybe<Scalars['ContractAddress']['output']>;
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
  Id = 'ID'
}

export type EthWhereInput = {
  balance?: InputMaybe<Scalars['String']['input']>;
  balanceGT?: InputMaybe<Scalars['String']['input']>;
  balanceGTE?: InputMaybe<Scalars['String']['input']>;
  balanceLT?: InputMaybe<Scalars['String']['input']>;
  balanceLTE?: InputMaybe<Scalars['String']['input']>;
  balanceNEQ?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  idGT?: InputMaybe<Scalars['String']['input']>;
  idGTE?: InputMaybe<Scalars['String']['input']>;
  idLT?: InputMaybe<Scalars['String']['input']>;
  idLTE?: InputMaybe<Scalars['String']['input']>;
  idNEQ?: InputMaybe<Scalars['String']['input']>;
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

export type Food = {
  __typename?: 'Food';
  balance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  id?: Maybe<Scalars['ContractAddress']['output']>;
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
  Id = 'ID'
}

export type FoodWhereInput = {
  balance?: InputMaybe<Scalars['Int']['input']>;
  balanceGT?: InputMaybe<Scalars['Int']['input']>;
  balanceGTE?: InputMaybe<Scalars['Int']['input']>;
  balanceLT?: InputMaybe<Scalars['Int']['input']>;
  balanceLTE?: InputMaybe<Scalars['Int']['input']>;
  balanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  idGT?: InputMaybe<Scalars['String']['input']>;
  idGTE?: InputMaybe<Scalars['String']['input']>;
  idLT?: InputMaybe<Scalars['String']['input']>;
  idLTE?: InputMaybe<Scalars['String']['input']>;
  idNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type GlobalConfig = {
  __typename?: 'GlobalConfig';
  MAX_MAP_X?: Maybe<Scalars['u64']['output']>;
  MAX_MAP_Y?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  id?: Maybe<Scalars['u64']['output']>;
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
  Id = 'ID',
  MaxMapX = 'MAX_MAP_X',
  MaxMapY = 'MAX_MAP_Y'
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
  id?: InputMaybe<Scalars['Int']['input']>;
  idGT?: InputMaybe<Scalars['Int']['input']>;
  idGTE?: InputMaybe<Scalars['Int']['input']>;
  idLT?: InputMaybe<Scalars['Int']['input']>;
  idLTE?: InputMaybe<Scalars['Int']['input']>;
  idNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Gold = {
  __typename?: 'Gold';
  balance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  id?: Maybe<Scalars['ContractAddress']['output']>;
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
  Id = 'ID'
}

export type GoldWhereInput = {
  balance?: InputMaybe<Scalars['Int']['input']>;
  balanceGT?: InputMaybe<Scalars['Int']['input']>;
  balanceGTE?: InputMaybe<Scalars['Int']['input']>;
  balanceLT?: InputMaybe<Scalars['Int']['input']>;
  balanceLTE?: InputMaybe<Scalars['Int']['input']>;
  balanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  idGT?: InputMaybe<Scalars['String']['input']>;
  idGTE?: InputMaybe<Scalars['String']['input']>;
  idLT?: InputMaybe<Scalars['String']['input']>;
  idLTE?: InputMaybe<Scalars['String']['input']>;
  idNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type Iron = {
  __typename?: 'Iron';
  balance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  id?: Maybe<Scalars['ContractAddress']['output']>;
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
  Id = 'ID'
}

export type IronWhereInput = {
  balance?: InputMaybe<Scalars['Int']['input']>;
  balanceGT?: InputMaybe<Scalars['Int']['input']>;
  balanceGTE?: InputMaybe<Scalars['Int']['input']>;
  balanceLT?: InputMaybe<Scalars['Int']['input']>;
  balanceLTE?: InputMaybe<Scalars['Int']['input']>;
  balanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  idGT?: InputMaybe<Scalars['String']['input']>;
  idGTE?: InputMaybe<Scalars['String']['input']>;
  idLT?: InputMaybe<Scalars['String']['input']>;
  idLTE?: InputMaybe<Scalars['String']['input']>;
  idNEQ?: InputMaybe<Scalars['String']['input']>;
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

export type Player = {
  __typename?: 'Player';
  entity?: Maybe<Entity>;
  id?: Maybe<Scalars['ContractAddress']['output']>;
  joined_time?: Maybe<Scalars['u64']['output']>;
  nick_name?: Maybe<Scalars['felt252']['output']>;
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
  Id = 'ID',
  JoinedTime = 'JOINED_TIME',
  NickName = 'NICK_NAME'
}

export type PlayerWhereInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  idGT?: InputMaybe<Scalars['String']['input']>;
  idGTE?: InputMaybe<Scalars['String']['input']>;
  idLT?: InputMaybe<Scalars['String']['input']>;
  idLTE?: InputMaybe<Scalars['String']['input']>;
  idNEQ?: InputMaybe<Scalars['String']['input']>;
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
};

export type Query = {
  __typename?: 'Query';
  baseComponents?: Maybe<BaseConnection>;
  component: Component;
  components?: Maybe<ComponentConnection>;
  entities?: Maybe<EntityConnection>;
  entity: Entity;
  ethComponents?: Maybe<EthConnection>;
  event: Event;
  events?: Maybe<EventConnection>;
  foodComponents?: Maybe<FoodConnection>;
  globalconfigComponents?: Maybe<GlobalConfigConnection>;
  goldComponents?: Maybe<GoldConnection>;
  ironComponents?: Maybe<IronConnection>;
  landComponents?: Maybe<LandConnection>;
  landcostComponents?: Maybe<LandCostConnection>;
  playerComponents?: Maybe<PlayerConnection>;
  system: System;
  systemCall: SystemCall;
  systemCalls?: Maybe<SystemCallConnection>;
  systems?: Maybe<SystemConnection>;
  warriorComponents?: Maybe<WarriorConnection>;
};


export type QueryBaseComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BaseOrder>;
  where?: InputMaybe<BaseWhereInput>;
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


export type QueryFoodComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<FoodOrder>;
  where?: InputMaybe<FoodWhereInput>;
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


export type QueryPlayerComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<PlayerOrder>;
  where?: InputMaybe<PlayerWhereInput>;
};


export type QuerySystemArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallArgs = {
  id: Scalars['Int']['input'];
};


export type QueryWarriorComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WarriorOrder>;
  where?: InputMaybe<WarriorWhereInput>;
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

export type Warrior = {
  __typename?: 'Warrior';
  balance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  id?: Maybe<Scalars['felt252']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
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
  Id = 'ID',
  Owner = 'OWNER'
}

export type WarriorWhereInput = {
  balance?: InputMaybe<Scalars['Int']['input']>;
  balanceGT?: InputMaybe<Scalars['Int']['input']>;
  balanceGTE?: InputMaybe<Scalars['Int']['input']>;
  balanceLT?: InputMaybe<Scalars['Int']['input']>;
  balanceLTE?: InputMaybe<Scalars['Int']['input']>;
  balanceNEQ?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  idGT?: InputMaybe<Scalars['String']['input']>;
  idGTE?: InputMaybe<Scalars['String']['input']>;
  idLT?: InputMaybe<Scalars['String']['input']>;
  idLTE?: InputMaybe<Scalars['String']['input']>;
  idNEQ?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type GetAllPlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPlayersQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Base' } | { __typename: 'ETH', balance?: any | null } | { __typename: 'Food' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'Player', nick_name?: any | null, joined_time?: any | null } | { __typename: 'Warrior' } | null> | null } | null } | null> | null } | null };

export type GetPlayerByKeyQueryVariables = Exact<{
  key?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPlayerByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Base' } | { __typename: 'ETH', balance?: any | null } | { __typename: 'Food' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'Player', nick_name?: any | null, joined_time?: any | null } | { __typename: 'Warrior' } | null> | null } | null } | null> | null } | null };

export type GetBaseByKeyQueryVariables = Exact<{
  key?: InputMaybe<Scalars['String']['input']>;
  map_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBaseByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', totalCount: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Base', x?: any | null, y?: any | null } | { __typename: 'ETH' } | { __typename: 'Food' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'Player' } | { __typename: 'Warrior' } | null> | null } | null } | null> | null } | null };

export type GetEthByKeyQueryVariables = Exact<{
  key?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetEthByKeyQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, components?: Array<{ __typename: 'Base' } | { __typename: 'ETH', balance?: any | null } | { __typename: 'Food' } | { __typename: 'GlobalConfig' } | { __typename: 'Gold' } | { __typename: 'Iron' } | { __typename: 'Land' } | { __typename: 'LandCost' } | { __typename: 'Player' } | { __typename: 'Warrior' } | null> | null } | null } | null> | null } | null };


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
            nick_name
            joined_time
          }
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
export const GetPlayerByKeyDocument = gql`
    query getPlayerByKey($key: String) {
  entities(first: 1000, keys: [$key]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on Player {
            nick_name
            joined_time
          }
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
export const GetBaseByKeyDocument = gql`
    query getBaseByKey($key: String, $map_id: String) {
  entities(first: 1000, keys: [$key, $map_id]) {
    totalCount
    edges {
      node {
        keys
        components {
          __typename
          ... on Base {
            x
            y
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GetAllPlayersDocumentString = print(GetAllPlayersDocument);
const GetPlayerByKeyDocumentString = print(GetPlayerByKeyDocument);
const GetBaseByKeyDocumentString = print(GetBaseByKeyDocument);
const GetEthByKeyDocumentString = print(GetEthByKeyDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getAllPlayers(variables?: GetAllPlayersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetAllPlayersQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAllPlayersQuery>(GetAllPlayersDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllPlayers', 'query');
    },
    getPlayerByKey(variables?: GetPlayerByKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetPlayerByKeyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetPlayerByKeyQuery>(GetPlayerByKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPlayerByKey', 'query');
    },
    getBaseByKey(variables?: GetBaseByKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetBaseByKeyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetBaseByKeyQuery>(GetBaseByKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBaseByKey', 'query');
    },
    getETHByKey(variables?: GetEthByKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetEthByKeyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetEthByKeyQuery>(GetEthByKeyDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getETHByKey', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;