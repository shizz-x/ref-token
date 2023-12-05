import React from "react";
import { WalletContext } from "../../Context/Wallet";
import { useContext } from "react";

export default function Header({ MINTPAGESHOWN }) {
  const {
    address,
    balance,
    chainId,
    connectWallet,
    connected,
    web3wss,
    disconnect,
    approveTokenSpend,
  } = useContext(WalletContext);
  return (
    <header>
      <div className="header_content">
        <div className="header_logo">
          {!MINTPAGESHOWN ? "Mint" : "Dashboard"}
        </div>
        <div className="header_connect_content">
          <div
            className="button connect tooltip"
            onClick={() => {
              if (!connected) {
                connectWallet();
              } else {
                disconnect();
              }
            }}
          >
            {connected ? address.slice(0, 8) : "Connect"}
            <span
              style={{ display: `${connected ? "block" : "none"}` }}
              className="tooltiptext"
            >
              <div className="balance">
                {connected
                  ? `${web3wss.utils.fromWei(balance, "ether")}`.slice(0, 6) +
                    " ETH"
                  : "0ETH"}
              </div>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
