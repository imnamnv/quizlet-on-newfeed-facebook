import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import Button from "./common/Button";

import {
  Context as CategoryContext,
  InitState,
  ROOT_STATUS,
} from "../context/CategoryContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),

    "&.MuiInputLabel-outlined": {
      color: "black",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "70%",
  },
  select: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
  },
  button: {
    marginLeft: 8,
    marginRight: 8,
  },
}));

export default () => {
  const { state, setCurrentCategory, setCurrentStatus } =
    useContext<InitState>(CategoryContext);
  const classes = useStyles();

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: string }>
  ) => {
    setCurrentCategory({ id: event.target.value });
  };

  const handleOnAdd = () => {
    setCurrentStatus({
      currentStatus: ROOT_STATUS.ADDING,
    });
  };

  const handleOnEdit = () => {
    setCurrentStatus({
      currentStatus: ROOT_STATUS.EDITING,
    });
  };

  return (
    <Box className={classes.root}>
      <FormControl
        size="small"
        variant="outlined"
        className={classes.formControl}
      >
        <InputLabel htmlFor="outlined-category-native-simple">
          Category
        </InputLabel>
        <Select
          className={classes.select}
          native
          value={state.currentCategory}
          onChange={handleChange}
          label="Category"
          inputProps={{
            name: "category",
            id: "outlined-category-native-simple",
          }}
        >
          {state.categoryList.map((category, index) => {
            return (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </Select>
      </FormControl>

      <Box className={classes.button}>
        <Button title="Add" handleOnClick={handleOnAdd} />
      </Box>
      <Box className={classes.button}>
        <Button title="Edit" handleOnClick={handleOnEdit} />
      </Box>
    </Box>
  );
};
