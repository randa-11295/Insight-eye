
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme";
import { AppRouter } from "./routes";
import { Box } from "@mui/system";
import { RecoilRoot } from 'recoil';


export default function App() {


  return (
    <RecoilRoot>
    <ThemeProvider theme={theme}>
      <Box >
        <AppRouter />
      </Box>
    </ThemeProvider>
    </RecoilRoot>
  );
}
