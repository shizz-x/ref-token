import React from "react";

function MintPrice(mintPageProps) {
  return (
    <div
      className={`mint_price ${
        mintPageProps.tokenSymbol !== undefined ? "" : "undefined"
      }`}
    >
      <p>
        mint price: 1{mintPageProps.tokenSymbol} ={" "}
        {1 / parseInt(mintPageProps.tokensPerWei)}ETH
      </p>
    </div>
  );
}

export default MintPrice;
