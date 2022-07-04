import React, { useContext } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import {
  Context as CategoryContext,
  InitState,
} from "../context/CategoryContext";
import { shuffleAray } from "../utils/array";

export default () => {
  const { state } = useContext<InitState>(CategoryContext);

  const data = state.categoryList.find((category) => {
    return category.name === state.currentCategory;
  });

  return (
    <FlashcardArray
      style={{ width: "100%" }}
      cards={shuffleAray(data?.data || [])}
    />
  );
};
