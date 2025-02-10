import Button from '@mui/material/Button';

export default function CustomBtn({ isLined,
    color, disable,
    children = "button title",
    handle = () => console.log(" you must send fun") }) {

    return (
        <Button disabled={disable} variant={isLined ? "outlined" : "contained"}
            color={color || 'primary'}
            sx={{ textTransform: 'capitalize' }}
            onClick={handle}
        > {children}
        </Button >
    );
}
