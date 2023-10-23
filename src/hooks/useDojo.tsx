import { Account, RpcProvider } from "starknet";
import { store } from "../store/store";
import { useBurner } from "../hooks/burner";
import { useEffect, useState } from "react";

export type UIStore = ReturnType<typeof useDojo>;

export const useDojo = () => {
    const { phaserLayer} = store();
    const provider = new RpcProvider({
        nodeUrl: import.meta.env.VITE_PUBLIC_NODE_URL,
    });

    // todo: allow connection with wallet providers
    const masterAccount = new Account(provider, import.meta.env.VITE_PUBLIC_MASTER_ADDRESS!, import.meta.env.VITE_PUBLIC_MASTER_PRIVATE_KEY!)
    const { create, list, account, select, isDeploying } = useBurner();

    useEffect(() => {
        console.log("usedojo account " , account?.address);
        store.setState({ account:account })
    }, [account])

    if (phaserLayer === null) {
        throw new Error("Store not initialized");
    }

    return {
        account: {
            create,
            list,
            select,
            isDeploying
        }
    }
};