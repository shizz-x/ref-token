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
    setTimeout(() => {
      setAnimationPending(true);
    }, 1000);
  }, []);

  useEffect(() => {
    let tl = GSAP.timeline({
      scrollTrigger: {
        trigger: ".landing_section-intro",
        markers: true,
        onUpdate: animate,
        pin: true, // pin the trigger element while active
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "bottom+=300%", // end after scrolling 500px beyond the start
        scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      },
    });
  }, []);

  const animate = async (status) => {
    if (status.progress > 0.1) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  };

  useEffect(() => {
    const animate = async () => {
      let resultText = "";
      let splitedText = first_Paragraph_Text.split(" ");

      for (let i = 0; i < splitedText.length; i++) {
        resultText += " " + splitedText[i];
        let notRevealedWord = "";
        for (let j = 0; j < splitedText.length; j++) {
          if (j > i) {
            notRevealedWord += " " + splitedText[j];
          }
        }
        await sleep(100);
        setFirstParagraphText(
          <p>
            <karaoke>{resultText}</karaoke>
            {notRevealedWord}
          </p>
        );
      }

      resultText = "";
      splitedText = second_Paragraph_Text.split(" ");

      for (let i = 0; i < splitedText.length; i++) {
        resultText += " " + splitedText[i];
        let notRevealedWord = "";
        for (let j = 0; j < splitedText.length; j++) {
          if (j > i) {
            notRevealedWord += " " + splitedText[j];
          }
        }
        await sleep(100);
        setSecondParagraphText(
          <p data="margin">
            <karaoke>{resultText}</karaoke>
            {notRevealedWord}
          </p>
        );
      }
      setAnimationPending(false);
      return 0;
    };
    if (animationPending) {
      animate();
    }
  }, [animationPending]);

  return (
    <section className="landing_section-intro">
      <img
        className={`landing_section-fatboyplaying ${
          loaded ? "reveal" : "hidden"
        }`}
        src={fatboyplaying}
        alt=""
        srcset=""
      />
      <img
        className={`landing_section-gifts ${loaded ? "reveal" : "hidden"}`}
        src={gifts}
        alt=""
        srcset=""
      />
      <div className="landing_section-content">
        <h1>LAZY COIN</h1>
        <div className="landing_section-spliter">
          {firstParagraphText}
          <img
            className={`landing_section-hellophone ${
              loaded ? "reveal" : "hidden"
            } ${animationPending ? "shake" : ""}`}
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
