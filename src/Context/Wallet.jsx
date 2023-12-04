import { createContext } from "react";
import { useMemo, useState, useEffect } from "react";

import { sepolia, eth } from "../RPC/Chains";
import { TOKEN_ADDRESS, TOKEN_ABI } from "../contract/RefToken";

import Web3 from "web3";

export const WalletContext = createContext();

export default function Wallet({ children }) {
  const [address, setAddress] = useState("");
  const [balance, balanceSet] = useState(0);
  const [chainId, chainIdSet] = useState(null);
  const [connected, connectedSet] = useState(false);
  const [contractWithProvider, setContractWithProvider] = useState();

  const detectProvider = () => {
    if (window.ethereum) {
      return window.ethereum;
    }
    return undefined;
  };

  const provider = useMemo(() => detectProvider(), [window.ethereum]);

  const web3wss = useMemo(() => new Web3(sepolia.ws_node), []);

  const contractwss = useMemo(
    () => new web3wss.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS)
  );

  const disconnect = () => {
    connectedSet(null);
    balanceSet(0);
    chainIdSet(null);
    setAddress(null);
  };

  function handleAccountsChanged(accs) {
    const getWalletInfo = () => {
      provider
        .request({ method: "eth_chainId" })
        .then((chain) => {
          chainIdSet(chain);
          console.log(chain);
        })
        .catch((err) => console.log(err));
      web3wss.eth
        .getBalance(accs[0])
        .then((balance) => balanceSet(balance))
        .catch((err) => console.log(err));
    };
    setAddress(accs[0]);
    connectedSet(true);
    setContractWithProvider(
      new new Web3(provider).eth.Contract(TOKEN_ABI, TOKEN_ADDRESS)
    );

    getWalletInfo();
  }
  const connectWallet = () => {
    return provider
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (connected) {
      const listner = async () => {
        window.ethereum.on("chainChanged", (chainIdInScope) => {
          if (chainIdInScope === sepolia.id) {
            window.location.reload();
          } else {
            disconnect();
          }
        });
      };
      listner();
    }
  }, [connected]);

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        chainId,
        connectWallet,
        connected,
        web3wss,
        contractwss,
        contractWithProvider,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
