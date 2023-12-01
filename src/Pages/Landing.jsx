import "../Css/landing.css";
import Intro from "../Components/Landing/Sections/Intro";
import Header from "../Components/Landing/Other/Header";
import History from "../Components/Landing/Sections/History";
import Features from "../Components/Landing/Sections/Features";
import Roadmap from "../Components/Landing/Sections/Roadmap";
import Footer from "../Components/Landing/Other/Footer";
import React, { useEffect } from "react";

export default function Landing() {
  return (
    <main className="App">
      <Header />
      <Intro />
      <History />
      <Features />
      <Roadmap />
      <Footer />
    </main>
  );
}
