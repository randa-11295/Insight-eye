import { Button } from "@mui/material";
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
      <Button 
        color={!props.close ? "primary" : "default"} // make btn color gray if it close btn 
        sx={btnStyle}
        onClick={props.handle}
        type={props.type || "button"}
        variant="outlined"

      >
        {props.children}
      </Button>
    </Tooltip >
  );
}

const btnStyle ={
  borderRadius: "4px",
 minWidth :"auto", 
 px: 1.5

}