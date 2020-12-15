import React, { useEffect } from "react";
import Button from "../ui/Button";

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
    if (remaining === 0 && timeTotal > 0) {
      setTimer((timer) => ({
        ...timer,
        remaining: timerVal,
      }));
      setTimeout(() => {
        alert("Times up");
      }, 500);
    }
  }, [isActive]);

  const handleTimerChange = (e) => {
    setTimer((timer) => ({
      ...timer,
      remaining: e.target.value,
      timerVal: e.target.value,
    }));
  };

  return (
    <div className="timer">
      <div className="time">Currently remaining: {remaining}s</div>
      <div>Total time counted: {timeTotal}s</div>
      <div className="row">
        <Button
          disabled={timerVal == 0 ? true : false}
          className={`button button-primary button-primary-${
            isActive ? "active" : "inactive"
          }`}
          onClick={toggle}
        >
          {isActive ? "Pause" : "Start"}
        </Button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
