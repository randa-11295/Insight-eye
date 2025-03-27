import { createTheme } from '@mui/material/styles';

// Dark Green Theme
export const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#15C5BB",
      },
      secondary: {
        main: "#fff",
      },
      background: {
        default: "#031716", // Dark greenish background
        paper: "#041F1E",
      },
    //   text: {
    //     primary: "#01FFFF",
    //     secondary: "#00A0A8",
    //   },
    },
  });
export default theme;
