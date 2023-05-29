import React, { useState } from "react";
import "./Section.css";

const words = [
  "A day in the life of programmer",
  "What is JavaScript?",
  "What is React?",
  "What is Programming Language?",
  "What's your name?",
  "Where are you from?",
  "This is just random word",
  "What is Remix.js?",
  "New Technologies",
  "Is programming hard?",
  "Why do you wanna become a programmer?",
  "Which programming language you like the most?",
  "What is Golang? and why do you wanna learn it?",
  "What is CSS",
];

function TypingChallenge() {
  const [game, setGame] = useState({
    start: 0,
    end: 0,
    user: "",
    arrText: "",
  });
  const [mainText, setMainText] = useState("");
  const [btnText, setBtnText] = useState("Start");
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [disabled, setDisabled] = useState(false);

  function play() {
    const randText = Math.floor(Math.random() * words.length);
    setMainText(words[randText]);
    setGame({
      ...game,
      arrText: words[randText],
    });
    setBtnText("Done");
    setDisabled(false);
    setScore(0);
    setTotalWords(0);
    setGame({
      ...game,
      start: new Date().getTime(),
    });
  }

  function end() {
    setDisabled(true);
    setMainText(`Time: ${time}s Score: ${score} out of ${totalWords}`);
    setBtnText("Start");
  }

  function results() {
    const valueOne = game.arrText.split(" ");
    const valueTwo = game.user.split(" ");
    let score = 0;
    valueOne.forEach((word, idx) => {
      if (word === valueTwo[idx]) {
        score++;
      }
    });
    setScore(score);
    setTotalWords(valueOne.length);
  }

  function handleInputChange(e) {
    setGame({
      ...game,
      user: e.target.value,
    });
  }

  function handleButtonClick() {
    if (btnText === "Start") {
      play();
    } else if (btnText === "Done") {
      setDisabled(true);
      results();
      setGame({
        ...game,
        end: new Date().getTime(),
      });
      setTime(Math.round((game.end - game.start) / 1000));
      end();
    }
  }

  return (
    <div className="container">
      <div className="main">{mainText}</div>
      <textarea
        name="words"
        className="typingArea"
        disabled={disabled}
        value={game.user}
        onChange={handleInputChange}
      ></textarea>
      <br />
      <button className="btn" onClick={handleButtonClick}>
        {btnText}
      </button>
    </div>
  );
}

export default TypingChallenge;