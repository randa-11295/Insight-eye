// nav icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const getIcon = (IconComponent) => (isSelected) => (
  <IconComponent sx={{ color: isSelected ? "black" : "inherit", marginLeft: "auto" }} />
);

export const navbarContentArr = [
  { text: "Dashboard", url: "/", icon: getIcon(DashboardOutlinedIcon) },
  { text: "Streams", url: "/streams", icon: getIcon(LiveTvOutlinedIcon) },
  { text: "Search", url: "/search", icon: getIcon(SearchOutlinedIcon) },
  { text: "Prediction", url: "/prediction", icon: getIcon(CorporateFareOutlinedIcon) },
  { text: "Setting", url: "/setting", icon: getIcon(SettingsOutlinedIcon) },
  { text: "Logout", url: false, icon: getIcon(LogoutOutlinedIcon) },
];


export const baseURL = "http://16.170.216.227"


