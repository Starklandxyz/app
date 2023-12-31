import { useCallback, useEffect, useState } from "react";
import {
  Account,
  CallData,
  ec,
  hash,
  RpcProvider,
  stark,
  TransactionFinalityStatus,
  AccountInterface,
} from "starknet";
import Storage from "../utils/storage";
import { ETH_CONTRACT_ADDRESS } from "../utils/constants";

const PREFUND_AMOUNT = "0x38D7EA4C68000"; // 0.1 Eth

const provider = new RpcProvider({
  nodeUrl: import.meta.env.VITE_PUBLIC_NODE_URL!,
});

const admin = new Account(
  provider,
  import.meta.env.VITE_PUBLIC_MASTER_ADDRESS!,
  import.meta.env.VITE_PUBLIC_MASTER_PRIVATE_KEY!,
);

type BurnerStorage = {
  [address: string]: {
    privateKey: string;
    publicKey: string;
    deployTx: string;
    active: boolean;
  };
};

interface UseBurnerOptions {
  /** 
   * The Master account is what prefunds the Burner. 
   * Optional. Pass in an account that has funds if available.
   */
  masterAccount?: AccountInterface | Account;

  /** 
   * The class hash of the account you want to deploy.
   * This has to be predeployed on the chain you are deploying to.
   */
  accountClassHash: string;

  /** 
   * Node url
   */
  nodeUrl?: string;
}

export const useBurner = () => {
  const [account, setAccount] = useState<Account>();
  const [isDeploying, setIsDeploying] = useState(false);

  const setActiveAccount = useCallback(async () => {
    const storage: BurnerStorage = Storage.get("burners");
    if (storage) {
      // try to get active account
      let activeAccount = null;
      for (let address in storage) {
        if (storage[address].active) {
          activeAccount = new Account(
            provider,
            address,
            storage[address].privateKey,
          );
        }
      }
      // set first account as active account if not
      if (!activeAccount) {
        const firstAddr = Object.keys(storage)[0];
        activeAccount = new Account(
          provider,
          firstAddr,
          storage[firstAddr].privateKey,
        );
      }

      // check if active account is deployed
      try {
        await admin.getTransactionReceipt(storage[activeAccount.address].deployTx)
        // set first account to active account if it was deployed.
        setAccount(activeAccount);
      }
      catch (ex: any) {
        if (ex.message.indexOf('Transaction hash not found') > 0) {
          // app chain restart, try to redeploy this account with private key
          try {
            console.log(`redeploy account ${activeAccount.address}`);
            await reDeployAccount(activeAccount.address);
            await setAccount(activeAccount);
            return;
          } catch {

          }
        }
        // TODO: redeploy
        setAccount(undefined);

        // set to false
        storage[activeAccount.address].active = false;
        Storage.set("burners", storage);
        console.log("burners not deployed, try redeploy or resetting local storage");
        return;
      }
    }
  }, [])

  const list = useCallback(() => {
    let storage = Storage.get("burners") || {};
    return Object.keys(storage).map((address) => {
      return {
        address,
        active: storage[address].active,
      };
    });
  }, []);

  const select = useCallback((address: string) => {
    // TODO: should check if account has been deployed.
    let storage = Storage.get("burners") || {};
    if (!storage[address]) {
      throw new Error("burner not found");
    }

    for (let addr in storage) {
      storage[addr].active = false;
    }
    storage[address].active = true;

    Storage.set("burners", storage);
    const burner = new Account(provider, address, storage[address].privateKey);
    setAccount(burner);
  }, []);

  const create = useCallback(async () => {
    setIsDeploying(true);
    const privateKey = stark.randomAddress();
    const publicKey = ec.starkCurve.getStarkKey(privateKey);
    const address = hash.calculateContractAddressFromHash(
      publicKey,
      import.meta.env.VITE_PUBLIC_ACCOUNT_CLASS_HASH!,
      CallData.compile({ publicKey }),
      0,
    );

    await prefundAccount(address, admin);

    // deploy burner
    const burner = new Account(provider, address, privateKey);
    const { transaction_hash: deployTx } = await burner.deployAccount(
      {
        classHash: import.meta.env.VITE_PUBLIC_ACCOUNT_CLASS_HASH!,
        constructorCalldata: CallData.compile({ publicKey }),
        addressSalt: publicKey,
      },
      { maxFee: 0 },
    );

    // save burner
    let storage = Storage.get("burners") || {};
    for (let address in storage) {
      storage[address].active = false;
    }
    storage[address] = {
      privateKey,
      publicKey,
      deployTx,
      active: true,
    };

    setAccount(burner);
    setIsDeploying(false);
    Storage.set("burners", storage);
    console.log("burner created: ", address);

    return address;
  }, []);

  const isAccountDeployed = async (address: string) => {
    let storage = Storage.get("burners") || {};
    if (!storage[address]) {
      throw new Error("burner not found");
    }

    try {
      await admin.getTransactionReceipt(storage[address].deployTx);
      return true;
    } catch (error) {
      throw new Error("burner not found");
    }
  }

  const reDeployAccount = async (address: string) => {
    setIsDeploying(true);
    await prefundAccount(address, admin);

    let storage = Storage.get("burners") || {};
    const privateKey = storage[address].privateKey;
    const publicKey = storage[address].publicKey;
    // redeploy burner
    const burner = new Account(provider, address, privateKey);
    const { transaction_hash: deployTx } = await burner.deployAccount(
      {
        classHash: import.meta.env.VITE_PUBLIC_ACCOUNT_CLASS_HASH!,
        constructorCalldata: CallData.compile({ publicKey }),
        addressSalt: publicKey,
      },
      { maxFee: 0 },
    );

    // save burner
    for (let address in storage) {
      storage[address].active = false;
    }
    storage[address] = {
      privateKey,
      publicKey,
      deployTx,
      active: true,
    };

    setAccount(burner);
    setIsDeploying(false);
    Storage.set("burners", storage);
    console.log("recreate burner account: ", address);
  }

  const setPlayerName = (name: string, player: string) => {
    let storage = Storage.get("burners") || {};
    if (storage[player]) {
      storage[player].name = name;
    }
  }

  const getPlayerName = (name: string, player: string) => {
    let storage = Storage.get("burners") || {};
    if (storage[player]) {
      return storage[player].name;
    }

    return "";
  }

  const removeAccount = (address: string) => {
    let burnner = Storage.get("burners") || {};
    delete burnner["address"];
    Storage.set("burner", burnner);
  }

  const exportAccounts = () => {
    // 要导出的数据对象
    let burnner = Storage.get("burners") || {};
    const jsonString = JSON.stringify(burnner);

    const blob = new Blob([jsonString], { type: "application/json" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "starkland_accounts.json"; // 下载的文件名
    downloadLink.click();
  }

  return {
    list,
    select,
    create,
    account,
    isDeploying,
    setActiveAccount,
    reDeployAccount,
    setPlayerName,
    getPlayerName,
    isAccountDeployed,
    removeAccount,
    exportAccounts
  };
};

const prefundAccount = async (address: string, account: Account) => {
  const { transaction_hash } = await account.execute(
    {
      contractAddress: ETH_CONTRACT_ADDRESS,
      entrypoint: "transfer",
      calldata: CallData.compile([address, PREFUND_AMOUNT, "0x0"]),
    },
    undefined,
    { maxFee: 0 },
  );

  return await account.waitForTransaction(transaction_hash, {
    retryInterval: 1000,
    successStates: [TransactionFinalityStatus.ACCEPTED_ON_L2],
  });
};