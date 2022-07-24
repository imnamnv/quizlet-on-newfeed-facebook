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
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
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
  const [fileName, setFileName] = useState("");

  const [termAndDefinitionValue, setTermAndDefinitionValue] = useState("\\t");
  const [customTermAndDefinitionValue, setCustomTermAndDefinitionValue] =
    useState(" - ");

  const [rowsValue, setRowsValue] = useState("\\n");
  const [customRowsValue, setCustomRowsValue] = useState("\\n\\n");

  const [resultText, setResultText] = useState<string | ArrayBuffer>("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTermAndDefinitionValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermAndDefinitionValue(event.target.value);
  };
  const handleCustomTermAndDefinitionValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomTermAndDefinitionValue(event.target.value);
  };

  const handleRowsValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsValue(event.target.value);
  };

  const handleCustomRowsValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomRowsValue(event.target.value);
  };

  const showFile = async (event: React.ChangeEvent) => {
    event.preventDefault();

    const target = event.target as HTMLInputElement;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setResultText(text);
      setFileName(target.files[0].name);
    };
    reader.readAsText(target.files[0]);
  };

  const handleCancelFormSubmit = () => {
    setCurrentStatus({ currentStatus: ROOT_STATUS.LEARNING });
  };

  const handleImport = () => {
    const newCategory = convertToCategoryList(
      name,
      resultText,
      termAndDefinitionValue === "custom"
        ? customTermAndDefinitionValue
        : termAndDefinitionValue,
      rowsValue === "custom" ? customRowsValue : rowsValue
    );

    addNewCategory({
      newCategory: { id: uuidv4(), ...newCategory },
    });

    setCurrentStatus({ currentStatus: ROOT_STATUS.LEARNING });
  };

  return (
    <Box width={"100%"}>
      <Container>
        <Typography color="error" variant="body2">
          *Note: Format file(.txt) must be the same format as the file(.txt)
          which was exported from Quizlet
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
        <Box display="flex" alignItems={"center"}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Between term and definition
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="betweenTermAndDefinition"
              value={termAndDefinitionValue}
              onChange={handleTermAndDefinitionValueChange}
            >
              <FormControlLabel value="\t" control={<Radio />} label="Tab" />
              <FormControlLabel
                value=","
                control={<Radio />}
                label="Comma (,)"
              />

              <FormControlLabel
                value={"custom"}
                control={<Radio />}
                label={
                  <TextField
                    fullWidth
                    disabled={
                      termAndDefinitionValue === "custom" ? false : true
                    }
                    size="small"
                    value={customTermAndDefinitionValue}
                    onChange={handleCustomTermAndDefinitionValueChange}
                    label={"Custom"}
                    variant="outlined"
                  />
                }
              />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Between rows</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="betweenRow"
              value={rowsValue}
              onChange={handleRowsValueChange}
            >
              <FormControlLabel
                value="\n"
                control={<Radio />}
                label="New line"
              />
              <FormControlLabel
                value=";"
                control={<Radio />}
                label="Semicolon (;)"
              />

              <FormControlLabel
                value="custom"
                control={<Radio />}
                label={
                  <TextField
                    fullWidth
                    disabled={rowsValue === "custom" ? false : true}
                    size="small"
                    value={customRowsValue}
                    onChange={handleCustomRowsValueChange}
                    label={"Custom"}
                    variant="outlined"
                  />
                }
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box
          textAlign={"right"}
          display="flex"
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          {resultText ? (
            <Button
              title={`Import with ${fileName}`}
              handleOnClick={handleImport}
              color={"primary"}
            />
          ) : (
            <ButtonMUI
              component="label"
              variant="contained"
              startIcon={<ImportExportIcon />}
              color={"primary"}
            >
              Upload Txt
              <input type="file" accept=".txt" hidden onChange={showFile} />
            </ButtonMUI>
          )}
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
