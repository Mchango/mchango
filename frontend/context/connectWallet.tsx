'use client';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Address,
  EIP1193Provider,
  createWalletClient,
  custom,
  publicActions,
} from 'viem';
import { sepolia, polygonMumbai } from 'viem/chains';

declare global {
  interface Window {
    ethereum: EIP1193Provider;
  }
}

export const chain = polygonMumbai;

//hoisted for type inference
const getWallet = async () => {
  const [account] = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  const wallet = createWalletClient({
    account,
    chain,
    transport: custom(window.ethereum),
  }).extend(publicActions);
  return wallet;
};

type TWalletContext = {
  connectWallet: () => ReturnType<typeof getWallet>;
  wallet?: Awaited<ReturnType<typeof getWallet>>;
  account?: Address;
};

const WalletContext = createContext<TWalletContext>({} as TWalletContext);

export default function WalletProvider({ children }: PropsWithChildren) {
  const [wallet, setWallet] = useState<Awaited<ReturnType<typeof getWallet>>>();
  const [account, setAccount] = useState<Address>();

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) throw new Error('Wallet not detected');

    const wallet = await getWallet();

    const chainId = await wallet.getChainId();
    if (chainId !== chain.id) {
      await wallet
        .switchChain({ id: chain.id })
        .catch(() => wallet.addChain({ chain }));
    }

    setAccount(wallet.account.address);
    setWallet(wallet);
    return wallet;
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', connectWallet);
      window.ethereum.on('chainChanged', connectWallet);
    }
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, account, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  return context;
};

export const useMetamaskInstalled = () => {
  //work-around for hydration errors
  const [isMetamaskInstalled, setMetaMaskInstalled] = useState(true);
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') {
      setMetaMaskInstalled(false);
    }
  }, []);
  return isMetamaskInstalled;
};
