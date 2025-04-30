// nav icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

const getIcon = (IconComponent) =>  (
  <IconComponent sx={{ color: "inherit", marginLeft: "auto" }} />
);

export const drawerWidth = 280; 
export const streamTypesArr =['rtsp', 'http', 'local', 'other'] 

export const navbarContentArr = [
  { text: "Dashboard", url: "/", icon: getIcon(DashboardOutlinedIcon) },
  { text: "Streams", url: "/streams", icon: getIcon(LiveTvOutlinedIcon) },
  { text: "Frames Search", url: "/frames-search", icon: getIcon(SearchOutlinedIcon) },
  { text: "Predictions", url: "/predictions", icon: getIcon(LightbulbOutlinedIcon) },
  { text: "Logs", url: "/logs", icon:  getIcon(EditNoteOutlinedIcon) },
  { text: "Change Password", url: "/change-password", icon: getIcon(SettingsOutlinedIcon) },
  { text: "Log out", url: false, icon: getIcon(LogoutOutlinedIcon) },
];


export const dataRenderTypeInSearchArr = [
  { value: "cards", icon: require('@mui/icons-material/DashboardOutlined').default },
  { value: "table", icon: require('@mui/icons-material/Toc').default },
  { value: "chart", icon: require('@mui/icons-material/ShowChart').default },
];

  export const searchFramesColumns = [
    { field: "name", headerName: "Camera Name" },
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


const generateUniqueColor = (index) => {
  const hue = (index * 137) % 360; // Use golden angle for unique hues
  return `hsl(${hue}, 85%, 55%)`; // High saturation and medium brightness for vibrancy
};
export const chartColors = ["rgb(75, 192, 192)", "rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 206, 86)", ...Array.from({ length: 10 }, (_, i) => generateUniqueColor(i))];


export const BASE64_IMAGE_PREFIX = "data:image/jpeg;base64,";
export const baseURL = "https://16.170.216.227/" // local 8000


