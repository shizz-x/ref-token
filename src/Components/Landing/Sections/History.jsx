import React, { useEffect, useState } from "react";
import batman from "../../../Images/batmansthinking.svg";
import Cloud from "../Other/Cloud";
const defaultprog = 0.0001;
const first_Paragraph_Text =
  "The initial stage involves creating LAZYcoin to attract an audience and form a community. Acquiring LAZYcoin provides access to our products and the chance to be part of our digital ecosystem. This community unites people who share similar values and perspectives on life - love, kindness, honesty, openness, and the principles of shaping reality and consciousness. It recognizes that our reality reflects our thoughts and beliefs.";
const second_Paragraph_Text =
  "Holders of LAZYcoin will have the opportunity to profit from its value increase, supported by limited issuance and growing demand. Purchasing the token grants access to early-stage investment opportunities in our projects. These projects offer dividends of 60-120% annually, utilizing effective and safe digital and neuromarketing tools. More details about these projects can be found in our roadmap.";
export default function History({ GSAP }) {
  const [firstParagraphText, setFirstParagraphText] = useState(
    <p>{first_Paragraph_Text}</p>
  );
  const [secondParagraphText, setSecondParagraphText] = useState(
    <p>{second_Paragraph_Text}</p>
  );
  const [progresCloud, setProgressCloud] = useState(defaultprog);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    let tl = GSAP.timeline({
      scrollTrigger: {
        trigger: ".landing_section-history",

        onUpdate: animate,
        pin: true, // pin the trigger element while active
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "bottom+=600%", // end after scrolling 500px beyond the start
        scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      },
    });
  }, []);

  const animate = async (status) => {
    setAnimated(true);
    setProgressCloud(status.progress);
    document.querySelector(".landing_header-nav_links").style.color = "black";
    document.querySelector(".landing_header-nav_links").style.backgroundColor =
      "#e8393967";
    animateText(status.progress);
    if (status.progress > 0.01) {
      setAnimated(true);
    } else {
      setAnimated(false);
    }
  };
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

  return (
    <section className="landing_section-history">
      <div
        className={`landing_section-batmanthinking ${
          animated ? "visible" : ""
        }`}
      >
        <div>
          <Cloud progresCloud={progresCloud}></Cloud>
        </div>
        <img src={batman} alt="" srcset="" />
      </div>

      <div className="landing_section-content">
        <span className={`${animated ? "visible" : ""}`}>ABOUT</span>
        <h1 className={`${animated ? "visible" : ""}`}>
          Getting rich with lazy
        </h1>
        <div className="landing_section-history_spliter">
          {firstParagraphText}
          {secondParagraphText}
        </div>{" "}
      </div>
      <div className="bg_particle"></div>
    </section>
  );
}
