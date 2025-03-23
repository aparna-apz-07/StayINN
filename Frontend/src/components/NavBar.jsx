

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user && user.userType === "admin";
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const hideAuthButtons =
    location.pathname === "/login" || location.pathname === "/sign";

  const hideSearchBar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/sign" ||
    location.pathname === "/HotelOwner"||
    location.pathname === "/AdminDashboard";

  const hideHotelsButton = location.pathname === "/hoteldash";

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isHotelOwner = user && user.OwnerName;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#404040" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "white", flexGrow: 1 }}
        >
          StayInn
        </Typography>

        {!hideSearchBar && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 1,
              padding: "0 10px",
              margin: "10px 0"
            }}
          >
            <TextField
              variant="standard"
              size="small"
              placeholder="Search hotels..."
              sx={{ backgroundColor: "white", borderRadius: 1, input: { color: "black" } }}
            />
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          {location.pathname !== "/" && (
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
          )}
          {user && isAdmin && (
        <Button color="inherit" component={Link} to="/AdminDashboard">
          Admin Dashboard
        </Button>
      )}

          {user && isHotelOwner && (
            <Button color="inherit" component={Link} to="/HotelOwner">
              Dashboard
            </Button>
          )}

          {user && !hideHotelsButton && !isHotelOwner && (
            <Button color="inherit" component={Link} to="/hoteldash">
              Hotels
            </Button>
          )}

          {!hideAuthButtons && !user ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/sign">
                Sign Up
              </Button>
            </>
          ) : (
            user && (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <Avatar sx={{ bgcolor: "white", color: "#404040" }}>
                    {(user?.UName || user?.OwnerName)?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

