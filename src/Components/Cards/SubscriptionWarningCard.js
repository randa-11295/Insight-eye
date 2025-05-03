import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
const SubscriptionWarningCard = () => {
  return (
    <Alert variant="outlined" severity="warning" sx={{ my: 2 }}>
      <AlertTitle>Warning</AlertTitle>
      Your subscription has ended. Some features will be restricted or
      unavailable until you renew.
    </Alert>
  );
};
export default SubscriptionWarningCard;
