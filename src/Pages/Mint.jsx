import React, { useEffect, useState } from "react";
import { WalletContext } from "../Context/Wallet";
import { useContext } from "react";

function getRefFromUrl(url) {
  const urlObj = new URL(url);

  const ref = urlObj.searchParams.get("ref");
  return ref || "";
}
function generateRefferalLink(address) {
  const urlObj = new URL(window.location.href);
  return window.location.origin + "/#/mint" + "?ref=" + address;
}

const defaultState = {
  decimals: 18n,
  maxSupply: 3000000000000000000000000n,
  minTokensBuy: 1000000000n,
  mintStarts: true,
  tokenName: "",
  tokenSymbol: "MST",
  tokensPerWei: 100n,
  totalSupply: 210000000000000000000000n,
};

export default function Mint() {
  const {
    connectWallet,
    connected,
    address,
    web3wss,
    balance,
    contractwss,
    contractWithProvider,
  } = useContext(WalletContext);

  const [refferer, setRefferer] = useState("");
  const [reffererInputAvaliavle, setReffererInputAvaliavle] = useState(true);
  const [mintAmount, setMintAmount] = useState(0);
  const [mintPageProps, setMintPageProps] = useState(defaultState);

  const handleChangeRefferer = (event) => {
    event.preventDefault();

    setRefferer(event.target.value);
  };
  const handleChangeMintAmount = (event) => {
    event.preventDefault();
    setMintAmount(event.target.value);
  };

  const getStartedInfo = async () => {
    let decimals = await contractwss.methods.decimals().call();
    let totalSupply = await contractwss.methods.totalSupply().call();
    let maxSupply = await contractwss.methods.maxSupply().call();
    let tokenName = await contractwss.methods.name().call();
    let tokenSymbol = await contractwss.methods.symbol().call();
    let mintStarts = await contractwss.methods.mintStarts().call();
    let tokensPerWei = await contractwss.methods.mintPrice().call();
    let minTokensBuy = await contractwss.methods.minBuy().call();
    let ref = findReffer();

    if (reffererValid(ref)) {
      setRefferer(ref);
      setReffererInputAvaliavle(false);
    }
    setMintPageProps({
      decimals,
      totalSupply,
      maxSupply,
      tokenName,
      tokenSymbol,
      mintStarts,
      tokensPerWei,
      minTokensBuy,
    });
  };
  const findReffer = () => {
    const urlObj = new URL(`${window.location.href}`.replace("/#", ""));
    let ref = urlObj.searchParams.get("ref");
    return ref;
  };

  useEffect(() => {
    getStartedInfo();
  }, []);

  function reffererValid(refferer) {
    if (!refferer) {
      return false;
    }
    try {
      const isAddress = web3wss.utils.isAddress(refferer);
      return true;
    } catch (error) {
      return false;
    }
  }

  const mint = async () => {
    console.log(refferer);
    if (
      mintAmount > 0 &&
      reffererValid(refferer) &&
      connected &&
      balance >=
        BigInt(web3wss.utils.toWei(mintAmount, "ether")) /
          mintPageProps.tokensPerWei
    ) {
      if (refferer == address) {
        setRefferer("");
        setReffererInputAvaliavle(true);
        return 1;
      }
      const gasPrice = await web3wss.eth.getGasPrice();
      const gasLimit = await contractWithProvider.methods
        .mintWithRefferer(
          refferer,
          BigInt(web3wss.utils.toWei(mintAmount, "ether"))
        )
        .estimateGas({
          from: address,
          value:
            BigInt(web3wss.utils.toWei(mintAmount, "ether")) /
            mintPageProps.tokensPerWei,
        });

      const trx = await contractWithProvider.methods
        .mintWithRefferer(
          refferer,
          BigInt(web3wss.utils.toWei(mintAmount, "ether"))
        )
        .send({
          from: address,
          value:
            BigInt(web3wss.utils.toWei(mintAmount, "ether")) /
            mintPageProps.tokensPerWei,
          gasLimit: gasLimit,
          gasPrice: gasPrice,
        });

      getStartedInfo();
    } else {
      alert(123);
    }
  };

  return (
    <>
      <p>{mintPageProps.tokenName} MINT PAGE</p>
      <p>
        {mintPageProps.totalSupply == undefined
          ? "0"
          : web3wss.utils.fromWei(mintPageProps.totalSupply, "ether")}
        /
        {mintPageProps.maxSupply == undefined
          ? "0"
          : web3wss.utils.fromWei(mintPageProps.maxSupply, "ether")}{" "}
        {mintPageProps.tokenSymbol} Minted
      </p>
      <p>
        mint price: 1{mintPageProps.tokenSymbol} ={" "}
        {1 / parseInt(mintPageProps.tokensPerWei)}ETH
      </p>
      <input
        className="ref_input"
        disabled={!connected || !reffererInputAvaliavle}
        placeholder="Refferer"
        value={refferer}
        onChange={handleChangeRefferer}
        type="text"
        name=""
        id=""
      />
      <input
        className="ref_input"
        type="number"
        name=""
        disabled={!connected}
        value={mintAmount}
        onChange={handleChangeMintAmount}
        id=""
        placeholder="Amount"
      />
      <button disabled={!connected} onClick={mint} className="ref_input">
        MINT
      </button>
      <p style={{ display: `${mintAmount > 0 ? "block" : "none"}` }}>
        minting {mintAmount}
        {mintPageProps.tokenSymbol} for{" "}
        {web3wss.utils.fromWei(
          BigInt(web3wss.utils.toWei(mintAmount, "ether")) /
            mintPageProps.tokensPerWei,
          "ether"
        )}
        ETH
      </p>
      <p style={{ display: `${connected ? "block" : "none"}` }}>
        your ref link: {generateRefferalLink(address)}
      </p>
    </>
  );
}
