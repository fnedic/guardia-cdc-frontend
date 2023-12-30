import { Box, Container, LinearProgress, Skeleton, Stack } from "@mui/material";
import React from "react";

const LoadingMain = () => {
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
        <LinearProgress color="success" variant="determinate" value={progress} />
      </Box>
      <Container
        sx={{
          mt: 10,
          mb: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <main>
          <Stack spacing={1} textAlign={"center"}>
            <Skeleton variant="text" width={300} />
            <Skeleton variant="rounded" width={300} height={70} />
            <Skeleton variant="circular" width={80} height={80} />
            <Skeleton variant="rounded" width={300} height={70} />
            <Skeleton variant="rounded" width={300} height={70} />
          </Stack>
        </main>
      </Container>
    </div>
  );
};

export default LoadingMain;
