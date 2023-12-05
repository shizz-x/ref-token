import React, { useState, useRef, useEffect } from "react";
import ScrollTrigger from "react-scroll-trigger";
import bigboy from "../../../Images/bigboyabudabi.png";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const first_Paragraph_Text =
  "We understand that meeting basic financial needs is a prerequisite for discussing personal growth and self-development. Therefore, we offer the opportunity to first earn basic capital with us. We also provide guidance on how to effectively use this capital, including which methods to employ, platforms to use, and tools to leverage. Once the concern of 'earning a living' is alleviated, we can then delve into higher matters.";
const second_Paragraph_Text =
  "Each token holder will effectively become a shareholder in our company and will receive dividends, in addition to growth in the value of their assets. The mission of our ecosystem is to improve the quality of life of the holders by refining their thinking and beliefs, increasing awareness, and teaching about investments and cryptocurrency, as well as business and financial education. The discipline of body, mind, and consciousness represents a conscious choice towards daily growth and development.";

export default function Roadmap({ GSAP }) {
  const [animated, setAnimated] = useState(false);

  const [firstParagraphText, setFirstParagraphText] = useState(
    <p>{first_Paragraph_Text}</p>
  );
  const [secondParagraphText, setSecondParagraphText] = useState(
    <p>{second_Paragraph_Text}</p>
  );

  const card1 = useRef();
  const card2 = useRef();
  const card3 = useRef();
  const card4 = useRef();

  const animateText = async (progress) => {
    let karaokeText = "";
    let outerText = "";
    if (progress < 0.5) {
      for (let index = 0; index < first_Paragraph_Text.length; index++) {
        if (index < first_Paragraph_Text.length * progress * 2) {
          karaokeText += first_Paragraph_Text[index];
        } else {
          outerText += first_Paragraph_Text[index];
        }
      }

      setFirstParagraphText(
        <p>
          <karaoke>{karaokeText}</karaoke>
          {outerText}
        </p>
      );
      setSecondParagraphText(<p data="margin">{second_Paragraph_Text}</p>);
    } else {
      progress -= 0.5;
      for (let index = 0; index < second_Paragraph_Text.length; index++) {
        if (index < second_Paragraph_Text.length * progress * 2) {
          karaokeText += second_Paragraph_Text[index];
        } else {
          outerText += second_Paragraph_Text[index];
        }
      }
      setFirstParagraphText(
        <p>
          <karaoke>{first_Paragraph_Text}</karaoke>
        </p>
      );
      setSecondParagraphText(
        <p>
          <karaoke>{karaokeText}</karaoke>
          {outerText}
        </p>
      );
    }
  };
  const animate = async (self) => {
    animateText(self.progress);
    let cards = [card1, card2, card3, card4];
    document.querySelector(".landing_header-nav_links").style.color = "#e8393a";
    document.querySelector(".landing_header-nav_links").style.backgroundColor =
      "rgba(34, 39, 111, 0.4)";

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
    if (self.progress >= 0.9) {
      cards[3].current.classList.add("visible");
    } else {
      cards[3].current.classList.remove("visible");
    }
  };
  useEffect(() => {
    let tl = GSAP.timeline({
      scrollTrigger: {
        trigger: ".landing_section-roadmap",
        markers: true,
        onUpdate: animate,

        pin: true, // pin the trigger element while active
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "bottom+=500%", // end after scrolling 500px beyond the start
        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      },
    });
  }, []);

  return (
    <section className="landing_section-roadmap">
      <div className="landing_section-content">
        <span className={`${animated ? "visible" : ""}`}>РОАДМАП</span>
        <h1 className={`${animated ? "visible" : ""}`}>
          LAZY COIN the ultimate platform
        </h1>

        <div className="landing_section-roadmap_spliter">
          {firstParagraphText}
          {secondParagraphText}
        </div>

        <h3>ПО ИТОГУ ВЫ ПОЛУЧАЕТЕ:</h3>
        <div className="landing_section-roadmap_images">
          <img
            src={bigboy}
            className="landing_section-fatboyabudabi"
            alt=""
            srcset=""
          />
          <div className="info_card CARD7" ref={card1} id="CARD7">
            <h2>1</h2>
            <div>ДОХОД И ДИВЕДЕНДЫ</div>
          </div>
          <div className="info_card CARD8" ref={card2} id="CARD8">
            <h2>2</h2>
            <div>ФИНАНСОВУЮ СВОБОДУ</div>
          </div>
          <div className="info_card CARD9" ref={card3} id="CARD9">
            <h2>3</h2>
            <div>ДОХОД И ДИВЕДЕНДЫ</div>
          </div>
          <div className="info_card CARD10" ref={card4} id="CARD10">
            <h2>4</h2>
            <div>ДОХОД И ДИВЕДЕНДЫ</div>
          </div>
        </div>
      </div>
      <div className="bg_particle"></div>
    </section>
  );
}
