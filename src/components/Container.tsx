import React, { useContext } from "react";
import ReactDOM from "react-dom";
import {
  Context as CategoryContext,
  InitState,
  ROOT_STATUS,
} from "../context/CategoryContext";
import Add from "./Add";
import Edit from "./Edit";
import FlashCard from "./FlashCard";
import Header from "./Header";

export default ({ feed }: { feed: HTMLElement }) => {
  const { state } = useContext<InitState>(CategoryContext);

  return ReactDOM.createPortal(
    <div id="nfe-container">
      <Header />
      {state?.currentStatus === ROOT_STATUS.LEARNING && <FlashCard />}
      {state?.currentStatus === ROOT_STATUS.ADDING && <Add />}
      {state?.currentStatus === ROOT_STATUS.EDITING && <Edit />}
    </div>,
    feed
  );
};
