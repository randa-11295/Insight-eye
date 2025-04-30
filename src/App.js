
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme";
import AppRouter  from "./routes/AppRouter";
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';
export default function App() {


  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <AppRouter />
        </SnackbarProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}
