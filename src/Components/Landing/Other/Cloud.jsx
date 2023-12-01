import { useEffect, useRef, useState } from "react";
import frames from "../../../Images/cloud/CloudFrames";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
export default function Cloud(props) {
  const [animated, setAnimated] = useState(false);
  const [firstThinkLineShow, setFirstThinkLineShow] = useState(false);
  const [secondThinkLineShow, setsecondThinkLineShow] = useState(false);
  const [thirdThinkLineShow, setthirdThinkLineShow] = useState(false);
  const [fourthThinkLineShow, setfourthThinkLineShow] = useState(false);
  const [otherThinkShow, setotherThinkShow] = useState(false);

  const firstFart = useRef();
  const secondFart = useRef();
  const thirdFart = useRef();
  const otherElements = useRef();

  useEffect(() => {
    const animate = async () => {
      await sleep(2000);

      firstFart.current.classList.remove("hidden");

      await sleep(1000);

      secondFart.current.classList.remove("hidden");

      await sleep(1000);

      thirdFart.current.classList.remove("hidden");

      await sleep(1000);

      otherElements.current.classList.remove("hidden");

      await sleep(1000);

      setFirstThinkLineShow(true);

      await sleep(getRandomArbitrary(1000, 2000));

      setsecondThinkLineShow(true);

      await sleep(getRandomArbitrary(1000, 2000));

      setthirdThinkLineShow(true);

      await sleep(getRandomArbitrary(1000, 2000));

      setfourthThinkLineShow(true);

      await sleep(getRandomArbitrary(1000, 2000));

      setotherThinkShow(true);

      setAnimated(true);
      return 0;
    };
    if (props.animated && !animated) {
      animate();
    }
  }, [props.animated]);

  return (
    <div className="landing_section-cloud_wrapper">
      <img src={frames[1]} id="fart" className="hidden" ref={firstFart} />
      <img src={frames[2]} id="fart" className="hidden" ref={secondFart} />
      <img src={frames[3]} id="fart" className="hidden" ref={thirdFart} />
      <div className="cloudinherit hidden" ref={otherElements}>
        <img src={frames[6]} style={{ zIndex: "2" }} />
        <img className="main_frame" style={{ zIndex: "0" }} src={frames[0]} />

        {/* first think line */}

        <img
          src={frames[4]}
          className={`${!firstThinkLineShow ? "hidden" : ""}`}
        />
        <img
          src={frames[5]}
          className={`${!firstThinkLineShow ? "hidden" : ""}`}
        />
        <img
          src={frames[7]}
          className={`${!firstThinkLineShow ? "hidden" : ""}`}
          style={{ zIndex: "0" }}
        />

        {/* second think line */}

        <img
          src={frames[19]}
          className={`${!secondThinkLineShow ? "hidden" : ""}`}
        />
        <img
          src={frames[20]}
          className={`${!secondThinkLineShow ? "hidden" : ""}`}
        />
        <img
          src={frames[21]}
          className={`${!secondThinkLineShow ? "hidden" : ""}`}
          style={{ zIndex: "0" }}
        />
        {/* third think line */}
        <img
          src={frames[28]}
          className={`${!thirdThinkLineShow ? "hidden" : ""}`}
        />
        <img
          src={frames[34]}
          className={`${!thirdThinkLineShow ? "hidden" : ""}`}
        />
        <img
          src={frames[35]}
          className={`${!thirdThinkLineShow ? "hidden" : ""}`}
        />
        {/* fourth think line */}
        <img
          src={frames[32]}
          className={`${!fourthThinkLineShow ? "hidden" : ""}`}
        />
        <img
          src={frames[33]}
          className={`${!fourthThinkLineShow ? "hidden" : ""}`}
        />
        <img
          src={frames[36]}
          className={`${!fourthThinkLineShow ? "hidden" : ""}`}
        />
        {/* other elements */}
        <img src={frames[9]} className={`${!otherThinkShow ? "hidden" : ""}`} />
        <img
          src={frames[12]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />
        <img
          src={frames[13]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />
        <img
          src={frames[14]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />
        <img
          src={frames[15]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />
        <img
          src={frames[16]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />
        <img
          src={frames[17]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />
        <img
          src={frames[18]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />
        <img
          src={frames[22]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />
        <img
          src={frames[23]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />
        <img
          src={frames[25]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />
        <img
          src={frames[26]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />

        <img
          src={frames[30]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />
        <img
          src={frames[31]}
          className={`${!otherThinkShow ? "hidden" : ""}`}
        />
      </div>
    </div>
  );
}
