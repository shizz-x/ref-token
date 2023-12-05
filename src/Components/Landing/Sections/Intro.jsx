import React, { useEffect, useState } from "react";
import hellophone from "../../../Images/hellophone.svg";
import fatboyplaying from "../../../Images/fatboyplaying.svg";
import gifts from "../../../Images/gifts.svg";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const first_Paragraph_Text =
  "Наша миссия - поднять средний уровень жизни людей с помощью осознанного инвестирования и базовых принципов финансовой грамотности, а также сформировать комьюнити лидеров мнений с экологичными ценностями, чтобы вывести коллективное сознание людей на новый уровень - уровень изобилия, достатка, счастья, финансовой свободы.";
const second_Paragraph_Text =
  "Мы призываем отказаться от устарелой парадигмы мира, ограничивающей наши возможности, и от привычки создавать дополнительные трения с реальностью. Высокие результаты в инвестировании эквивалентны не затраченному времени, а эффективности действий (а иногда - бездействия) инвестора.";
export default function SectionIntro({ GSAP }) {
  const [animationPending, setAnimationPending] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [firstParagraphText, setFirstParagraphText] = useState(
    <p>{first_Paragraph_Text}</p>
  );
  const [secondParagraphText, setSecondParagraphText] = useState(
    <p data="margin">{second_Paragraph_Text}</p>
  );

  useEffect(() => {
    let tl = GSAP.timeline({
      scrollTrigger: {
        trigger: ".landing_section-intro",
        markers: true,
        onUpdate: animate,
        pin: true, // pin the trigger element while active
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "bottom+=500%", // end after scrolling 500px beyond the start
        scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      },
    });
  }, []);

  const animate = async (status) => {
    animateText(status.progress);
    document.querySelector(".landing_header-nav_links").style.color = "white";
    document.querySelector(".landing_header-nav_links").style.backgroundColor =
      "rgba(34, 39, 111, 0.4)";
    if (status.progress > 0.01) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
    if (status.progress > 0.02 && status.progress < 0.98) {
      setAnimationPending(true);
    } else {
      setAnimationPending(false);
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
        <p data="margin">
          <karaoke>{karaokeText}</karaoke>
          {outerText}
        </p>
      );
    }
  };

  return (
    <section className="landing_section-intro">
      <img
        className={`landing_section-fatboyplaying reveal
        `}
        src={fatboyplaying}
        alt=""
        srcset=""
      />
      <img
        className={`landing_section-gifts reveal`}
        src={gifts}
        alt=""
        srcset=""
      />
      <div className="landing_section-content">
        <h1>LAZY COIN</h1>
        <div className="landing_section-spliter">
          {firstParagraphText}
          <img
            className={`landing_section-hellophone reveal ${
              animationPending ? "shake" : ""
            }`}
            src={hellophone}
            alt=""
            srcset=""
          />
          {secondParagraphText}
        </div>
      </div>
      <div className="bg_particle"></div>
    </section>
  );
}
