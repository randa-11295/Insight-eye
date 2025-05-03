import Button from "@mui/material/Button";

export default function LoadBtn(props) {
  return (
    <Button
      loading={props.loading || false}
      variant="contained"
      fullWidth={props.fullWidth}
      size="large"
      type={"submit"}
    >
      {props.text || "confirm"}
    </Button>
  );
}
