import React, { useEffect, useRef, useState } from "react";
import audioIcon from "../assets/sound-icon.svg";
import "./AudioController.css";
import bgMusic from "../assets/theme.mp3";

function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioControl = useRef();

  const handleIsPlaying = () => {
    audioControl.current.volume = 0.5;
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div
        className={isPlaying ? "audio-icon" : "audio-icon off"}
        onClick={handleIsPlaying}
      >
        <img src={audioIcon} />
      </div>
      <audio id="audio" ref={audioControl} loop autoPlay muted={!isPlaying}>
        <source src={bgMusic} type="audio/mpeg" />
      </audio>
    </>
  );
}

export default AudioController;
