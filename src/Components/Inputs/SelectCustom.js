import { TextField, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SelectCustom(props) {
  const { translationOpj } = useSelector((state) => state.translation);

  const [val, setVal] = useState(false);

  const updateValueHandel = (newVal) => {
    setVal(newVal);
    props.changeHandle(newVal);
  };

  useEffect(() => {
    updateValueHandel(props?.arr[0]?.val ||props?.arr[0]?.code || props?.arr[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.arr]);

  return (
    <TextField
      sx={ItemStyle}
      select
      size={props.small && "small"}
      value={val}
      label={translationOpj[props?.label] || props?.label}
      fullWidth
      onChange={(e) => {
        updateValueHandel(e.target.value);
      }}
    >
      {props?.arr?.map((option) => {
        return (
          <MenuItem
            key={option.val ||  option}
            value={option.val ||  option}
            sx={ItemStyle}
          >
            <Typography noWrap>
              {translationOpj[option.label] ||
                option.label ||
            
                option}
            </Typography>
          </MenuItem>
        );
      })}
    </TextField>
  );
}
const ItemStyle = {
  background: "white",
};
