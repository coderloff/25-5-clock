import { useEffect, useRef, useState } from "react";
import "./App.css";
import Length from "./components/Length";
import Timer from "./components/Timer";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timingType, setTimingtype] = useState("SESSION");

  const [play, setPlay] = useState(false);

  const timeoutRef = useRef(0);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (timeLeft > 0 && play) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
      if (timeLeft === 0) {
        resetTimer();
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [timeLeft, play]);

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
    clearTimeout(timeoutRef.current);
    setPlay(false);
    const playButton = document
      .getElementById("start_stop")
      ?.querySelector("i");
    playButton?.classList.remove("fa-pause");
    playButton?.classList.add("fa-play");
    console.log(play);
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
  };

  const handlePlay = () => {
    clearTimeout(timeoutRef.current);
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
          <Length
            title="break"
            play={play}
            length={breakLength}
            handleIncrease={handleBreakIncrease}
            handleDecrease={handleBreakDecrease}
          />
          <Length
            title="session"
            play={play}
            length={sessionLength}
            handleIncrease={handleSessionIncrease}
            handleDecrease={handleSessionDecrease}
          />
        </div>
        <Timer
          title={title}
          timeFormatter={timeFormatter}
          handlePlay={handlePlay}
          handleReset={handleReset}
        />
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
      <div className="attribute"><h6>by Coderloff</h6></div>
    </div>
  );
};

export default App;
