import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function MintingAmount(mintPageProps) {
  const [currentPrice, setCurrentPrice] = useState("0");

  useEffect(() => {
    if (mintPageProps.mintAmount) {
      let res = `minting ${mintPageProps.mintAmount}${
        mintPageProps.tokenSymbol
      } for ${mintPageProps.fromWei(
        BigInt(mintPageProps.toWei(mintPageProps.mintAmount, "ether")) /
          BigInt(mintPageProps.tokensPerWei),
        "ether"
      )}ETH`;
      setCurrentPrice(res);
    }
  }, [mintPageProps.mintAmount]);
  return (
    <p
      className="minting_amount"
      style={{
        display: `${mintPageProps.mintAmount > 0 ? "block" : "none"}`,
      }}
    >
      {currentPrice}
    </p>
  );
}
