import React from "react";
import TextField from "@material-ui/core/TextField";

const renderTextField = ({ input, label, autocomplete, autoFocus }) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      autoFocus={autoFocus}
      label={label}
      autoComplete={autocomplete}
      {...input}
    />
  );
};

export default renderTextField;
