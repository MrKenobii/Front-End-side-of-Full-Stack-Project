import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { makeStyles } from '@material-ui/core/styles';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { LockOpen } from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign : "left"
  },
  link: {
      textDecoration : "none",
      boxShadow : "none",
      color : "white"
  }
}));

const Navbar = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const handleClick = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("username");
    navigate("/");
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ textAlign: "left"}}>
              <Link className={classes.link} to="/">Home</Link>
            </Typography>
            <Typography variant="h6" component="div">
              {localStorage.getItem("currentUser") === null ? 
                <Link className={classes.link} to="/auth">Login/Register</Link> :
                <div>
                  <IconButton onClick={handleClick} className={classes.link}>
                    <LockIcon></LockIcon>
                  </IconButton>
                  <Link className={classes.link} to={{ pathname: "/users/" + localStorage.getItem("currentUser") }}>Profile</Link>
                </div>
              }
                
            </Typography>
            
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
