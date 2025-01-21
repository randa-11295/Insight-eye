// nav icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const navbarContentArr = [
 {
    text: "Dashboard",
    url: "/",
    icon: <DashboardOutlinedIcon sx={{ marginLeft: " auto" }} />,
  },
  {
    text: "Stream",
    url: "/stream",
    icon: <LiveTvOutlinedIcon sx={{ marginLeft: " auto" }} />,
  },
  {
    text: "Search",
    url: "/search",
    icon: <SearchOutlinedIcon sx={{ marginLeft: " auto" }} />,
  },
  {
    text: "Prediction",
    url: "/production",
    icon: <CorporateFareOutlinedIcon sx={{ marginLeft: " auto" }} />,
  },
  {
    text: "Setting",
    url: "/setting",
    icon: <SettingsOutlinedIcon sx={{ marginLeft: " auto" }} />,
  },
  {
    text: "Logout",
    url: false,
    icon: <LogoutOutlinedIcon sx={{ marginLeft: " auto" }} />,
  },
 



];




//* apis links
