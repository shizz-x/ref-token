import { useEffect, useRef, useState } from "react";
import frames from "../../../Images/cloud/CloudFrames";

export default function Cloud(props) {
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
    const animate = async (status) => {
      console.log(props.progresCloud);
      if (status > 0.1) {
        firstFart.current.classList.remove("hidden");
      } else {
        firstFart.current.classList.add("hidden");
      }
      if (status > 0.2) {
        secondFart.current.classList.remove("hidden");
      } else {
        secondFart.current.classList.add("hidden");
      }
      if (status > 0.3) {
        thirdFart.current.classList.remove("hidden");
      } else {
        thirdFart.current.classList.add("hidden");
      }
      if (status > 0.4) {
        otherElements.current.classList.remove("hidden");
      } else {
        otherElements.current.classList.add("hidden");
      }
      if (status > 0.5) {
        setFirstThinkLineShow(true);
      } else {
        setFirstThinkLineShow(false);
      }
      if (status > 0.6) {
        setsecondThinkLineShow(true);
      } else {
        setsecondThinkLineShow(false);
      }
      if (status > 0.7) {
        setsecondThinkLineShow(true);
      } else {
        setsecondThinkLineShow(false);
      }
      if (status > 0.8) {
        setthirdThinkLineShow(true);
      } else {
        setthirdThinkLineShow(false);
      }

      if (status > 0.9) {
        setfourthThinkLineShow(true);
      } else {
        setfourthThinkLineShow(false);
      }
      if (status > 0.98) {
        setotherThinkShow(true);
      } else {
        setotherThinkShow(false);
      }

      return 0;
    };

    animate(props.progresCloud);
  }, [props.progresCloud]);

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
