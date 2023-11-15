import React from "react";
import { WalletContext } from "../Context/Wallet";
import { useContext } from "react";
export default function Withdraw() {
  const {
    connectWallet,
    connected,
    address,
    web3wss,
    balance,
    contractwss,
    contractWithProvider,
  } = useContext(WalletContext);

  const withdraw = async () => {
    if (connected) {
      const gasPrice = await web3wss.eth.getGasPrice();
      const gasLimit = await contractWithProvider.methods
        .withdraw()
        .estimateGas({
          from: address,
        });
      const trx = await contractWithProvider.methods.withdraw().send({
        from: address,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
      });
    }
  };

  return <div onClick={withdraw}>Withdraw</div>;
}
