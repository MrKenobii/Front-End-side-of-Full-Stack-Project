import * as React from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@material-ui/core/Container";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  //   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    textAlign: "left",
    margin: 20,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
}));

const Post = ({ title, text, username, userId, index, postId, likes }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [commentList, setCommentList] = React.useState([]);
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(likes.length);

  const isInitialMount = React.useRef(true);
  const classes = useStyles();
  const [likeId, setLikeId] = React.useState(null);
  let disabled = localStorage.getItem("currentUser") === null ? true : false ;

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      deleteLike();
    } else {
      setLikeCount((prev) => prev + 1);
      saveLike();
    }
  };
  const checkLikes = () => {
    var likeControl = likes.find((like) => like.userId.toString() === localStorage.getItem("currentUser"));
    if (likeControl != null) {
      setLikeId(likeControl?.id);
      setIsLiked(true);
    }
  };

  const refreshComments = () => {
    fetch(`/comments?postId=${postId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  const saveLike = () => {
    fetch('/likes', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey")
      },
      body: JSON.stringify({
        postId,
        userId: localStorage.getItem("currentUser")
      })
    })
    .then(res => res.json())
    .catch(err => console.log(err));
  }

  const deleteLike = () => {
    fetch(`/likes/${likeId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": localStorage.getItem("tokenKey")
      },
    })
    .catch(err => console.log(err));
  }

  React.useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [commentList]);

  React.useEffect(() => {
    checkLikes();
  }, []);

  return (
    <Card sx={{ maxWidth: 800 }} className={classes.root} key={index}>
      <CardHeader
        avatar={
          <Link className={classes.link} to={{ pathname: "/users/" + userId }}>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        style={{ textAlign: "left" }}
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton disabled={disabled} onClick={handleLike} aria-label="add to favorites">
          <FavoriteIcon style={isLiked ? { color: "red" } : null} />
        </IconButton>
        {likeCount}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed className={classes.container}>
          {error
            ? "error"
            : isLoaded
            ? commentList.map((comment, index) => (
                <Comment
                  userId="1"
                  userName="USER"
                  text={comment.text}
                  index={index}
                ></Comment>
              ))
            : "Loading"}
            {disabled ? null : <CommentForm userId="1" userName="USER" postId={postId}></CommentForm> }
          
        </Container>
      </Collapse>
    </Card>
  );
};

export default Post;
