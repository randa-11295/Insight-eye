import LoadingButton from "@mui/lab/LoadingButton";
import useContentHook from "../../hooks/useContentHook"

export default function LoadBtn(props) {
  const { getContentText } = useContentHook();

  const styleBtn = {
    width: "100%",
    fontWeight: "700",
    py: 1.5,
    "&:disabled": {
      backgroundColor: "secondary.main",
    },
    "& *": {
      color: "#fff",
    },
  };

  return (
    <LoadingButton
      sx={styleBtn}
      loading={props.loading || false}
      variant="contained"
      onClick={props.fun}
    >
      {getContentText(props.login ? "account_login" : "account_send")}
    </LoadingButton>
  );
}
