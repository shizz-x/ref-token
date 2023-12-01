import React from "react";
import ReactDOM from "react-dom/client";
import "./Css/index.css";
import Landing from "./Pages/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wallet from "./Context/Wallet";
import Mint from "./Pages/Mint";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Wallet>
      <Routes>
        <Route index path="/" element={<Landing />}></Route>
        <Route path="/mint" element={<Mint />}></Route>
      </Routes>
    </Wallet>
  </BrowserRouter>
);
