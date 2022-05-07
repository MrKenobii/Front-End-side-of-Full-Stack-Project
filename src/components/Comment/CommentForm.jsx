import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  InputAdornment,
  OutlinedInput,
  Avatar,
} from "@material-ui/core";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
}));

const CommentForm = ({ userId, username, index, postId }) => {
  const classes = useStyles();
  const [text, setText] = React.useState('');
  const saveComment = () => {
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey")
      },
      body: JSON.stringify({
        postId,
        userId,
        text
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
      saveComment();
      setText('');
  };

  const handleChange = (value) => {
    setText(value);
  }
  return (
    <CardContent className={classes.comment} key={index}>
      <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        onChange={(e) => handleChange(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <Button
              variant="contained"
              style={{
                background: "linear-gradient(45deg, #1f09a0 30%, #2096b1 90%)",
                color: "white",
              }}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </InputAdornment>
        }
        startAdornment={
          <InputAdornment position="start">
            <Link
              className={classes.link}
              to={{ pathname: "/users/" + userId }}
            >
              <Avatar aria-label="recipe" className={classes.small}>
                {username.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        style={{ color: "black", backgroundColor: "white" }}
        value={text}
      ></OutlinedInput>
    </CardContent>
  );
};

export default CommentForm;
