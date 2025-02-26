import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function DesBtn(props) {

  return (
    <Tooltip
      title={props.text}
      placement={  
        props.place || "top"
      }
      arrow
    >
      <IconButton 
        color={!props.close ? "primary" : "default"} // make btn color gray if it close btn 
        sx={btnStyle}
        onClick={props.handle}
        type={props.type || "button"}

      >
        {props.children}
      </IconButton>
    </Tooltip >
  );
}

const btnStyle ={
  border: 1,
  borderRadius: "4px",
}