import LoadingButton from "@mui/lab/LoadingButton";

export default function LoadBtn(props) {



  return (
    <LoadingButton
      loading={props.loading || false}
      variant="contained"
      onClick={props.handle}
      fullWidth={props.fullWidth}
      size="large"
      type={props.submit && "submit"}
    >
      {props.text || "Conform"}
    </LoadingButton>
  );
}
