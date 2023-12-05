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
  const [MINTPAGESHOWN, SETMINTPAGESHOWN] = useState(true);
  const [userInfo, setUserInfo] = useState(undefined);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const handleChangePage = (state) => {
    SETMINTPAGESHOWN(state);
  };
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

  const getUserInfo = async () => {
    let userInfo = await contractwss.methods.getUserRefferer(address).call();
    console.log(userInfo);
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
    console.log(refferer);
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

  const mint = async () => {
    if (
      mintAmount > 0 &&
      connected &&
      balance >=
        BigInt(web3wss.utils.toWei(mintAmount, "ether")) /
          mintPageProps.tokensPerWei
    ) {
      if (!reffererValid(refferer)) {
        const gasPrice = await web3wss.eth.getGasPrice();
        const gasLimit = await contractWithProvider.methods
          .mintWithRefferer(
            NULL_REFFERER_ADDRESS,
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

        getStartedInfo();
      } else {
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
      }
    } else {
      alert(123);
    }
  };
  return (
    <main className="MINT">
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
            <div className="spacer">
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
          </div>
        ) : (
          <div className="mint_wrap">
            <div className="spacer">
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
          </div>
        )}
      </div>
    </main>
  );
}
