import React, { useEffect } from "react";
import { useState } from "react";

function MintedAmount(mintPageProps) {
  const [progres, setProgres] = useState(0);

  useEffect(() => {
    if (mintPageProps.totalSupply !== undefined) {
      setProgres(
        (
          parseInt(mintPageProps.totalSupply) /
          parseInt(mintPageProps.maxSupply)
        ).toFixed(2)
      );
    }
  }, [mintPageProps.totalSupply]);

  return (
    <>
      <div className="progres_bar">
        <div style={{ width: `${progres * 100}%` }} className="progres" />
      </div>
      <div className={`minted_amount ${progres > 0 ? "" : "undefined"}`}>
        <span>{(progres * 100).toFixed(0) + "/100%"}</span>
        <span>
          {mintPageProps.totalSupply === undefined
            ? "0"
            : mintPageProps.fromWei(mintPageProps.totalSupply, "ether")}
          /
          {mintPageProps.maxSupply === undefined
            ? "0"
            : mintPageProps.fromWei(mintPageProps.maxSupply, "ether")}{" "}
          {mintPageProps.tokenSymbol} Minted
        </span>
      </div>
    </>
  );
}

export default MintedAmount;
