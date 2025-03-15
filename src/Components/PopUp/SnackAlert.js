import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { snackAlertState } from "../../Recoil/RecoilState"; // Import Recoil state

function Transition(props) {
  return <Slide {...props} direction="left" />;
}

export default function SnackAlert() {
  const [snackState, setSnackState] = useRecoilState(snackAlertState);

  useEffect(() => {
    if (snackState.open) {
      setTimeout(() => {
        handleClose();
      }, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackState.open]);

  const handleClose = () => {
    setSnackState((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      open={snackState.open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      sx={{ width: { md: "300px" } }}
      TransitionComponent={Transition}
    >
      <MuiAlert
        severity={snackState.severity}
        sx={{ width: "100%" }}
        onClose={handleClose}
        variant="filled"
      >
        {snackState.message || "Everything is okay"}
      </MuiAlert>
    </Snackbar>
  );
}
