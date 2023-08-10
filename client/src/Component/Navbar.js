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
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "./redux/reducers/userSlice";
import { clearOut } from "./redux/reducers/questionsSlice";
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const { user, dispatch } = useContext(UserContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
    dispatch(logOut());
    dispatch(clearOut());
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
          <Box sx={{ padding: 2, display: "flex", alignItems: "center",justifyContent:'center' }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="secondary"
              >
                <PsychologyIcon fontSize="large" />
              </IconButton>
              <Typography
                variant="h5"
                noWrap
                component="a"
                style={{
                  mr: 2,

                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "secondary.main",
               
                }}
              >
                Quiz
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {user.name != "" && (
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
                  <MenuItem>
                    <Link
                      to="/show-scores"
                      style={{ color: "#080906", textDecoration: "none" }}
                    >
                      <Typography>Scores</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Typography onClick={handleClick}>Log Out</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}

            {user.name == "" && (
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
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      to="/user/login"
                      style={{ color: "#080906", textDecoration: "none" }}
                    >
                      <Typography>Login</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      to="/user/signup"
                      style={{ color: "#080906", textDecoration: "none" }}
                    >
                      <Typography>Sign Up</Typography>
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
            {user.name != "" && (
              <>
                <IconButton
                  onClick={handleOpenNavMenu}
                  style={{ color: "#FFF" }}
                >
                  {user.name}
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
                  <MenuItem>
                    <Link
                      to="/show-scores"
                      style={{ color: "#080906", textDecoration: "none" }}
                    >
                      <Typography>Score</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography onClick={handleClick}>Log Out</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
            {user.name == "" && (
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
