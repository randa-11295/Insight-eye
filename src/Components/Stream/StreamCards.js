// import  {useRef } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 

  Typography,
} from '@mui/material';

function StreamCards() {
  // const videoRef = useRef(null);



  return (
   
        <Card>
         
          <Box
            sx={{
              position: 'relative',
              aspectRatio: '16/9',
              bgcolor: 'black'
            }}
          >
         
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  px: 2,
                  py: 0.5,
                  borderRadius: 8
                }}
              >
                Loading camera...
              </Typography>
            </Box>
          </Box>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Live video feed from your camera
            </Typography>
          </CardContent>
        </Card>
   
  );
}

export default StreamCards;