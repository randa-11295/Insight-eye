import { Card } from "@mui/material";
import PredictionsChart from "./PredictionsChart";
const PredictionsCard = () => {
  return (
    <Card sx={{ width: "100%", height: "300px" , my: 4}}>
      <PredictionsChart />
    </Card>
  );
};

export default PredictionsCard;
