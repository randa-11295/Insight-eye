import React, { useEffect, useRef } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  CardHeader, 
  Container, 
  Typography,
  IconButton
} from '@mui/material';

function StreamCards() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: false 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }

    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        // Remove TypeScript casting and use plain JavaScript
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
   
        <Card>
         
          <Box
            sx={{
              position: 'relative',
              aspectRatio: '16/9',
              bgcolor: 'black'
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
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