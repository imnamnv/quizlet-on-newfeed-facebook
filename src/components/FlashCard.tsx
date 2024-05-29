import React, { useContext } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import {
  Context as CategoryContext,
  InitState,
} from "../context/CategoryContext";
import { Category } from "../models";
import { shuffleAray } from "../utils/array";

export default () => {
  const { state } = useContext<InitState>(CategoryContext);

  const data = state.categoryList?.find((category: Category) => {
    return category?.id === state.currentCategory;
  });

  console.log("shuffleAray(data?.data", shuffleAray(data?.data));
  return (
    <FlashcardArray
      cards={shuffleAray(data?.data || [])}
      frontContentStyle={{
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30,
      }}
      backContentStyle={{
        backgroundColor: "white",
        height: "auto",
        padding: 20,
        fontSize: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};
