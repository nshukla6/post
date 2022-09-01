import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import useOnline from "../hooks/useOnline";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const linkStyle = {
  color: "whitesmoke",
  marginRight: 10,
  textDecoration: "none",
  fontSize: 20,
};

export default function ButtonAppBar() {
  const online = useOnline();
  const amount = useSelector(store => store.cart.amount);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color={online ? "primary" : "secondary"} position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link style={linkStyle} to="/">
              Home
            </Link>
            <Link style={linkStyle} to="/about">
              About
            </Link>
            <Link style={linkStyle} to="/users">
              Users
            </Link>
          </Box>
          <Badge badgeContent={amount.toString()} color="error">
          <ShoppingCartIcon />
          </Badge>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}
