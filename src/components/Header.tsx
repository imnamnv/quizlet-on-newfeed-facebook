import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Button as ButtonMUI,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "./common/Button";

import {
  Context as CategoryContext,
  InitState,
  InitStateAction,
  ROOT_STATUS,
} from "../context/CategoryContext";
import Dialog from "./common/Dialog";
import { getInitState } from "../utils/storage";
import { convertToCategoryList } from "../utils/array";

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
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { state, setCurrentCategory, setCurrentStatus, deleteCategory } =
    useContext<InitState & InitStateAction>(CategoryContext);

  const classes = useStyles();

  const handleCaregoryChange = (
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

  const handleOnImport = () => {
    setCurrentStatus({
      currentStatus: ROOT_STATUS.IMPORTING,
    });
  };

  const handleOnDelete = () => {
    deleteCategory({ id: state.currentCategory });
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleOnCloseDialog = () => {
    setOpenDialog(false);
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
          onChange={handleCaregoryChange}
          label="Category"
          inputProps={{
            name: "category",
            id: "outlined-category-native-simple",
          }}
        >
          <option style={{ fontStyle: "italic" }} value={"-1"}>
            Select Category
          </option>
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
      {state.currentStatus === ROOT_STATUS.LEARNING && (
        <Box className={classes.button}>
          <Button
            title={"Delete"}
            color="secondary"
            handleOnClick={handleOpenDialog}
          />
        </Box>
      )}

      <Box className={classes.button}>
        <Button title={"Import"} handleOnClick={handleOnImport} />
      </Box>

      <Dialog
        open={openDialog}
        handleClose={handleOnCloseDialog}
        title="Are you sure to delete?"
        handleConfirm={handleOnDelete}
      />
    </Box>
  );
};
