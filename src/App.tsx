import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timingType, setTimingtype] = useState("SESSION");

  const [play, setPlay] = useState(false);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
    const playButton = document
      .getElementById("start_stop")
      ?.querySelector("i");
    if (play) {
      playButton?.classList.remove("fa-pause");
      playButton?.classList.add("fa-play");
    } else {
      playButton?.classList.remove("fa-play");
      playButton?.classList.add("fa-pause");
    }
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep") as HTMLAudioElement;
    if (!timeLeft && timingType === "SESSION") {
      setTimeLeft(breakLength * 60);
      setTimingtype("BREAK");
      audio.play();
    }
    if (!timeLeft && timingType === "BREAK") {
      setTimeLeft(sessionLength * 60);
      setTimingtype("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      timeout;
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div>
      <div className="wrapper">
        <h2>25 + 5 Clock</h2>
        <div className="break-session-length">
          <div className="length">
            <h3 id="break-label">Break Length</h3>
            <div className="operations">
              <button
                disabled={play}
                onClick={handleBreakIncrease}
                id="break-increment"
              >
                <i className="fa-solid fa-arrow-up"></i>
              </button>
              <strong id="break-length">{breakLength}</strong>
              <button
                disabled={play}
                onClick={handleBreakDecrease}
                id="break-decrement"
              >
                <i className="fa-solid fa-arrow-down"></i>
              </button>
            </div>
          </div>
          <div className="length">
            <h3 id="session-label">Session Length</h3>
            <div className="operations">
              <button
                disabled={play}
                onClick={handleSessionIncrease}
                id="session-increment"
              >
                <i className="fa-solid fa-arrow-up"></i>
              </button>
              <strong id="session-length">{sessionLength}</strong>
              <button
                disabled={play}
                onClick={handleSessionDecrease}
                id="session-decrement"
              >
                <i className="fa-solid fa-arrow-down  "></i>
              </button>
            </div>
          </div>
        </div>
        <div className="timer-wrapper">
          <div className="timer">
            <h2 id="timer-label">{title}</h2>
            <h3 id="time-left">{timeFormatter()}</h3>
          </div>
          <div className="controle">
            <button
              onClick={handlePlay}
              className="btn-operation"
              id="start_stop"
            >
              <i className="fa-solid fa-play"></i>
            </button>
            <button onClick={handleReset} className="btn-operation" id="reset">
              <i className="fa-solid fa-arrows-rotate"></i>
            </button>
          </div>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

export default App;
