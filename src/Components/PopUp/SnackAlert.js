import { useEffect, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
// import { hiddenNotificationHandel } from "../../Redux/sliceReducers/notificationsSlice";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function Transition(props) {

  return <Slide {...props} direction="left" />;
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackAlert() {

  useEffect(() => {
    if (true) {
      setTimeout(() => {
        handleClose();
      }, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    // dispatch(hiddenNotificationHandel());
  };

  return (
    <div>
      <Snackbar
        open={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}

        sx={{ width: { md: "300px" } }}
        TransitionComponent={Transition}
      >
        <Alert
          // severity={snackAlertState.val?.variant || "success"}
          severity={"success"}
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {
            // getContentText(snackAlertState.val?.msg.trim())
            //  ||
            " every thing is okay"}
        </Alert>
      </Snackbar>
    </div>
  );
}
