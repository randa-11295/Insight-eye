import LoadingButton from "@mui/lab/LoadingButton";

export default function LoadBtn(props) {
  return (
    <LoadingButton
      loading={props.loading || false}
      variant="contained"
      fullWidth={props.fullWidth}
      size="large"
      type={"submit"}
    >
      {props.text || "Conform"}
    </LoadingButton>
  );
}
