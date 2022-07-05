import { Box, Container } from "@material-ui/core";
import React, { useContext } from "react";
import { Category } from "../models";
import CategoryForm from "./FormField/CategoryForm";
import {
  Context as CategoryContext,
  ROOT_STATUS,
} from "../context/CategoryContext";

export default () => {
  const { state, addNewCategory, setCurrentStatus } =
    useContext(CategoryContext);

  const initialValues: Category = {
    name: "",
    data: [{ id: 0, front: "", back: "" }],
  };

  const handleCategoryFormSubmit = (formValue: Category) => {
    addNewCategory({
      newCategory: { id: state.categoryList.length, ...formValue },
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
