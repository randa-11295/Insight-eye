import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Snackbar from "@mui/material/Snackbar";
import { snackAlertState } from "../../Recoil/RecoilState"; // Import Recoil state

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
      autoHideDuration={5000}
      sx={{ width: { md: "300px" } }}
      onClose={handleClose}
      message={snackState.message || "Everything is okay"}
    />
  );
}
