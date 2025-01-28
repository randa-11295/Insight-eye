import Button from '@mui/material/Button';

export default function CustomBtn({ isLined,
    submit,
    children = "button title",
    handle = () => console.log(" you must send fun") }) {

    return (
        <Button variant={isLined ? "outlined" : "contained"}
            sx={{ textTransform: 'capitalize' }}
            onClick={handle}
        > {children}
        </Button >
    );
}
