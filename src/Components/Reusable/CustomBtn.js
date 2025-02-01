import Button from '@mui/material/Button';

export default function CustomBtn({ isLined,
    color,
    children = "button title",
    handle = () => console.log(" you must send fun") }) {

    return (
        <Button variant={isLined ? "outlined" : "contained"}
        color={color || 'primary'}
            sx={{ textTransform: 'capitalize' }}
            onClick={handle}
        > {children}
        </Button >
    );
}
