import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  createMuiTheme,
  createTheme,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./Context";
import { logout_api } from "./api/apiCalls";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
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

  useEffect(() => {}, []);

  const handleClick = async () => {
    const res = await logout_api();
    dispatch({ type: "logout" });
    navigate("/");
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        width: "100%",
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ padding: 2, display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <PsychologyIcon fontSize="large" />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Quiz
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {user && (
              <>
                <Avatar onClick={handleOpenNavMenu}>GK</Avatar>
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
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={handleClick}>
                      Log Out
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}

            {!user && (
              <>
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
                  <Link
                    to="/user/login"
                    style={{ color: "#080906", textDecoration: "none" }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      to="/user/signup"
                      style={{ color: "#080906", textDecoration: "none" }}
                    >
                      <Typography textAlign="center">Sign Up</Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {user && (
              <>
                <IconButton onClick={handleOpenNavMenu}>
                  Grishma Kadam
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
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={handleClick}>
                      Log Out
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
            {!user && (
              <>
                <Link to="/user/signup" style={{ textDecoration: "none" }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    style={{ marginY: 2, color: "white", display: "block" }}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link to="/user/login" style={{ textDecoration: "none" }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    style={{ my: 2, color: "white", display: "block" }}
                  >
                    Log In
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
