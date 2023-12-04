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

  const animate = async () => {
    if (animated) {
      return 0;
    }
    setAnimated(true);

    let cards = [card1, card2, card3, card4, card5, card6];

    for (let index = 0; index < cards.length; index++) {
      cards[index].current.classList.add("visible");
      await sleep(2000);
    }
  };

  useEffect(() => {
    let tl = GSAP.timeline({
      scrollTrigger: {
        trigger: ".landing_section-features",
        markers: true,

        pin: true, // pin the trigger element while active
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "bottom+=5000px", // end after scrolling 500px beyond the start
        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      },
    });
  }, []);

  return (
    <section className="landing_section-features">
      <img
        src={fatboyy}
        className="landing_section-fatboydrinking"
        alt=""
        srcset=""
      />
      <div className="landing_section-content">
        <span className={`${animated ? "visible" : ""}`}>
          НАШИ ПРЕИМУЩЕСТВА
        </span>
        <h1 className={`${animated ? "visible" : ""}`}>LAZY COIN</h1>
        <ScrollTrigger onEnter={animate}>
          <div className="landing_section-features_spliter">
            <div className="info_card CARD1" ref={card1} id="CARD1">
              <h2>1</h2>
              <div>
                Агентство digital-маркетинга на базе искусственного интеллекта{" "}
                <b>(контент, который мы монетизируем в трафик)</b>
              </div>
            </div>
            <div className="info_card CARD2" ref={card2} id="CARD2">
              <h2>2</h2>
              <div>
                Арбитражный бот ведет автоматическую арбитражную торговлю на топ
                200 монет
              </div>
            </div>
            <div className="info_card CARD3" ref={card3} id="CARD3">
              <h2>3</h2>
              <div>Трейдинг на базе искусственного интеллекта</div>
            </div>
            <div className="info_card CARD4" ref={card4} id="CARD4">
              <h2>4</h2>
              <div>
                Приложение по повышению личной эффективности, уникальность
                которого в коллективном методе и взаимодействии внутри комьюнити
              </div>
            </div>
            <div className="info_card CARD5" ref={card5} id="CARD5">
              <h2>5</h2>
              <div>
                Создание метовселенных на базе приложения с интеграцией
                уникальных аватаров пользователей, брендов одежды и аксессуаров,
                ресторанов, всей социальной жизни человека
              </div>
            </div>
            <div className="info_card CARD6" ref={card6} id="CARD6">
              <h2>6</h2>
              <div>
                Игровая платформа по покеру, шахматам (платформа взимает
                комиссию, комиссия распределятся между держателями коина)
              </div>
            </div>

            <img src={comics} alt="" srcset="" />
            <img src={comics2} alt="" srcset="" />
          </div>
        </ScrollTrigger>
      </div>
      <div className="bg_particle"></div>
    </section>
  );
}
