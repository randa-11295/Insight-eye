
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme";
import AppRouter  from "./routes/AppRouter";
import { RecoilRoot } from 'recoil';


export default function App() {


  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </RecoilRoot>
  );
}
