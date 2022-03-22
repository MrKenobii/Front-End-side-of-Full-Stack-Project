import React, {useState, useEffect} from 'react'
import ReactDOM from "react-dom";
const Post = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        fetch("/posts")
        .then(res => res.json())
        .then(result => {
            setIsLoaded(true);
            setPostList(result);
        }, error => {
            setIsLoaded(true);
            setError(error);
        });
    }, []);
    if(error){
        return <div>Error !!!</div>
    }else if(!isLoaded){
        return <div>Loading ...</div>
    }else{
        return (
            <div>
                <ul>
                    {postList.map((post, index) => (
                        <li id={index}>{post.title}, {post.text}</li>
                    ))}
                </ul>       
            </div>
        )
    }
    
}

export default Post;
