import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Context as CategoryContext,
  InitState,
  InitStateAction,
  ROOT_STATUS,
} from "../context/CategoryContext";
import { getInitState } from "../utils/storage";
import Add from "./Add";
import Edit from "./Edit";
import FlashCard from "./FlashCard";
import Header from "./Header";

export default ({ feed }: { feed: HTMLElement }) => {
  const { state, setState } = useContext<InitState & InitStateAction>(
    CategoryContext
  );

  useEffect(() => {
    (async () => {
      const data = await getInitState();
      if (Object.keys(data).length !== 0) {
        setState({ initState: data });
      }
    })();
  }, []);

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
