import React, { useEffect, useState } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import { shuffleAray } from "../utils/array";
import data from "../assets/txt/jobInterview.js";

export default () => {
  const [cards, setCards] = useState(data);
  console.log("cards", cards);

  return (
    <div id="nfe-container">
      <FlashcardArray style={{ width: "100%" }} cards={shuffleAray(cards)} />
    </div>
  );
};
