import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { signup_api } from "./api/apiCalls";
import axios from "axios";
import MailIcon from "@mui/icons-material/Mail";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import Input from "./Input";
import { UserContext } from "./Context";

const Cred = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { dispatch } = useContext(UserContext);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (type === "signup") {
      let m = 0;
      if (data.name == "") {
        m = 1;
        setValid((prev) => ({ ...prev, name: false }));
      } else {
        setValid((prev) => ({ ...prev, name: true }));
      }
      if (data.email == "") {
        m = 1;
        setValid((prev) => ({ ...prev, email: false }));
      } else {
        setValid((prev) => ({ ...prev, email: true }));
      }
      if (data.password == "") {
        m = 1;
        setValid((prev) => ({ ...prev, password: false }));
      } else {
        setValid((prev) => ({ ...prev, password: true }));
      }
      if (data.confirm != data.password) {
        m = 1;
        setValid((prev) => ({ ...prev, confirm: false }));
      } else {
        setValid((prev) => ({ ...prev, confirm: true }));
      }
      if (m == 1) {
        return;
      }

      const res = await signup_api(data);
      if (res.success) {
        dispatch({ type: "login", payload: { ...res } });
        navigate("/")
      } else {
        console.log("error")
      }
    } else {
      //await login(data)
      let m = 0;
      if (data.email == "") {
        m = 1;
        setValid((prev) => ({ ...prev, email: false }));
      } else {
        setValid((prev) => ({ ...prev, email: true }));
      }
      if (data.password == "") {
        m = 1;
        setValid((prev) => ({ ...prev, password: false }));
      }
      if (m == 1) {
        return;
      }
    }
  };

  const handleType = () => {
    if (type == "signup") {
      navigate("/user/login");
    } else {
      navigate("/user/signup");
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [type, setType] = useState("signup");
  const [valid, setValid] = useState({
    name: true,
    password: true,
    confirm: true,
    email: true,
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  // const { signup, error: signerror, loading: signloading } = useSignup()
  // const { login, error: lerror, loading: lLoading } = useLogin()
  const { id } = useParams();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeData = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (id != type) {
      if (id == "login") {
        setType("login");
      } else {
        setType("signup");
      }
      setData({
        name: "",
        email: "",
        password: "",
      });
    } else {
      if (id == "login") {
        setType("login");
        // setError(lerror)
        // setLoading(lLoading)
      } else {
        setType("signup");
        setData((prevData) => ({
          ...prevData,
          confirm: "",
        }));

        //setError(signerror)

        // setLoading(signloading)
      }
    }
    console.log(error);
  }, [id]);
  return (
    <Grid
      container
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#2E3440",
      }}
    >
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 20px",
          boxShadow: "1px 1px #ccc",
          backgroundColor: "#D8DEE9",
          borderRadius: "10px",
        }}
      >
        <Typography style={{ fontSize: "20px", color: "#2E3440" }}>
          {type == "login" ? "Login" : "Signup"}
        </Typography>

        <Grid
          container
          spacing={2}
          style={{
            width: "600px",

            alignItems: "center",
            justifyContent: "center",
            padding: "10px 20px",
          }}
        >
          {type == "signup" && (
            <Grid item md={6} xs={12} display="flex" flexDirection={"column"}>
              <Input
                value={data.name}
                onChange={onChangeData}
                label="User Name"
                name="name"
                type="text"
                error={!valid.name}
                helperText={!valid.name ? "Username is required" : " "}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ color: "#4C566A" }}
                    >
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}
          <Grid
            item
            md={type == "signup" ? 6 : 12}
            xs={12}
            display="flex"
            flexDirection={"column"}
          >
            <Input
              value={data.email}
              onChange={onChangeData}
              label="Email"
              name="email"
              error={!valid.email}
              helperText={!valid.email ? "Enter valid email" : " "}
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#4C566A" }}>
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            md={type == "signup" ? 6 : 12}
            xs={12}
            display="flex"
            flexDirection={"column"}
          >
            <Input
              label="Password"
              type={showPassword.password ? "text" : "password"}
              value={data.password}
              name="password"
              onChange={onChangeData}
              error={!valid.password}
              helperText={!valid.password ? "Password is required" : " "}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                      style={{ color: "#4C566A" }}
                    >
                      {showPassword.password ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {type == "signup" && (
            <Grid item md={6} xs={12} display="flex" flexDirection={"column"}>
              <Input
                label="Confirm Password"
                value={data.confirm}
                name="confirm"
                onChange={onChangeData}
                error={!valid.confirm}
                helperText={!valid.confirm ? "Password did not match" : " "}
                type={showPassword.confirm ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            confirm: !prev.confirm,
                          }))
                        }
                        style={{ color: "#4C566A" }}
                      >
                        {showPassword.confirm ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#4C566A",
                color: "#D8DEE9",
              }}
              variant="contained"
            >
              {type == "signup" ? "Submit" : "LogIn"}
            </Button>
            <Typography variant="h7" style={{ margin: "10px 0" }}>
              OR
            </Typography>
            <Button
              disabled={loading}
              type="button"
              fullWidth
              style={{
                padding: "10px",
                color: "#4C566A",
                ":hover": {
                  backgroundColor: "#4C566A",
                },
              }}
              onClick={handleType}
            >
              {type != "signup" ? "SignUp" : "LogIn"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default Cred;