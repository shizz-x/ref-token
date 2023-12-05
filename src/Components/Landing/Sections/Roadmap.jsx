import React, { useState, useRef, useEffect } from "react";
import ScrollTrigger from "react-scroll-trigger";
import bigboy from "../../../Images/bigboyabudabi.png";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const first_Paragraph_Text =
  "Мы понимаем, что без базового закрытия финансовых потребностей человека трудно говорить о личностном росте и саморазвитии, поэтому мы даем возможность изначально с нами заработать базовый капитал и научим, как его эффективность использовать - какими методами, на каких площадках, с помощью какие инструментов, а когда мы освободим ваши головы от задачи «заработать себе на жизнь», - тогда уже поговорим о высоком.";
const second_Paragraph_Text =
  "Каждый держатель токена фактически станет акционером нашей компании и будет получать деведенды (+рост стоимости своих активов) Миссия нашей экосистемы в повышении качества жизни холдеров через проработку мышления и установок, рост осознанности, обучение инвестициям и криптовалюте, бизнес и финансовое образование. Дисциплина тела, ума, сознания - это осознанный выбор в сторону ежедневного роста и развития";

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
