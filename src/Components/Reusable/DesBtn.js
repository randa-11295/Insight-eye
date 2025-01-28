import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";

// this component used to make a description simple pop up on icon button 
// its required to send icon component to render it inside icon btn 
// and it required text description also to render it in side pop up 

export default function DesBtn(props) {
  const language  = useSelector((state) => state.translation.language);

  return (
    <Tooltip
      title={props.text}
      placement={  // control pop up place
        props.place ||( !props.close
          ? "top"
          : language === "ar"
          ? "left"
          : "right")
      }
      arrow
    >
      <IconButton 
        color={!props.close ? "primary" : "default"} // make btn color gray if it close btn 
        sx={ props.withoutStyle ? {}:(!props.close ? btnStyle(props.copy) : {color : props.primary ? "primary.main" : "default"}) } // removing all our custom style if it close btn 
        onClick={props.fun} 
        type={props.type || "button"}
       
      >
        {/* te dynamic icon components send from parents */}
        {props.children} 
      </IconButton>
    </Tooltip>
  );
}

const btnStyle = (copy)=>({
  border: 1,
 borderRadius: "4px",
 padding: copy ? "5px" : { xs: "6px", sm: "8px", lg: "10px" },
})