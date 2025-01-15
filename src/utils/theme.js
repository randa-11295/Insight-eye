import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      mode: 'dark',
        primary: {
            main: '#FF5500', // Your preferred teal color
        },
        secondary: {
            main: '#396516', // Your preferred dark blue
        },
        // background: {
        //     default: |,
        //     paper: '#1E1E1E',
        // },
    },
});

export default theme;