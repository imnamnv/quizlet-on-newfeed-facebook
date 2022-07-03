import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { FlashcardArray } from "react-quizlet-flashcard";
import "./contentScript.css";

function isAlreadyInjected() {
  return document.querySelector("#nfe-container") !== null;
}

function shuffleAray(array) {
  return array.sort(() => Math.random() - 0.5);
}

let feed = document.querySelector<HTMLElement>("[role=feed]");
let region = document.querySelector<HTMLElement>("[role=region]");

if (feed && region) {
  feed.innerHTML = "";
  region.innerHTML = "";
}

const Content = () => {
  const cards = [
    {
      id: 1,
      front: "What is the capital of <u>Alaska</u>?",
      back: "Juneau",
      frontChild: <div>Hello there</div>,
      backChild: <p>This is a back child</p>,
    },
    {
      id: 2,
      front: "What is the capital of California?",
      back: "Sacramento",
    },
    {
      id: 3,
      front: "What is the capital of New York?",
      back: "Albany",
    },
    {
      id: 4,
      front: "What is the capital of Florida?",
      back: "Tallahassee",
    },
    {
      id: 5,
      front: "What is the capital of Texas?",
      back: "Austin",
    },
    {
      id: 6,
      front: "What is the capital of New Mexico?",
      back: "Santa Fe",
    },
    {
      id: 7,
      front: "What is the capital of Arizona?",
      back: "Phoenix",
    },
  ];

  return (
    <div id="nfe-container">
      <FlashcardArray style={{ width: "100%" }} cards={shuffleAray(cards)} />
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAlreadyInjected()) {
        feed = document.querySelector<HTMLElement>("[role=feed]");
        region = document.querySelector<HTMLElement>("[role=region]");

        if (feed && region) {
          feed.innerHTML = "";
          region.innerHTML = "";

          ReactDOM.render(<Content />, feed);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div id="nfe-container"></div>;
};

const root = document.createElement("div");

ReactDOM.render(<App />, root);
