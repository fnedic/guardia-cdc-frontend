import React from "react";
import { setAuthHeader } from "../../helpers/axios_helper";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Settings } from "@mui/icons-material";

export const UserAppBar = ({userRole}) => {

  console.log("Role appBar: " + userRole);

  const appBarStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "5rem",
    width: "100%",
    backgroundColor: "#69445d",
    boxShadow: "0px 0px 0px",
  };

  const adminPages = ["Personal", "Subir Contenido"];
  const adminSettings = ["Perfil", "Cerrar Sesión"];
  const adminPageUrls = {
    "Subir Contenido": "http://localhost:3000/protocol/upload",
    Personal: "http://localhost:3000/dashboard",
    Protocolos: "http://localhost:3000/dashboard/protocol",
  };

  const userPages = ["Protocolos", "Videos", "Proc. Institucionales"];
  const userSettings = ["Perfil", "Cerrar Sesión"];
  const userPageUrls = {
    Protocolos: "http://localhost:3000/protocol/list",
    Videos: "http://localhost:3000/videos",
  };

  const navigate = useNavigate();
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

  const handleLogout = () => {
    window.location.href = "/login";
    setAuthHeader(null);
  };

  const handleSettingClick = (selectedSetting) => {
    if (selectedSetting === "Cerrar Sesión") {
      handleCloseUserMenu();
      handleLogout();
    } else if (selectedSetting === "Perfil") {
      handleCloseUserMenu();
      navigate("/profile");
    }
  };

  if (userRole === "ADMIN") {
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
                {adminPages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Button href={adminPageUrls[page]}>{page}</Button>
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
              Panel Administrativo
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {adminPages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  href={adminPageUrls[page]}
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
                  <Avatar sx={{ backgroundColor: "#ffffff", color: "#a19ba8" }}>
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
                {adminSettings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleSettingClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  } else if (userRole === "USER") {
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
                {userPages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Button href={adminPageUrls[page]}>{page}</Button>
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
              {userPages.map((page) => (
                <Button
                  href={userPageUrls[page]}
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
                  <Avatar sx={{ backgroundColor: "#ffffff", color: "#a19ba8" }}>
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
                {userSettings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleSettingClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  } else if (userRole === "" || userRole === null || userRole === undefined) {
    return (
      <header style={appBarStyle}>
        <CssBaseline />
        <Typography color={"white"} variant="h4" letterSpacing={3}>
          Servicio de Guardia
        </Typography>
      </header>
    );
  }
};