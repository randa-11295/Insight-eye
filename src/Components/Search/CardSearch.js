import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { BASE64_IMAGE_PREFIX } from "../../utils/StaticVariables";

export default function CardSearch({ data }) {
  return (
    <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 3 }}>
      <CardActionArea>
        {/* Image Section */}
        <CardMedia
          component="img"
          height="200"
          image={BASE64_IMAGE_PREFIX + data?.frame}
          alt="Captured Image"
          sx={{ objectFit: "cover" }}
        />

        {/* Content Section */}
        <CardContent>
          {/* Camera ID Title */}
          <Typography variant="h6" fontWeight="bold" color="primary">
            Camera #{data?.metadata.camera_id}
          </Typography>

          {/* Date & Time */}
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="body2" color="text.secondary">
              📅 {data?.metadata.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ⏰ {data?.metadata.time}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Person Count */}
          <Typography variant="body1" fontWeight="bold">
            🧑‍🤝‍🧑 People Count: {data?.metadata.person_count}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
