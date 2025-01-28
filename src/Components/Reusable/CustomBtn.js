import Button from '@mui/material/Button';

export default function CustomBtn({ type = "contained",
    text = "button title",
    handle = () => console.log(" you must send fun") }) {

    return (
        <Button variant={type} size='small' sx={{ textTransform: 'capitalize' }} onClick={handle}> {text}</Button >
    );
}
