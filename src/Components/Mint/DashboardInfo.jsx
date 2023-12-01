import React, { useEffect, useState } from "react";

export default function DashboardInfo(props) {
  const [Posible, setPosible] = useState(undefined);

  const getPosibleReward = async () => {
    let reward = await props.contractwss.methods
      .getPosibleReward(props.address)
      .call();

    if (reward > 0n) {
      props.setCanWithdraw(true);
    } else {
      props.setCanWithdraw(false);
    }
    setPosible(props.fromWei(reward, "ether"));
  };

  useEffect(() => {
    if (props.address) {
      getPosibleReward();
    }
  }, [props.address]);

  if (props.userInfo) {
    return (
      <div className="withdraw_info">
        <p>
          Refferer:{" "}
          <a
            href={`https://debank.com/profile/${props.userInfo.refferer}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            {props.userInfo.refferer.slice(0, 6)}
          </a>
        </p>
        <p>
          Minted Amount: {props.fromWei(props.userInfo.mintedAmount, "ether")}{" "}
          {props.tokenSymbol}
        </p>
        <p>
          Refferals Minted Amount:{" "}
          {props.fromWei(props.userInfo.refferalsMintedAmount, "ether")} ETH
        </p>

        <p className={`${Posible === undefined ? "undefined" : ""}`}>
          Posible reward: {Posible || "0"} ETH
        </p>
      </div>
    );
  } else {
    return <h3>Connect Wallet Please</h3>;
  }
}
