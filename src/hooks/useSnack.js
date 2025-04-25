// utils/showSnackAlert.ts
import { snackAlertState } from "../Recoil/RecoilState";
import { useSetRecoilState } from "recoil";

export const useSnack = () => {
  const setSnack = useSetRecoilState(snackAlertState);

  return {
    showSuccess: (message = "all is good") =>
      setSnack({ open: true, message, severity: "success" }),

    showError: (message = "Some thing want wrong") =>
      setSnack({ open: true, message, severity: "error" }),

    showInfo: (message) =>
      setSnack({ open: true, message, severity: "info" }),

    showWarning: (message) =>
      setSnack({ open: true, message, severity: "warning" }),
  };
};
