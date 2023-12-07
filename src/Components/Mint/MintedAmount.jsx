import React, { useEffect, useRef } from "react";
import { useState } from "react";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function MintedAmount(mintPageProps) {
  const [progres, setProgres] = useState(0);
  const totalSupply = useRef();
  useEffect(() => {
    const animate = async () => {
      totalSupply.current.classList.add("glitch_ef");
      await sleep(1000);
      totalSupply.current.classList.remove("glitch_ef");
      return 0;
    };
    animate();
  }, [mintPageProps.totalSupply]);

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
          <minted ref={totalSupply}>
            {mintPageProps.totalSupply === undefined
              ? "0"
              : mintPageProps
                  .fromWei(mintPageProps.totalSupply, "ether")
                  .split(".")[0]}
          </minted>
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
