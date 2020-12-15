import React, { useEffect } from "react";
import Button from "../ui/Button";
import "./Timer.css";

const Timer = ({ timer, setTimer }) => {
  const { isActive, timeTotal, timerVal, remaining } = timer;

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
        alert("Times up");
      }, 500);
    }
  }, [isActive]);

  return (
    <div className="timer">
      <div className="row">
        <div>
          <div className="timer__time">Currently remaining: {remaining}s</div>
        </div>
        <div className="timer__controls">
          <Button
            disabled={timerVal == 0 ? true : false}
            style={{ color: `black` }}
            className={`button button-primary button-primary-${
              isActive ? "active" : "inactive"
            }`}
            onClick={toggle}
          >
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button style={{ color: `black` }} onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
