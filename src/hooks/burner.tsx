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

  // init
  useEffect(() => {

    const setActiveAccount = async () => {
      const storage: BurnerStorage = Storage.get("burners");
      if (storage) {
        // check one to see if exists, perhaps appchain restarted
        const firstAddr = Object.keys(storage)[0];
        
        try {
          await admin.getTransactionReceipt(storage[firstAddr].deployTx)

          // set first account to active account if it was deployed.
          const burner = new Account(
            provider,
            firstAddr,
            storage[firstAddr].privateKey,
          );
          setAccount(burner);
        }
        catch {
          setAccount(undefined);
          console.log("burners not deployed, try redeploy or resetting local storage");
          return;
        }
      }
    }
  }, []);

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

  const removeAccount = (address: string) => {
    let burnner = Storage.get("burners") || {};
    delete burnner["address"];
    Storage.set("burner", burnner);
  }

  return {
    list,
    select,
    create,
    account,
    isDeploying,
    reDeployAccount,
    setPlayerName,
    isAccountDeployed,
    removeAccount,
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