import React from "react";
import Post from "../Post/Post";
import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core/styles";
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f5ff",
  },
}));

const Home = () => {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [postList, setPostList] = React.useState([]);
  const classes = useStyles();
  const refreshPosts = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          alert(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  React.useEffect(() => {
    refreshPosts();
  }, [postList]);
  if (error) {
    return <div>Error !!!</div>;
  } else if (!isLoaded) {
    return <div>Loading ...</div>;
  } else {
    return (
      <div className={classes.container}>
        <PostForm userId={1} username={"Anil"} refreshPosts={refreshPosts} />
        {postList.map((post, index) => (
          <Post
            userId={post.userId}
            username={post.username}
            title={post.title}
            text={post.text}
            index={index}
            postId={post.id}
          ></Post>
        ))}
      </div>
    );
  }
};

export default Home;
