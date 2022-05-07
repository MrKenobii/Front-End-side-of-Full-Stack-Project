import { ClassNames } from '@emotion/react';
import { makeStyles } from '@material-ui/core';
import React from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '../Avatar/Avatar';
import UserActivity from '../UserActivity/UserActivity';
const useStyles = makeStyles( {
    root: {
        display: 'flex'
    }
});
const User = () => {
    const {userId} = useParams();
    const classes = useStyles();
    const [user, setUser] = React.useState();
    
    const getUser = () => {
        fetch(`/users/${userId}`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setUser(result);
            },
            (error) => {
                console.log(error)
            }
        )
        }

        React.useEffect(() => {
            getUser()
        }, [])
    return (
        <div className={classes.root}>
            {user? <Avatar avatarId={user.avatar} />: ""}
            <UserActivity userId={userId} />
        </div>
    )
}

export default User
