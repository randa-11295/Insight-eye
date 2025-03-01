import {
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
  Box,
  Stack,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { popupState } from "../../Recoil/RecoilState";

export default function PopUpReusable() {
  const [popup, setPopup] = useRecoilState(popupState);

  const handleClose = () => {
    setPopup({ ...popup, isOpen: false });
  };

  return (
    <Dialog open={popup.isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <DialogTitle
          component="div"
          sx={{
            fontWeight: 600,
            textTransform: "capitalize",
            flexGrow: 1,
            fontSize: "1.2rem",
            width: "calc(100% - 100px)",
          }}
        >
          {popup.title}
        </DialogTitle>
        {/* <DesBtn fun={handleClose} close text={getContentText("popUp_cancel")}>
          <CloseIcon />
        </DesBtn> */}
      </Stack>

      <Divider sx={{ mb: 1 }} />
      <DialogContent>{popup.content}</DialogContent>
      <Divider sx={{ pt: 1 }} />
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          m: 0,
          justifyContent: popup.clearHandel && "space-between",
        }}
      >
        {popup.clearHandel && (
          <Button onClick={popup.clearHandel}>
            <Box component="span">{"clear"}</Box>
          </Button>
        )}

        <div>
          <Button onClick={handleClose} variant="outlined">
            cancel
          </Button>
          {popup.sendReq && (
            <Button
              onClick={() => {
                popup.sendReq()
                handleClose()
              }}
              variant="contained"
              sx={{ boxShadow: "none", mx: 1 }}
            >
              yes, I`m sure
            </Button>
          )}

        </div>
      </DialogActions>
    </Dialog>
  );
}
