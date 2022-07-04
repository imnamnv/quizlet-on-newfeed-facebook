import React, { useState } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import data from "../assets/txt/jobInterview.js";
import { shuffleAray } from "../utils/array";

export default () => {
  const [cards, setCards] = useState(data);

  return (
    <FlashcardArray style={{ width: "100%" }} cards={shuffleAray(cards)} />
  );
};
