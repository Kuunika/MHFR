import React from "react";
import { FormControl, TextField, FormHelperText } from "@material-ui/core";
import InputError from "./InputError";

function TextInput(props: Props) {
  const { name, touched, error } = props;
  return (
    <FormControl className="mfl-max-width">
      <TextField {...props} error={touched && typeof error != "undefined"} />
      {error && touched && <InputError error={error} for={name}></InputError>}
    </FormControl>
  );
}

type Props = {
  value: any;
  name: string;
  label: string;
  touched: boolean | undefined;
  error: any;
  onChange: any;
  onBlur?: any;
  placeholder?: string;
  disabled?: any;
};
export default TextInput;
