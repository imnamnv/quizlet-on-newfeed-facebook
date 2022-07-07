import React, { useContext } from "react";
import { Box, Container } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../models";
import CategoryForm from "./FormField/CategoryForm";

import {
  Context as CategoryContext,
  InitState,
  InitStateAction,
  ROOT_STATUS,
} from "../context/CategoryContext";

export default () => {
  const { state, addNewCategory, setCurrentStatus } = useContext<
    InitState & InitStateAction
  >(CategoryContext);

  const initialValues: Category = {
    name: "",
    data: [{ id: uuidv4(), front: "", back: "" }],
  };

  const handleCategoryFormSubmit = (formValue: Category) => {
    addNewCategory({
      newCategory: { id: uuidv4(), ...formValue },
    });

    setCurrentStatus({ currentStatus: ROOT_STATUS.LEARNING });
    window.scrollTo(0, 0);
  };
  return (
    <Box width="100%">
      <Container>
        <CategoryForm
          initialValues={initialValues}
          onSubmit={handleCategoryFormSubmit}
        />
      </Container>
    </Box>
  );
};
