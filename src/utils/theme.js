import { createTheme } from '@mui/material/styles';

// Dark Green Theme
export const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#16AA9D",
      },
      secondary: {
        main: "#004D5C",
      },
      background: {
        default: "#002B36", // Dark greenish background
        paper: "#003D40",
      },
      text: {
        primary: "#E0F2F1",
        secondary: "#A7FFEB",
      },
    },
  });
export default theme;
