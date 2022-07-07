import { Typography } from "@material-ui/core";
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
import Import from "./Import";

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
      {state?.currentStatus === ROOT_STATUS.IMPORTING && <Import />}
      <Typography
        style={{
          fontStyle: "italic",
          alignSelf: "flex-end",
          color: "#6e6f6f",
          position: "absolute",
          bottom: 8,
        }}
        variant="body2"
      >
        By NamNV
      </Typography>
    </div>,
    feed
  );
};
