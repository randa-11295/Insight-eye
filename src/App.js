
import { ThemeProvider, createTheme } from "@mui/material/styles";

import theme from "./utils/theme";

import { AppRouter } from "./routes";

import { Box } from "@mui/system";


export default function App() {


  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Box sx={{ background: "#f6f8f9 " }}>
        <AppRouter />
      </Box>

    </ThemeProvider>
  );
}
