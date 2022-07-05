import { Box, Button } from "@material-ui/core";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { InitState, ROOT_STATUS } from "../../context/CategoryContext";
import { Category } from "../../models";
import AddListField from "./AddListField";
import InputField from "./InputField";
import { Context as CategoryContext } from "../../context/CategoryContext";

export interface CategoryFormProps {
  initialValues: Category;
  onSubmit: (formValue: Category) => void;
}

export default ({ initialValues, onSubmit }: CategoryFormProps) => {
  const { setCurrentStatus } = useContext<InitState>(CategoryContext);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<any>({
    defaultValues: initialValues,
  });

  const handleFormSubmit = async (formValue: Category) => {
    try {
      await onSubmit?.(formValue);
    } catch (error) {}
  };

  const handleCancelFormSubmit = () => {
    setCurrentStatus({ currentStatus: ROOT_STATUS.LEARNING });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Category Name" />

        <AddListField name="data" control={control} label={"Item List"} />

        <Box mt={3}>
          <Button type="submit" disabled={isSubmitting}>
            Save
          </Button>
          <Button onClick={handleCancelFormSubmit} disabled={isSubmitting}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};
