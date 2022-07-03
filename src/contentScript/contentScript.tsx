import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import FlashCard from "../components/FlashCard";
import "./contentScript.css";

function isAlreadyInjected() {
  return document.querySelector("#nfe-container") !== null;
}

let feed = document.querySelector<HTMLElement>("[role=feed]");
let region = document.querySelector<HTMLElement>("[role=region]");

if (feed && region) {
  feed.innerHTML = "";
  region.innerHTML = "";
}

const App = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAlreadyInjected()) {
        feed = document.querySelector<HTMLElement>("[role=feed]");
        region = document.querySelector<HTMLElement>("[role=region]");

        if (feed && region) {
          feed.innerHTML = "";
          region.innerHTML = "";

          ReactDOM.render(<FlashCard />, feed);
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
