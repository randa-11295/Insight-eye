import {Card , Typography , CardContent , CardMedia , Box , Divider} from "@mui/material";
import { BASE64_IMAGE_PREFIX } from "../../utils/StaticVariables";

export default function CardSearch({ data }) {
  return (
    <Card sx={{  borderRadius: 3, boxShadow: 3 }}>
 
      
        <CardMedia
          component="img"
          height="200"
          image={BASE64_IMAGE_PREFIX + data?.frame}
          alt={data?.metadata?.camera_id}
          sx={{ objectFit: "cover" }}
        />

        <CardContent>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Camera #{data?.metadata?.camera_id}
          </Typography>

          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="body2" color="text.secondary">
              📅 {data?.metadata?.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ⏰ {data?.metadata?.time}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Typography variant="body1" fontWeight="bold">
            🧑‍🤝‍🧑 People Count: {data?.metadata?.person_count}
          </Typography>
        </CardContent>
    </Card>
  );
}
