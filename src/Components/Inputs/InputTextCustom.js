import React, { useState } from "react";
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const InputTextCustom = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const isError =
    props.formik?.touched[props.name] &&
    Boolean(props.formik?.errors[props.name]);

  const textHelp =
    (
      props.formik?.touched[props.name] && props.formik.errors[props.name]
    )?.replace(".", "_") || " ";

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const isPassword = props.type === "password";

  return (
    <div>
      <Typography
        variant="h6"
        sx={{ fontSize: ".9rem", fontWeight: 600, textTransform: "capitalize" }}
      >
        {props.label?.replaceAll("_", " ")}:
      </Typography>
      <TextField
        fullWidth
        placeholder={
          props.placeholder?.replaceAll("_", " ") ||
          props.label?.replaceAll("_", " ")
        }
        value={props.formik?.values[props.name]}
        onChange={props.formik?.handleChange}
        onBlur={props.formik?.handleBlur}
        error={isError}
        helperText={textHelp}
        name={props.name}
        size={props.small ? "small" : "medium"}
        type={isPassword && !showPassword ? "password" : "text"}
        multiline={props.multi || false}
        minRows={props.multi ? 6 : undefined}
        InputProps={{
          endAdornment: isPassword && (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default InputTextCustom;
