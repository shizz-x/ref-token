import React from "react";
import "../../Css/mint.css";
export default function TokenName(mintPageProps) {
  return (
    <p
      className={`token_name ${
        mintPageProps.tokenName === undefined ? "undefined" : ""
      }`}
    >
      {mintPageProps.tokenName}
    </p>
  );
}
