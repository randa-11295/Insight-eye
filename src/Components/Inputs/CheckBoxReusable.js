import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
} from "@mui/material";
import useContentHook from "../../hooks/useContentHook";
export default function CheckBoxReusable(props) {

  const { getContentText } = useContentHook();
  return (
    <>
      <Typography
        color="secondary"
        variant="h6"
        sx={{ fontSize: ".9rem", fontWeight: 600, pt: 2, pb: 1 }}
      >
        {props?.label} :
      </Typography>
      <FormGroup
        onChange={props.formik?.handleChange}
        name={props.name}
        row
        sx={{ pb: 2 }}
      >
        {props.arr?.map((el) => (
          <FormControlLabel
            sx={{ width: { xs: "100%", sm: "49%" } }}
            key={el?.val}
            control={
              <Checkbox
                value={el?.val}
                name={props?.name}
                checked={props.formik?.values[props.name].includes(el.val)}
              />
            }
            label={getContentText(el?.label)}
          />
        ))}
      </FormGroup>
    </>
  );
}
