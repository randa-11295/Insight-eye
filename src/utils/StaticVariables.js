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
  { text: "Log in", url: "/log-in", icon: getIcon(LogoutOutlinedIcon) },
  { text: "Contact With us", url: "/contact-with-us", icon: getIcon(LogoutOutlinedIcon) },
  { text: "Log out", url: false, icon: getIcon(LogoutOutlinedIcon) },
];


export const dataRenderTypeInSearchArr = [
  { value: "cards", icon: require('@mui/icons-material/DashboardOutlined').default },
  { value: "table", icon: require('@mui/icons-material/Toc').default },
  { value: "chart", icon: require('@mui/icons-material/ShowChart').default },
];

  export const searchFramesColumns = [
    { field: "camera_id", headerName: "Camera ID" },
    { field: "date", headerName: "Date" },
    { field: "time", headerName: "Time" },
    { field: "person_count", headerName: "Person Count" },
    { field: "frame", headerName: "Image" }
  ];

 export const  streamColumns = [
  { field: "name", headerName: "Name" },
  { field: "type", headerName: "Type" },
  { field: "path", headerName: "Path" },
];

export const BASE64_IMAGE_PREFIX = "data:image/jpeg;base64,";
export const baseURL = "http://16.170.216.227"


