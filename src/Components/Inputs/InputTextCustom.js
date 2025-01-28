import { TextField, Typography } from "@mui/material";
import CountySelector from "./CountyMenu";
import { useSelector } from "react-redux";
import useContentHook from "../../hooks/useContentHook"

const InputTextCustom = (props) => {
  const language  = useSelector((state) => state.translation.language);
  const { getContentText } = useContentHook();
  
  let isError =
    props.formik?.touched[props.name] &&
    Boolean(props.formik?.errors[props.name]);

  let textHelp =
    (props.formik?.touched[props.name] && props.formik.errors[props.name])?.replace("." , "_")||
    " ";


  const styleInput = {
    my: 1,
    " & .MuiOutlinedInput-root ": props.phone && {
      p: "0 ",
    },
    
  };

  return (
    <div>
      <Typography
        color="secondary"
        variant="h6"
        sx={{ fontSize: ".9rem", fontWeight: 600 }}
      >
        {props.label} : 
      </Typography>
      <TextField
        fullWidth
        placeholder={props.label}
        value={props.formik?.values[props.name]}
        onChange={props.formik?.handleChange}
        onBlur={props.formik?.handleBlur}
        error={isError}
        helperText={getContentText(textHelp)}
        name={props.name}
        type={props.type || "text"}
        sx={styleInput}
        multiline={props.multi || false}
        minRows={6}
        InputProps={
          props.phone &&  {
            endAdornment:language ==="ar" && <CountySelector />,
            startAdornment:language ==="en" && <CountySelector />,
          }
        }
      />
    </div>
  );
};

export default InputTextCustom;
