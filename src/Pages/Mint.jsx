import React, { useEffect, useState } from "react";
import { WalletContext } from "../Context/Wallet";
import { useContext } from "react";
import "../Css/mint.css";
import { NULL_REFFERER_ADDRESS } from "../contract/RefToken";
import TokenName from "../Components/Mint/TokenName";
import MintedAmount from "../Components/Mint/MintedAmount";
import MintPrice from "../Components/Mint/MintPrice";
import MintingAmount from "../Components/Mint/MintingAmount";
import Header from "../Components/Mint/Header";
import Inputs from "../Components/Mint/Inputs";
import DashboardInfo from "../Components/Mint/DashboardInfo";
import { useRef } from "react";

function generateRefferalLink(address) {
  const urlObj = new URL(window.location.href);
  return window.location.origin + "/mint" + "?ref=" + address;
}

const defaultState = {
  decimals: undefined,
  maxSupply: undefined,
  minTokensBuy: undefined,
  mintStarts: undefined,
  tokenName: undefined,
  tokenSymbol: undefined,
  tokensPerWei: undefined,
  totalSupply: undefined,
};
const handleClick = (e) => {
  e.target.select();
};
export default function Mint() {
  const {
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
  const [MINTPAGESHOWN, SETMINTPAGESHOWN] = useState(true);
  const [userInfo, setUserInfo] = useState(undefined);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [awaiting, setAwating] = useState(false);
  const [popupText, setPopupText] = useState("");

  const popup = useRef();

  const message = async (prefix, text, ms) => {
    popup.current.classList.add("show");
    setPopupText(prefix + ": " + text);
    setTimeout(async () => {
      popup.current.classList.remove("show");
    }, ms);
  };

  const handleChangePage = (state) => {
    SETMINTPAGESHOWN(state);
  };
  const handleChangeRefferer = (event) => {
    setRefferer(event.target.value);
  };
  const handleChangeMintAmount = (event) => {
    event.preventDefault();
    if (
      parseFloat(event.target.value) >= 0 &&
      parseFloat(event.target.value) < 3000000000 &&
      parseFloat(event.target.value) >= 0.0001 &&
      event.target.value.length < 15
    ) {
      setMintAmount(event.target.value);
    }
    if (event.target.value === "") {
      setMintAmount(0);
    }
  };
  useEffect(() => {
    setInterval(() => {
      document.title = "Mint pending!";
      setTimeout(() => {
        document.title = "Lazy coin";
      }, 3000);
    }, 6000);
  }, []);

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

  const getUserInfo = async () => {
    let userInfo = await contractwss.methods.getUserRefferer(address).call();
    setUserInfo(userInfo);
  };

  const findReffer = () => {
    const urlObj = new URL(`${window.location.href}`.replace("/#", ""));
    let ref = urlObj.searchParams.get("ref");
    return ref;
  };

  useEffect(() => {
    getStartedInfo();

    setInterval(() => {
      getStartedInfo();
    }, 10000);
  }, []);
  useEffect(() => {
    if (reffererValid(address)) {
      getUserInfo();
    } else {
      setUserInfo(undefined);
    }
  }, [address]);

  function reffererValid(refferer) {
    if (!refferer) {
      return false;
    }
    try {
      const isAddress = web3wss.utils.isAddress(refferer);
      return isAddress;
    } catch (error) {
      return false;
    }
  }
  const withdraw = async () => {
    if (canWithdraw) {
      try {
        const gasPrice = (await web3wss.eth.getGasPrice()) + 300768770n;

        const gasLimit =
          (await contractWithProvider.methods.withdraw().estimateGas({
            from: address,
          })) + 15000n;
        const trx = await contractWithProvider.methods.withdraw().send({
          from: address,
          gasPrice: gasPrice,
          gasLimit: gasLimit,
        });
        message(
          "succes",
          `Withdraw succes, hash: ${trx.transactionHash}`,
          5000
        );
      } catch (error) {
        message("error", error, 5000);
      }
    } else {
      message("warning", "you are not eligible", 5000);
    }
  };

  const mint = async () => {
    setAwating(true);
    if (
      mintAmount > 0 &&
      connected &&
      balance >=
        BigInt(web3wss.utils.toWei(mintAmount, "ether")) /
          mintPageProps.tokensPerWei
    ) {
      if (!reffererValid(refferer)) {
        try {
          const gasPrice = (await web3wss.eth.getGasPrice()) + 300768770n;
          const gasLimit =
            (await contractWithProvider.methods
              .mintWithRefferer(
                NULL_REFFERER_ADDRESS,
                BigInt(web3wss.utils.toWei(mintAmount, "ether"))
              )
              .estimateGas({
                from: address,
                value:
                  BigInt(web3wss.utils.toWei(mintAmount, "ether")) /
                  mintPageProps.tokensPerWei,
              })) + 10000n;

          const trx = await contractWithProvider.methods
            .mintWithRefferer(
              NULL_REFFERER_ADDRESS,
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

          message(
            "succes",
            `Minted ${mintAmount}, hash: ${trx.transactionHash}`,
            5000
          );

          getStartedInfo();
        } catch (error) {
          message("error", error.message, 5000);
        }
      } else {
        if (refferer.toLocaleLowerCase() == address) {
          message("error", "dont abuse, please", 2000);
          setRefferer("");
          setReffererInputAvaliavle(true);

          return 1;
        }
        try {
          const gasPrice = (await web3wss.eth.getGasPrice()) + 300768770n;
          const gasLimit =
            (await contractWithProvider.methods
              .mintWithRefferer(
                refferer,
                BigInt(web3wss.utils.toWei(mintAmount, "ether"))
              )
              .estimateGas({
                from: address,
                value:
                  BigInt(web3wss.utils.toWei(mintAmount, "ether")) /
                  mintPageProps.tokensPerWei,
              })) + 10000n;

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
          message(
            "succes",
            `Minted ${mintAmount}, hash: ${trx.transactionHash}`,
            5000
          );

          getStartedInfo();
        } catch (error) {
          message("error", error, 3000);
        }
      }
      setAwating(false);
    } else {
      message("warning", "Not allowed", 3000);
    }
  };
  return (
    <main className={`MINT ${awaiting ? "await" : ""}`}>
      <div className="mint_content">
        <div className="blur"></div>
        <div className="switch_buttons">
          <button
            className={`button-glitch ${MINTPAGESHOWN ? "selected" : ""}`}
            onClick={() => {
              handleChangePage(true);
            }}
          >
            Mint
          </button>
          <button
            className={`button-glitch ${MINTPAGESHOWN ? "" : "selected"}`}
            onClick={() => {
              handleChangePage(false);
            }}
          >
            Dashboard
          </button>
        </div>
        {MINTPAGESHOWN ? (
          <div className="mint_wrap">
            <Header></Header>
            <TokenName tokenName={mintPageProps.tokenName}></TokenName>
            <MintedAmount
              fromWei={web3wss.utils.fromWei}
              totalSupply={mintPageProps.totalSupply}
              maxSupply={mintPageProps.maxSupply}
            ></MintedAmount>
            <MintPrice
              tokensPerWei={mintPageProps.tokensPerWei}
              tokenSymbol={mintPageProps.tokenSymbol}
            ></MintPrice>
            <Inputs
              connected={connected}
              handleChangeRefferer={handleChangeRefferer}
              handleChangeMintAmount={handleChangeMintAmount}
              mintAmount={mintAmount}
              refferer={refferer}
              reffererInputAvaliavle={reffererInputAvaliavle}
            ></Inputs>
            <button
              class="mint_button"
              disabled={!connected || mintAmount <= 0}
              onClick={mint}
              role="button"
            >
              Mint
            </button>
            <MintingAmount
              fromWei={web3wss.utils.fromWei}
              toWei={web3wss.utils.toWei}
              tokensPerWei={mintPageProps.tokensPerWei}
              tokenSymbol={mintPageProps.tokenSymbol}
              mintAmount={mintAmount}
            ></MintingAmount>
            <div
              className="refferal_link"
              style={{ display: `${connected ? "block" : "none"}` }}
            >
              <p>your refferal link:</p>
              <input
                onClick={handleClick}
                type="text"
                value={generateRefferalLink(address)}
              />
            </div>
          </div>
        ) : (
          <div className="mint_wrap">
            <Header MINTPAGESHOWN></Header>
            <DashboardInfo
              fromWei={web3wss.utils.fromWei}
              userInfo={userInfo}
              tokenSymbol={mintPageProps.tokenSymbol}
              contractwss={contractwss}
              address={address}
              setCanWithdraw={setCanWithdraw}
            ></DashboardInfo>
            <button
              class="mint_button"
              disabled={!connected || !canWithdraw}
              onClick={withdraw}
              role="button"
            >
              Withdraw
            </button>
          </div>
        )}
      </div>
      <div className="popup" ref={popup}>
        {popupText}
      </div>
    </main>
  );
}
