
import { ThemeProvider } from "@mui/material/styles";

import theme from "./utils/theme";

import { AppRouter } from "./routes";

import { Box } from "@mui/system";


export default function App() {


  return (
    <ThemeProvider theme={theme}>
      <Box >
        <AppRouter />
      </Box>

    </ThemeProvider>
  );
}
