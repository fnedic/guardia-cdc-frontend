import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { CssBaseline } from "@mui/material";
import { Settings } from "@mui/icons-material";

const pages = ["Protocolos", "Videos"];
const settings = ["Perfil", "Cerrar Sesión"];

function LoggedAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const appBarStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "5rem",
    width: "100%",
    backgroundColor: "#283583",
    boxShadow:
      "0px 4px 4px -3px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
  };

  const pageUrls = {
    Protocolos: "http://localhost:3000/protocol/list",
    Videos: "http://localhost:3000/",
  };

  return (
    <AppBar position="static" style={appBarStyle}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Button href={pageUrls[page]} textAlign="center">
                    {page}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              letterSpacing: 3,
              color: "white",
            }}
          >
            Servicio de Guardia
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                href={pageUrls[page]}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  mx: 1,
                  color: "white",
                  display: "block",
                  letterSpacing: 1,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Opciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ backgroundColor: "#ffffff", color: "#283583" }}>
                  <Settings />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default LoggedAppBar;
