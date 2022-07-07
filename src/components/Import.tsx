import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { convertToCategoryList } from "../utils/array";
import {
  Context as CategoryContext,
  InitState,
  InitStateAction,
  ROOT_STATUS,
} from "../context/CategoryContext";
import {
  Box,
  Button as ButtonMUI,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import Button from "./common/Button";

export default () => {
  const { state, addNewCategory, setCurrentStatus } = useContext<
    InitState & InitStateAction
  >(CategoryContext);

  const [name, setName] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const showFile = async (event: React.ChangeEvent) => {
    event.preventDefault();

    const target = event.target as HTMLInputElement;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const newCategory = convertToCategoryList(name, text);
      addNewCategory({
        newCategory: { id: uuidv4(), ...newCategory },
      });

      setCurrentStatus({ currentStatus: ROOT_STATUS.LEARNING });
    };
    reader.readAsText(target.files[0]);
  };

  const handleCancelFormSubmit = () => {
    setCurrentStatus({ currentStatus: ROOT_STATUS.LEARNING });
  };

  return (
    <Box width={"100%"}>
      <Container>
        <Typography color="error" variant="body2">
          *Note: Format file must be:
        </Typography>
        <Typography color="error" variant="body2">
          front1|back1
        </Typography>
        <Typography color="error" variant="body2">
          front2|back2
        </Typography>
        <Typography color="error" variant="body2">
          ...
        </Typography>
        <Box my={1}>
          <TextField
            fullWidth
            size="small"
            value={name}
            onChange={onChange}
            label={"Set name Category"}
            variant="outlined"
          />
        </Box>

        <Box
          textAlign={"right"}
          display="flex"
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <ButtonMUI
            component="label"
            variant="contained"
            startIcon={<ImportExportIcon />}
            color={"primary"}
          >
            Upload Txt
            <input type="file" accept=".txt" hidden onChange={showFile} />
          </ButtonMUI>
          <Box ml={1}>
            <Button
              title="Cancel"
              handleOnClick={handleCancelFormSubmit}
              color={"secondary"}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
