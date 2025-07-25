import { TextField, MenuItem, Typography, Box } from "@mui/material";

export default function SelectCustom(props) {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ fontSize: ".9rem", fontWeight: 600, mb: 1, textTransform: "capitalize" }}
      >
        {props.label} :
      </Typography>

      <TextField
        select
        name={props.name} 
        value={props.formik?.values[props.name] || ""} 
        fullWidth
        onChange={props.formik?.handleChange} 
      >
        {props.arr &&
          props.arr.map((option, indx) => (
            <MenuItem key={option.val || option + indx} value={option.val || option}>
              <Typography noWrap>{option.label || option}</Typography>
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );
}
