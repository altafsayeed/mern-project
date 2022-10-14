import React, { useState, useEffect } from "react";
//import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import Input from "./Input";
//import { AUTH } from "../../constants/actionTypes";

const Auth = () => {
  const classes = useStyles();
  //let [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = () => {};

  const handleChange = () => {};

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  // const createOrGetUser = async (response) => {
  //   const decoded { name, picture, sub } = jwt_decode(
  //     response.credential
  //   );

  //   const { name, picture, sub } = decoded;

  //   const user = {
  //     _id: sub.trim,
  //     _type: "user",
  //     userName: name,
  //     image: picture,
  //   };

  //   await axios.post(`http://localhost:3000/api/auth`, user);
  // };

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: "AUTH", data: { result, token } });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const googleFailure = (error) => {
  //   console.log(error);
  //   console.log("Google Sign In was unsuccessful.");
  // };

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    //user = userObject;
    document.getElementById("signInDiv").hidden = true;

    //localStorage.setItem("profile", response.credential);
    //return userObject;
  }

  function handleSignOut(event) {
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "438141775663-6f9r3uptsdp8d76orvqtt64vce5dqgd7.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          {/* <GoogleLogin
            onSuccess={(response) => createOrGetUser(response)}
            onFailure={googleFailure}
            onError
            {...(error) => console.log(error)}
            className={classes.googleButton}
            cookiePolicy="single_host_origin"
          /> */}
          <div id="signInDiv"></div>
          <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

//export { user };
export default Auth;
