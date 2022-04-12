import React from "react";
import Post from "../Post/Post";
import Container from '@mui/material/Container';
import './Home.css'
const Home = () => {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [postList, setPostList] = React.useState([]);
  React.useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error !!!</div>;
  } else if (!isLoaded) {
    return <div>Loading ...</div>;
  } else {
    return (
      <Container fixed maxWidth="md" className="container"> 
        {postList.map((post, index) => (
        <Post userId={post.userId} username={post.username} title={post.title} text={post.text} id={index}></Post>
        ))}
      </Container>
    );
  }
};

export default Home;
