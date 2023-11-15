import React from "react";
import ReactDOM from "react-dom/client";
import "./Css/index.css";
import App from "./Pages/App";
import { HashRouter, Route, Routes } from "react-router-dom";
import Wallet from "./Context/Wallet";
import Header from "./Components/Header";
import Mint from "./Pages/Mint";
import Withdraw from "./Pages/Withdraw";
import logo from "./Images/logo.svg";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Wallet>
      <Header></Header>
      <main className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Routes>
            <Route index element={<App />}></Route>
            <Route path="/mint" element={<Mint />}></Route>
            <Route path="/withdraw" element={<Withdraw />}></Route>
          </Routes>
        </header>
      </main>
    </Wallet>
  </HashRouter>
);
