import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Auth from "../Auth/Auth";
//import { userObject } from "../Auth/Auth";
import useStyles from "./styles";
import memories from "../../images/memories.png";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");
  };

  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  //console.log(JSON.stringify(localStorage.getItem("profile")));
  //setUser(localStorage.getItem("profile"));
  //const user = { user };

  const refreshPage = function () {
    setTimeout(function () {
      window.location.reload();
    }, 1);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <BrowserRouter>
        <div className={classes.brandContainer}>
          <Typography
            component={Link}
            to="/"
            className={classes.heading}
            variant="h2"
            align="center"
            onClick={refreshPage}
          >
            Memories
          </Typography>
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            height="60"
          />
        </div>
      </BrowserRouter>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
