import { ClassNames } from '@emotion/react';
import { makeStyles } from '@material-ui/core';
import React from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '../Avatar/Avatar';
import UserActivity from '../UserActivity/UserActivity';
import { GetWithAuth } from '../../services/HttpService';
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
        GetWithAuth(`/users/${userId}`)
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
            {user? <Avatar avatarId={user.avatar} userId={userId} username={user.username} />: ""}
            {localStorage.getItem("currentUser") === userId ? <UserActivity userId={userId} />: null}
        </div>
    )
}

export default User
