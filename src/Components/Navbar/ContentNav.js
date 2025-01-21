import Toolbar from "@mui/material/Toolbar";
import { navbarContentArr } from "../../utils/StaticVariables";

import { useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { v4 as uuid } from "uuid";

const ContentNav = (props) => {
  let location = useLocation();



  const listStyle = (url, path) => ({
    borderRadius: 2,
    bgcolor: url === path && "primary.main",
    overflow: "hidden",
  });



  return (
    <Box sx={boxStyle}>
      <Toolbar sx={logoStyle} onClick={() => { console.log("logo") }}>test</Toolbar>
      {navbarContentArr.map((el) => (
        <Box px={1} key={uuid()} >
          <List   >

            <ListItem
              sx={listStyle(el.url, location.pathname)}
              key={el.url}
              disablePadding
              onClick={() => {
                // changeRouteHandel(el.url);
                console.log(el.url);
              }}
            >
              <ListItemButton
                sx={{ justifyContent: "space-between", display: "flex" }}
              >
                <ListItemText
                  primary={el.text}
                  sx={{ textAlign: "start" }}
                />
                <ListItemIcon >
                  {el.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

          </List>
        </Box>
      ))}
    </Box>
  );
};

export default ContentNav;

const logoStyle = {


  cursor: "pointer",

};

const boxStyle = {
  height: "100vh",
  overflow: "auto",

};
