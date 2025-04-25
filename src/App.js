
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme";
import AppRouter  from "./routes/AppRouter";
import { RecoilRoot } from 'recoil';
import SnackAlert from "./Components/PopUp/SnackAlert";

export default function App() {


  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <AppRouter />
        <SnackAlert />
      </ThemeProvider>
    </RecoilRoot>
  );
}
