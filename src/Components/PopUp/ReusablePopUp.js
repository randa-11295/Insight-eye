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
import CloseIcon from "@mui/icons-material/Close";
import DesBtn from "../Inputs/DesBtn";
import useContentHook from "../../hooks/useContentHook";

export default function ReusablePopUp(props) {
  const { getContentText } = useContentHook();

  return (
    <Dialog
      open={props?.isOpen}
      onClose={props?.handleClose}
      fullWidth
      maxWidth={"md"}
    >
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
          {props.title}
        </DialogTitle>
        <DesBtn
          fun={props.handleClose}
          close
          text={getContentText("popUp_cancel")}
        >
          <CloseIcon />
        </DesBtn>
      </Stack>

      <Divider sx={{ mb: 1 }} />
      <DialogContent>{props.children}</DialogContent>
      <Divider sx={{ pt: 1 }} />
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          m: 0,
          justifyContent: props.clearHandel && "space-between",
        }}
      >
        {props.clearHandel && (
          <Button onClick={props.clearHandel}>
            <Box component="span">{getContentText("popUp_clear")}</Box>
          </Button>
        )}

        <div>
          {props.sendReq && (
            <Button
              onClick={props.sendReq}
              variant="contained"
              sx={{ boxShadow: "none", mx: 1 }}
            >
              {getContentText("popUp_save")}
            </Button>
          )}
          <Button onClick={props.handleClose} variant="outlined">
            {getContentText("popUp_cancel")}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
