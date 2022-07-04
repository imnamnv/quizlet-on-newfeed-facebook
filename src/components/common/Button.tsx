import { Button } from "@material-ui/core";
import React from "react";

type Props = {
  title: string;
  handleOnClick?: () => void;
};
export default ({ title, handleOnClick }: Props) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      onClick={handleOnClick}
    >
      {title}
    </Button>
  );
};
