import { Typography } from "@mui/material";

const HighlightedText = ({ title, val }) => {
  return (
    <Typography>
      {title} : 
      <Typography component="b" color="primary.main" sx={{ fontWeight: 900, margin: "10px" }}>
        {val}
      </Typography>
    </Typography>
  );
};

export default HighlightedText;
