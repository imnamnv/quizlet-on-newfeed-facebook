import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import Button from "./common/Button";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default () => {
  const classes = useStyles();
  const [category, setCategory] = useState("");

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: string }>
  ) => {
    setCategory(event.target.value);
  };

  return (
    <Box className={classes.root}>
      <FormControl
        size="small"
        variant="outlined"
        className={classes.formControl}
      >
        <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
        <Select
          native
          value={category}
          onChange={handleChange}
          label="Category"
          inputProps={{
            name: "age",
            id: "outlined-age-native-simple",
          }}
        >
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>

      <Button title="Add" />
      <Button title="Edit" />
    </Box>
  );
};
