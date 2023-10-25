import { defineContractComponents } from "./contractComponents";
import { world } from "./world";
import { RPCProvider, Query } from "@dojoengine/core";
import { Account, num } from "starknet";
import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/graphql';
import {SubscriptionClient } from 'graphql-subscriptions-client';
import dev_manifest from '../contracts/manifest.json'
import prod_manifest from '../contracts/manifest.json'
export type SetupNetworkResult = Awaited<ReturnType<typeof setupNetwork>>;

export async function setupNetwork() {
    const { VITE_PUBLIC_WORLD_ADDRESS, VITE_PUBLIC_NODE_URL, VITE_PUBLIC_TORII, VITE_PUBLIC_DEV,VITE_GRAPHQL_ENDPOINT } = import.meta.env;
    const client = new GraphQLClient(VITE_PUBLIC_TORII!);
    const wsClient = new SubscriptionClient(VITE_GRAPHQL_ENDPOINT,{
        reconnect: true,
        lazy: true, // only connect when there is a query
        connectionCallback: (error) => {
          error && console.error(error);
        },
    })
    const graphSdk = getSdk(client);

    const contractComponents = defineContractComponents(world);

    const manifest = VITE_PUBLIC_DEV ? dev_manifest : prod_manifest;

    // Create a new RPCProvider instance.
    const provider = new RPCProvider(VITE_PUBLIC_WORLD_ADDRESS, manifest, VITE_PUBLIC_NODE_URL);
    // const provider = new RPCProvider(WORLD_ADDRESS, import.meta.env.VITE_PUBLIC_NODE_URL!);

    return {
        contractComponents,
        provider,
        // execute: async (signer: Account, system: string, call_data: num.BigNumberish[]) => provider.execute(signer, system, call_data),
        execute: async (signer: Account, contract: string, system: string, call_data: num.BigNumberish[]) => {
            return provider.execute(signer, contract, system, call_data);
        },
        entity: async (component: string, query: Query) => provider.entity(component, query),
        entities: async (component: string, partition: number) => provider.entities(component, partition),
        world,
        graphSdk,
        wsClient
    };
}