import { Box, Container } from "@material-ui/core";
import React, { useContext } from "react";
import { Category } from "../models";
import {
  Context as CategortContext,
  InitState,
  ROOT_STATUS,
} from "../context/CategoryContext";
import CategoryForm from "./FormField/CategoryForm";

export default () => {
  const { state, updateCategory, setCurrentStatus } =
    useContext<InitState>(CategortContext);

  const { id, data } = state.categoryList.find((category: Category) => {
    return category.name === state.currentCategory;
  });
  const initialValue: Category = {
    name: state.currentCategory,
    data,
  };

  const handleCategoryFormSubmit = (formValue: Category) => {
    updateCategory({ category: { id, ...formValue } });

    setCurrentStatus({ currentStatus: ROOT_STATUS.LEARNING });
  };

  return (
    <Box width={"100%"}>
      <Container>
        <CategoryForm
          initialValues={initialValue}
          onSubmit={handleCategoryFormSubmit}
        />
      </Container>
    </Box>
  );
};
