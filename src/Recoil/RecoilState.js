import { atom } from "recoil";

export const snackAlertState = atom({
  key: "snackAlertState",
  default: {
    open: false,
    message: "all is good",
    severity: "success", // success, error, warning, info
  },
});




export const popupState = atom({
  key: "popupState",
  default: {
    isOpen: false,
    title: "",
    content: null,
    clearHandel: null,
    sendReq: null,
  },
});


export const selectedStreamState = atom({
  key: "selectedStreamState",
  default: []
});
