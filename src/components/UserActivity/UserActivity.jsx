import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, makeStyles } from "@material-ui/core";

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Post from "../Post/Post";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const PoopUp = ({ isOpen, postId, setIsOpen }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
  const [post, setPost] = React.useState();

  const getPost = () => {
    fetch(`/posts/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("tokenKey"),
        },
      })
      .then(res => res.json())
      .then(
          (result) => {
              console.log(result);
              setPost(result);
          }
      ).catch(err => console.log(err));
    }

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    getPost();
  }, [postId]);
  return  (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" onClick={handleClose}>
            Close
          </Typography>
        </Toolbar>
      </AppBar>
      {post? <Post likes = {post.postLikes} postId = {post.id} userId = {post.userId} username = {post.username}  
                    title={post.title} text={post.text} index={post.id}></Post> : "loading"}     
    </Dialog>

  )
};
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const UserActivity = ({ userId }) => {
  const classes = useStyles();

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [activityList, setActivityList] = React.useState([]);
  const [selectedPost, setSelectedPost] = React.useState(null);

  const getActivity = () => {
    fetch(`/users/activity/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        console.log(result);
        setActivityList(result);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
        setError(error);
      });
  };
  const handleNotification = (postId) => {
    setSelectedPost(postId);
    setIsOpen(true);
  };
  React.useEffect(() => {
    getActivity();
  }, []);
  return (
    <>
     {isOpen? <PoopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen}/>: ""}
      <TableContainer component={Paper} sx={{ maxWidth: 400, maxHeight: 700 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  display: "flex",
                  alignSelf: "center",
                  alignItems: "center",
                  justifySelf: "center",
                  justifyContent: "center",
                }}
              >
                User Activity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityList.map((activity, i) => (
              <Button onClick={() => handleNotification(activity[1])}>
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      display: "flex",
                      alignSelf: "center",
                      alignItems: "center",
                      justifySelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    {activity[3] + " " + activity[0] + " your post"}
                  </TableCell>
                </TableRow>
              </Button>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default UserActivity;
