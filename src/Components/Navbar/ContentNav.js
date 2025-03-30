import Toolbar from "@mui/material/Toolbar";
import { navbarContentArr } from "../../utils/StaticVariables";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import logoImg from "../../Images/logo.png"
import { v4 as uuid } from "uuid";
import { useSetRecoilState } from "recoil";
import { authState } from "../../Recoil/RecoilState";
import {useAxiosWithAuth} from "../../services/api"

const ContentNav = (props) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const setAuthRecoil = useSetRecoilState(authState);
  const api = useAxiosWithAuth();

  const handelLogout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("expire")

    setAuthRecoil(null)
    api.post("logout")
        .then( ()=> {
          console.log("res")
        })
        .catch(() => {
          console.log("error")
          // showError();
        })
  }

  const changeRouteHandel = (url) => {
    url ? navigate(url) : handelLogout()
  }

  const listStyle = (url, path) => ({
    borderRadius: 2,
    bgcolor: url === path && "primary.main",
    overflow: "hidden",
 

  });



  return (
    <Box sx={boxStyle}>
      <Toolbar sx={logoStyle} onClick={() => { console.log("logo") }}>
        <img src={logoImg} alt="logo" style={{ width: "75%", margin: " 10px auto" }}
        /></Toolbar>
      {navbarContentArr.map((el) => (
        <Box px={1} key={uuid()} >
          <List   >

            <ListItem
              sx={listStyle(el.url, location.pathname)}
              key={el.url}
              disablePadding
              onClick={() => {
                changeRouteHandel(el.url);
              }}
            >
              <ListItemButton
                sx={{ justifyContent: "space-between", display: "flex" ,    "&:hover" : {
                  background :"#063A36"
                }}}
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
