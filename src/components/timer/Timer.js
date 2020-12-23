import React, { useEffect } from "react";
import { convertSecondsToTimeString } from "../../utils/helpers";
import Button from "../ui/Button";
import bell from "../../assets/sounds/ship_bell.wav"
import beeper from "../../assets/sounds/beeper.wav"
import "./Timer.css";

const Timer = ({ timer, setTimer }) => {
  const { isActive, timeTotal, timerVal, remaining } = timer;


  //add chime for timer
  const chime = new Audio(bell)
  const beep = new Audio(beeper)

  const playsound = sound => {
    sound.play()
  }

  //switch Timer on or Off
  const toggle = () => {
    setTimer((timer) => ({
      ...timer,
      isActive: !isActive,
    }));
  };

  const reset = () => {
    setTimer((timer) => ({
      ...timer,
      remaining: timerVal,
      isActive: false,
    }));
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      if (remaining > 0) {
        interval = setInterval(() => {
          setTimer((timer) => ({
            ...timer,
            remaining: remaining - 1,
            timeTotal: timeTotal + 1,
          }));
        }, 1000);
      } else toggle();
    } else if (!isActive && remaining !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (remaining === 0 && timeTotal > 0 && timerVal > 0) {
      setTimer((timer) => ({
        ...timer,
        remaining: timerVal,
      }));
      setTimeout(() => {
        playsound(beep);
      }, 500);
      setTimeout(() => {
        alert('TImes Up')
      }, 700)
    }
  }, [isActive]);

  return (
    <div className="timer">
      <div className="row align-right">
        <span className="timer__remaining">
          Remaining: {convertSecondsToTimeString(remaining)}
        </span>
      </div>

      <div className="timer__controls">
        <div className="row">
          <div className="timer__controls__startbutton">
            <Button
              disabled={timerVal == 0 ? true : false}
              className={isActive ? "active" : "inactive"}
              onClick={toggle}
            >
              {isActive ? "Pause" : "Start"}
            </Button>
          </div>
          <div className="timer__controls__resetbutton">
            <Button disabled={timerVal == 0 ? true : false} onClick={reset}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
