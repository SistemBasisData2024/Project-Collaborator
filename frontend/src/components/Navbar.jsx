import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1300, backgroundColor: "#ff6347" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ color: "#FFFFFF", fontFamily: "Montserrat, sans-serif", fontWeight: "bold" }}>
          ProjectPals
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ color: "#FFFFFF", fontFamily: "Montserrat, sans-serif", fontWeight: "bold", "&:hover": { color: "#ffa07a" } }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/find-collaborator"
            sx={{ color: "#FFFFFF", fontFamily: "Montserrat, sans-serif", fontWeight: "bold", "&:hover": { color: "#ffa07a" } }}
          >
            Find Collaborator
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/find-projects"
            sx={{ color: "#FFFFFF", fontFamily: "Montserrat, sans-serif", fontWeight: "bold", "&:hover": { color: "#ffa07a" } }}
          >
            Find Projects
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/profile"
            sx={{ color: "#FFFFFF", fontFamily: "Montserrat, sans-serif", fontWeight: "bold", "&:hover": { color: "#ffa07a" } }}
          >
            Profile
          </Button>
        </Box>
        <Button
          color="inherit"
          component={Link}
          to="/login"
          sx={{ color: "#FFFFFF", fontFamily: "Montserrat, sans-serif", fontWeight: "bold", "&:hover": { color: "#ffa07a" } }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
