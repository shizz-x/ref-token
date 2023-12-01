import React, { useEffect, useState } from "react";
import batman from "../../../Images/batmansthinking.svg";
import ScrollTrigger from "react-scroll-trigger";
import Cloud from "../Other/Cloud";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const first_Paragraph_Text =
  "Этап - создание LAZYcoin для сбора аудитории и формирование комьюнити, покупка LAZY дает возможность доступа к нашим продуктам и возможность стать частью нашей digital-экосистемы. Это сообщесто людей с одинаковыми ценностями и взглядами на жизнь (любовь, доброта, честность, открытость, принципы формирование реальности, осознанность, понимание, что реальность - это отображение наших мыслей и установок).";
const second_Paragraph_Text =
  "Держатели LAZY смогут заработать на росте его стоимости, обеспеченном ограниченной эмиссией и растущим спросом, поскольку покупка токена открывает доступ к возможностям инвестирования в наши проекты на ранних стадиях (дивиденды 60-120% годовых на эффективных безопасных инструментах digital и нейромаркетинга, подробнее об этих проектах - в дробной карте)";
export default function History() {
  const [firstParagraphText, setFirstParagraphText] = useState(
    <p>{first_Paragraph_Text}</p>
  );
  const [secondParagraphText, setSecondParagraphText] = useState(
    <p>{second_Paragraph_Text}</p>
  );
  const [animated, setAnimated] = useState(false);

  const animate = async () => {
    if (animated) {
      return 0;
    }

    let resultText = "";
    let splitedText = first_Paragraph_Text.split(" ");
    await sleep(1000);
    setAnimated(true);
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
    return 0;
  };

  return (
    <section data-scroll-section className="landing_section-history">
      <div
        className={`landing_section-batmanthinking ${
          animated ? "visible" : ""
        }`}
      >
        <img src={batman} alt="" srcset="" />
      </div>

      <div className="landing_section-content">
        <span className={`${animated ? "visible" : ""}`}>ИСТРИЯ</span>
        <h1 className={`${animated ? "visible" : ""}`}>
          Getting rich with lazy
        </h1>
        <div className="landing_section-history_spliter">
          {firstParagraphText}
          {secondParagraphText}
        </div>{" "}
        <ScrollTrigger onEnter={animate}>
          <Cloud animated={animated}></Cloud>{" "}
        </ScrollTrigger>
      </div>
      <div className="bg_particle"></div>
    </section>
  );
}
