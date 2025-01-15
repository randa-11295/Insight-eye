import Toolbar from "@mui/material/Toolbar";
import useContentHook from "../../hooks/useContentHook";
// import useGetRegionHook from "../../hooks/useGetRegionHook";
import { tabaqatIntroductionPagesLink } from "../../utils/StaticVariables";
import { navbarContentArr } from "../../utils/StaticVariables";

import {  useLocation } from "react-router-dom";
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

  const { getContentText } = useContentHook();
  // const getRegion = useGetRegionHook();



  const listStyle = (url, path) => ({
    borderRadius: 2,
  });

  const iconStyle = (url, path) => {
    return {
      color: url === path ? "secondary.main" : "white",
    };
  };

  const openInNewTab = () => {
    window.open(tabaqatIntroductionPagesLink, "_self", "noopener,noreferrer");
  };
  return (
    <Box sx={boxStyle}>
      <Toolbar sx={logoStyle} onClick={openInNewTab}>test</Toolbar>
      {navbarContentArr.map((navGroup, indx) => (
        <Box px={1} key={uuid()}>
          <List
            sx={{
              py: 1,
            }}
          >
            {navGroup.map((el) => (
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
                    primary={getContentText(el.text)}
                    sx={{ textAlign: "start" }}
                  />
                  <ListItemIcon sx={iconStyle(el.url, location.pathname)}>
                    {el.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default ContentNav;

const logoStyle = {

  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  cursor: "pointer",
  background : "red", 
};

const boxStyle = {
  height: "100vh",
  overflow: "auto",
};
