import { Box, Container, CssBaseline, Skeleton } from "@mui/material";
import React, { Component } from "react";
import { Header } from "./components/public/Header";
import {Footer} from "./components/public/Footer";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error });
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      const appBarStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "5rem",
        width: "100%",
        backgroundColor: "#283583",
        boxShadow: "0px 0px 0px",
      };
      return (
        <Box>
          <Header />
          <header style={appBarStyle}>
            <CssBaseline />
            <Skeleton variant="text" width={300} />
          </header>
          <Container component={"main"} sx={{ mt: 5, mb: 5 }}>
            <h2>¡Ups! Algo salió mal.</h2>
            <p>{this.state.error.toString()}</p>
          </Container>
          <Footer />
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
