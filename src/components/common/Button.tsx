import { Button } from "@material-ui/core";
import React from "react";

type Props = {
  title: string;
  handleOnClick?: () => void;
};

export default ({ title, handleOnClick }: Props) => {
  return (
    <Button
      style={{
        height: 40,
        marginLeft: 8,
        marginRight: 8,
        border: "solid 1px #93a7a0",
      }}
      variant="outlined"
      size="small"
      onClick={handleOnClick}
    >
      {title}
    </Button>
  );
};
