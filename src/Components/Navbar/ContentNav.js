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
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import { popupState } from "../../Recoil/RecoilState";
import { useSnackbar } from "notistack";

const ContentNav = (props) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const setAuthRecoil = useSetRecoilState(authState);
   const setPopup = useSetRecoilState(popupState);
const { enqueueSnackbar } = useSnackbar();   

   const openPopup = () => {
    setPopup({
      isOpen: true,
      title: "Log out",
      content: "Are you sure you want to Log out ",
      sendReq: handelLogout,
    });
  };

  const handelLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("expire")

    setAuthRecoil(null)
    axios.post(baseURL,"logout")
        .then( ()=> {
          enqueueSnackbar("you log out successfully", {
            variant: "success",
          }) 
        })
        .catch((error) => {
          enqueueSnackbar(error.massage, {
            variant: "error",
          }) 
        })
  }

  const changeRouteHandel = (url) => {
    url ? navigate(url) : openPopup()
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
