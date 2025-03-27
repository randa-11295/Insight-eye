import { createTheme } from "@mui/material/styles";

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
      paper: "#031716",
    },
    action: {
      selected: "#0C6863", // Your preferred selection color
      hover: "#063A36", // Your preferred hover color
    },
  },
});

export default theme;
