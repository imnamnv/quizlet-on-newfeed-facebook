import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Container from "../components/Container";
import { Provider } from "../context/CategoryContext";
import "./contentScript.css";

function isAlreadyInjected() {
  return document.querySelector("#nfe-container") !== null;
}

// let feed = document.querySelector<HTMLElement>("[role=feed]");
let feed = document.querySelector<HTMLElement>("#ssrb_feed_start + div");

let region = document.querySelector<HTMLElement>("[role=region]");
let element = document.querySelector("html");

const App = () => {
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const path = document.location.pathname;

      if (path !== "/") {
        element.dataset.nfeEnabled = "false";
      } else {
        element.dataset.nfeEnabled = "true";
      }

      if (!isAlreadyInjected()) {
        feed = document.querySelector<HTMLElement>("[role=feed]");
        region = document.querySelector<HTMLElement>("[role=region]");
        setRerender((old) => {
          return !old;
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="namnv">
      <Provider>
        {feed !== null && <Container feed={feed.parentElement} />}
      </Provider>
    </div>
  );
};

const root = document.createElement("div");

ReactDOM.render(<App />, root);
