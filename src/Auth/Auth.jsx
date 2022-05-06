import React from "react";
import {
  Input,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from "@mui/material";
import TextField from '@mui/material/TextField';

import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleUsername = (value) => {
    setUsername(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };
  const sendRequest = (path) => {
    fetch(`/auth/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.message);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("username", username);
      })
      .catch((err) => console.log(err));
  };
  const handleButton = (path) => {
    sendRequest(path);
    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <FormControl>
      {/* <InputLabel>Username</InputLabel> */}
      <TextField label="Username" variant="outlined" onChange={(input) => handleUsername(input.target.value)} />
      {/* <InputLabel style={{ top: 80 }}>Password</InputLabel> */}
      <TextField
        style={{ top: 40 }}
        onChange={(input) => handlePassword(input.target.value)}
        label="Password" variant="outlined"
      />
      <Button
        variant="contained"
        style={{
          marginTop: 60,
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          color: "white",
        }}
        onClick={() => handleButton("register")}
      >
        Register
      </Button>
      <FormHelperText style={{ margin: 20 }}>
        Already have an account ?
      </FormHelperText>
      <Button
        variant="contained"
        style={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          color: "white",
        }}
        onClick={() => handleButton("login")}
      >
        Log in
      </Button>
    </FormControl>
  );
};

export default Auth;
