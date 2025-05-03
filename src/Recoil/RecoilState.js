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



export const filterResultState = atom({
  key: "filterResultState",
  default: {
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    limit: "25",
    id: null,
  },
});

export const isActiveUserState = atom({
  key: "isActiveUserState",
  default: true,
});




export const authState = atom({
  key: "authState",
  default:null
});

export const streamState = atom({
  key: "streamState",
  default: {
    data: [],
    selected: [],
    loading: true,
    error: null,
  },
});

export const notificationHasUnread = atom({
  key: 'notificationHasUnread',
  default: true, // true = show red dot, false = hide it
});
