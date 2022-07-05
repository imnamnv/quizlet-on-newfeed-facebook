import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Control, useFieldArray } from "react-hook-form";
import Button from "../common/Button";
import InputField from "./InputField";

export interface ItemListFieldProps {
  name: string;
  control: Control<any>;
  label: string;
}

export default ({ name, control, label }: ItemListFieldProps) => {
  const { fields, append, remove } = useFieldArray({ name, control });
  return (
    <Box>
      <Typography variant="h5">{label}</Typography>

      <Button
        title="Add new item"
        handleOnClick={() => {
          append({
            id: fields.length,
            front: "",
            back: "",
          });
        }}
      />

      {fields.map((field, idx) => {
        return (
          <Box key={field.id}>
            <Typography variant="subtitle1">Item {idx + 1}</Typography>
            <InputField
              name={`${name}.${idx}.front` as const}
              control={control}
              label="Front"
            />
            <InputField
              name={`${name}.${idx}.back` as const}
              control={control}
              label="Back"
            />
            <Button title="Remove" handleOnClick={() => remove(idx)} />
          </Box>
        );
      })}
    </Box>
  );
};
