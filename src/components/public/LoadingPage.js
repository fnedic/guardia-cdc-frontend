import { Container, Skeleton, Stack } from "@mui/material";
import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";

const LoadingPage = () => {
  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  );
};

export default LoadingPage;