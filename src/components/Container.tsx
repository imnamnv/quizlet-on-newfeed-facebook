import React from "react";
import ReactDOM from "react-dom";
import FlashCard from "./FlashCard";
import Header from "./Header";

export default ({ feed }: { feed: HTMLElement }) => {
  return ReactDOM.createPortal(
    <div id="nfe-container">
      <Header />
      <FlashCard />
    </div>,
    feed
  );
};
