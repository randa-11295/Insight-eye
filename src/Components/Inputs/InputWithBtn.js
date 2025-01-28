import {
  OutlinedInput,
  FormHelperText,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DesBtn from "../Reusable/DesBtn";
import useContentHook from "../../hooks/useContentHook";

export default function InputWithBtn(props) {
  const { getContentText } = useContentHook();

  let isError =
    props.formik?.touched[props.name] &&
    Boolean(props.formik?.errors[props.name]);

  let textHelp =
    (props.formik?.touched[props.name] &&
      props?.formik?.errors[props.name]?.replaceAll(".", "_")) ||
    " ";

  return (
    <FormControl
      component={props.search ? "form" : "div"}
      fullWidth
      size={props.search ? "large" : "small"}
      onSubmit={props.formik.handleSubmit}
      sx={{ background: "white" }}
    >
      <InputLabel htmlFor="outlined-adornment-amount">
        {getContentText(props.label)}
      </InputLabel>
      <OutlinedInput
        onKeyUp={(e) => {
          e.code === "Enter" && props.formik.handleSubmit();
        }}
        sx={inputStyle}
        value={props.formik?.values[props.name]}
        onChange={props.formik?.handleChange}
        onBlur={props.formik?.handleBlur}
        name={props.name}
        error={isError}
        endAdornment={
          <InputAdornment position="end">
            <DesBtn
              type="submit"
              fun={props.formik.handleSubmit}
              text={getContentText("popUp_send")}
              place="bottom"
              withoutStyle
            >
              <SendIcon sx={{ fontSize: "1.1rem" }} />
            </DesBtn>
          </InputAdornment>
        }
        label={getContentText(props.label)}
      />
      {props.helpDes && (
        <FormHelperText sx={{ color: "error.main" }}>
          {getContentText(textHelp)}
        </FormHelperText>
      )}
    </FormControl>
  );
}

const inputStyle = {
  fontSize: { xs: ".7rem", sm: ".9rem", md: ".8rem", lg: "1rem" },
};
