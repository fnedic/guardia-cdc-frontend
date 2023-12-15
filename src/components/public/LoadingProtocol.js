import {
  Box,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import React from "react";

const LoadingProtocol = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          color="success"
          variant="determinate"
          value={progress}
        />
      </Box>
      <Box sx={{ textAlign: "center", mt:25, mb:40 }}>
        <CircularProgress color="success"/>
      </Box>
      );
    </div>
  );
};

export default LoadingProtocol;
