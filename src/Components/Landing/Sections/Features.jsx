import React, { useRef, useState, useEffect } from "react";
import ScrollTrigger from "react-scroll-trigger";
import comics from "../../../Images/comics.png";
import comics2 from "../../../Images/comics2.png";
import fatboyy from "../../../Images/fatboydrinking.svg";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default function Features({ GSAP }) {
  const [animated, setAnimated] = useState(false);

  const card1 = useRef();
  const card2 = useRef();
  const card3 = useRef();
  const card4 = useRef();
  const card5 = useRef();
  const card6 = useRef();

  const card1additional = useRef();
  const card2additional = useRef();
  const card3additional = useRef();
  const card4additional = useRef();
  const card5additional = useRef();
  const card6additional = useRef();
  const card7additional = useRef();

  const animate = async (self) => {
    let cards = [
      card1,
      card2,
      card3,
      card4,
      card5,
      card6,
      card1additional,
      card2additional,
      card3additional,
      card4additional,
      card5additional,
      card6additional,
      card7additional,
    ];
    document.querySelector(".landing_header-nav_links").style.color = "black";
    document.querySelector(".landing_header-nav_links").style.backgroundColor =
      "rgba(255, 255, 255, 0.4)";
    if (self.progress > 0.01) {
      setAnimated(true);
    } else {
      setAnimated(false);
    }
    if (self.progress > (1 / cards.length) * 1) {
      cards[0].current.classList.add("visible");
    } else {
      cards[0].current.classList.remove("visible");
    }
    if (self.progress > (1 / cards.length) * 2) {
      cards[1].current.classList.add("visible");
    } else {
      cards[1].current.classList.remove("visible");
    }
    if (self.progress > (1 / cards.length) * 3) {
      cards[2].current.classList.add("visible");
    } else {
      cards[2].current.classList.remove("visible");
    }
    if (self.progress > (1 / cards.length) * 4) {
      cards[3].current.classList.add("visible");
    } else {
      cards[3].current.classList.remove("visible");
    }
    if (self.progress > (1 / cards.length) * 5) {
      cards[4].current.classList.add("visible");
    } else {
      cards[4].current.classList.remove("visible");
    }
    if (self.progress > (1 / cards.length) * 6) {
      cards[5].current.classList.add("visible");
    } else {
      cards[5].current.classList.remove("visible");
    }
    if (self.progress > (1 / cards.length) * 7) {
      cards[6].current.classList.add("visible");
    } else {
      cards[6].current.classList.remove("visible");
    }
    if (self.progress > (1 / cards.length) * 8) {
      cards[7].current.classList.add("visible");
    } else {
      cards[7].current.classList.remove("visible");
    }
    if (self.progress > (1 / cards.length) * 9) {
      cards[8].current.classList.add("visible");
    } else {
      cards[8].current.classList.remove("visible");
    }
    if (self.progress > (1 / cards.length) * 10) {
      cards[9].current.classList.add("visible");
    } else {
      cards[9].current.classList.remove("visible");
    }
    if (self.progress > (1 / cards.length) * 11) {
      cards[10].current.classList.add("visible");
    } else {
      cards[10].current.classList.remove("visible");
    }
    if (self.progress > (1 / cards.length) * 12) {
      cards[11].current.classList.add("visible");
    } else {
      cards[11].current.classList.remove("visible");
    }
    if (self.progress >= (1 / cards.length) * 13) {
      cards[12].current.classList.add("visible");
    } else {
      cards[12].current.classList.remove("visible");
    }
  };

  useEffect(() => {
    let tl = GSAP.timeline({
      scrollTrigger: {
        trigger: ".landing_section-features",

        onUpdate: animate,
        pin: true, // pin the trigger element while active
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "bottom+=300%", // end after scrolling 500px beyond the start
        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      },
    });
  }, []);

  return (
    <section className="landing_section-features">
      <img
        src={fatboyy}
        className={`landing_section-fatboydrinking ${
          animated ? "visible" : ""
        }`}
        alt=""
        srcset=""
      />
      <div className="landing_section-content">
        <span className={`${animated ? "visible" : ""}`}>Our Projects</span>
        <h1 className={`${animated ? "visible" : ""}`}>LAZY COIN</h1>
        <div className="landing_section-features_spliter">
          <div className="info_card CARD1" ref={card1} id="CARD1">
            <h2>1</h2>
            <div>Trading based on artificial intelligence.</div>
          </div>
          <div className="info_card CARD2" ref={card2} id="CARD2">
            <h2>2</h2>
            <div>Creation and automation of sales departments based on AI.</div>
          </div>
          <div className="info_card CARD3" ref={card3} id="CARD3">
            <h2>3</h2>
            <div>
              A digital marketing agency based on artificial intelligence{" "}
              <b>(content that we monetize into traffic)</b>.
            </div>
          </div>
          <div className="info_card CARD4" ref={card4} id="CARD4">
            <h2>4</h2>
            <div>
              An arbitrage bot that conducts automatic arbitrage trading on the
              top 200 coins.
            </div>
          </div>
          <div className="info_card CARD5" ref={card5} id="CARD5">
            <h2>5</h2>
            <div>
              An app for increasing personal efficiency, unique for its
              collective method and community interaction.
            </div>
          </div>
          <div className="info_card CARD6" ref={card6} id="CARD6">
            <h2>6</h2>
            <div>
              Creating metaverses based on the app with integration of unique
              user avatars, clothing brands, accessories, restaurants, and
              encompassing all aspects of a person's social life.
            </div>
          </div>
          <div className="info_card CARD1" ref={card1additional} id="CARD1">
            <h2>7</h2>
            <div>
              {" "}
              A gaming platform for poker and chess (the platform charges a
              commission, which is distributed among coin holders).
            </div>
          </div>
          <div className="info_card CARD2" ref={card2additional} id="CARD2">
            <h2>8</h2>
            <div>
              An educational platform for chess and poker (teaching these games
              provides the strategic thinking, emotional control, and empathy
              development necessary for a good investor).
            </div>
          </div>
          <div className="info_card CARD3" ref={card3additional} id="CARD3">
            <h2>9</h2>
            <div>
              A network of web3 games (the platform charges a commission, which
              is distributed among coin holders).
            </div>
          </div>
          <div className="info_card CARD4" ref={card4additional} id="CARD4">
            <h2>10</h2>
            <div>Creation of a social network based on our metaverse.</div>
          </div>
          <div className="info_card CARD5" ref={card5additional} id="CARD5">
            <h2>11</h2>
            <div>
              Tracking effective wallets, analyzing, and replicating their
              transactions.
            </div>
          </div>
          <div className="info_card CARD6" ref={card6additional} id="CARD6">
            <h2>12</h2>
            <div>Banking crypto-fiat processing.</div>
          </div>
          <div className="info_card CARD1" ref={card7additional} id="CARD1">
            <h2>13</h2>
            <div>
              Top leaders will gain access to vote on the board of directors and
              participate in further project development.
            </div>
          </div>
          <img src={comics} alt="" srcset="" />
          <img src={comics2} alt="" srcset="" />
        </div>
      </div>
      <div className="bg_particle"></div>
    </section>
  );
}
