import { forwardRef, useEffect, useRef, useState } from "react";
import checkForListedLanguage from "react-syntax-highlighter/dist/cjs/checkForListedLanguage";
import Code from "../code/Code";
import hackerText from "./hackerText";
import "./_hackerTyper.scss";

const HackerTyper = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [hackTimeout, setHackTimeout] = useState(null);
  const [hackerOutput, setHackerOutput] = useState("");
  const [releaseTheNerds, setReleaseTheNerds] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // every time this text changes
    // i want to scroll codeRef to the bottom
    // and I want to see the current position of the audioRef

    document.getElementById("hacker-man").scrollTop =
      document.getElementById("hacker-man").scrollHeight;
    // get the audioRef position
    if (releaseTheNerds || audioRef.current.currentTime > 15.9) {
      // get all the videos with a class of 'hacker-video'
      document.querySelectorAll(".hacker-video").forEach((video) => {
        video.play();
        video.classList.remove("hide");
      });
      setReleaseTheNerds(true);
    }
  }, [hackerOutput]);

  const hackThePlanet = (e) => {
    e.preventDefault();
    hackerLoop();

    let index = currentWordIndex;
    let newHackerOutput = hackerOutput;
    // split up hackerText into an array of words
    const hackerTextArray = hackerText.split(" ");

    let word = hackerTextArray[index];
    while (!word) {
      newHackerOutput = newHackerOutput + word + " ";
      index += 1;
      word = hackerTextArray[index];
    }
    newHackerOutput = newHackerOutput + word + " ";
    if (index < hackerTextArray.length - 1) {
      setCurrentWordIndex(index + 1);
    } else {
      setCurrentWordIndex(0);
      newHackerOutput = "";
    }
    setHackerOutput(newHackerOutput);
  };

  const hackerLoop = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    }
    clearInterval(hackTimeout);
    setHackTimeout(null);
    setHackTimeout(
      setTimeout(() => {
        if (audioRef.current !== null) {
          audioRef.current.pause();
        }
        document.querySelectorAll(".hacker-video").forEach((video) => {
          video.pause();
        });
      }, 500)
    );
  };
  return (
    <div tabIndex={0} onKeyDown={hackThePlanet} className="hacker-typer">
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/assets/rageValley.mp3`}
      ></audio>
      <video
        className="hacker-video video-1 hide"
        title="hacker hacking"
        autoPlay
        muted
      >
        <source
          src={`${process.env.PUBLIC_URL}/assets/hacker1.mp4`}
          type="video/mp4"
        />
      </video>
      <video
        className="hacker-video video-2 hide"
        title="hacker hacking"
        autoPlay
        muted
      >
        <source
          src={`${process.env.PUBLIC_URL}/assets/hacker1.mp4`}
          type="video/mp4"
        />
      </video>
      <video
        className="hacker-video video-3 hide"
        title="hacker hacking"
        autoPlay
        muted
      >
        <source
          src={`${process.env.PUBLIC_URL}/assets/hacker1.mp4`}
          type="video/mp4"
        />
      </video>
      <video
        className="hacker-video video-4 hide"
        title="hacker hacking"
        autoPlay
        muted
      >
        <source
          src={`${process.env.PUBLIC_URL}/assets/hacker1.mp4`}
          type="video/mp4"
        />
      </video>
      <Code id="hacker-man" className={"lang-jsx"}>
        {!hackerOutput
          ? "click here and start typing! ( PC Only - sorry tablets :( )) \nWARNING: will play audio"
          : hackerOutput}
      </Code>
    </div>
  );
};

export default HackerTyper;
