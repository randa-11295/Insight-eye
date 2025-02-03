import { atom } from "recoil";

export const snackAlertState = atom({
  key: "snackAlertState",
  default: {
    open: false,
    message: "all is good",
    severity: "success", // success, error, warning, info
  },
});
