import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ContentNav from "./ContentNav";

const SideNav = (props) => {

  return (
    <Box
      component="nav"
      sx={{ width: { md: props.drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant="temporary"
        anchor={"left"}
        open={props.mobileOpen}
        onClose={props.openHandel}
        ModalProps={{
          keepMounted: true,
        }}
    
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
            

          },
        }}
      >
        <ContentNav mob  openHandel={props.openHandel}/> 
      </Drawer>

      <Drawer
        variant="permanent"
        anchor={"left"}
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
        open
      >
        <ContentNav />
      </Drawer>
    </Box>
  );
};

export default SideNav;
