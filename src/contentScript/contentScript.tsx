import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Container from "../components/Container";
import { Provider } from "../context/CategoryContext";
import "./contentScript.css";

function isAlreadyInjected() {
  return document.querySelector("#nfe-container") !== null;
}

let feed = document.querySelector<HTMLElement>("[role=feed]");
let region = document.querySelector<HTMLElement>("[role=region]");

const App = () => {
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAlreadyInjected()) {
        feed = document.querySelector<HTMLElement>("[role=feed]");
        region = document.querySelector<HTMLElement>("[role=region]");
        setRerender(true);
        if (feed === null || region === null) return;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="namnv">
      <Provider>
        <Container feed={feed.parentElement} />
      </Provider>
    </div>
  );
};

const root = document.createElement("div");

ReactDOM.render(<App />, root);
