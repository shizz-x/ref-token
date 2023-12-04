import "../Css/landing.css";
import Intro from "../Components/Landing/Sections/Intro";
import Header from "../Components/Landing/Other/Header";
import History from "../Components/Landing/Sections/History";
import Features from "../Components/Landing/Sections/Features";
import Roadmap from "../Components/Landing/Sections/Roadmap";
import Footer from "../Components/Landing/Other/Footer";
import React from "react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const GSAP = useMemo(() => gsap, []);

  return (
    <main className="App">
      <Header />
      <Intro GSAP={GSAP} />
      <History GSAP={GSAP} />
      <Features GSAP={GSAP} />
      <Roadmap GSAP={GSAP} />
      <Footer />
    </main>
  );
}
