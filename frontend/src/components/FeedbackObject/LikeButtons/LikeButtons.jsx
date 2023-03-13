import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import './LikeButtons.css'

const LikeButtons = (props) => {


    const [user, token] = useAuth()
    const [like, setLike] = useState('bi-hand-thumbs-up')
    const [dislike, setDislike] = useState('bi-hand-thumbs-down')
    const [likeCount, setLikeCount] = useState(props.likes)
    const [dislikeCount, setDislikeCount] = useState(props.dislikes)
    const [likedUsers, setLikedUsers] = useState(props.liked_users)
    const [dislikedUsers, setDislikedUsers] = useState(props.disliked_users)


    useEffect(() => {
        user && checkUser()
    }, [])

    function checkUser(){
        if (likedUsers.some((u) => {return u.username === user.username})){
            setLike('bi-hand-thumbs-up-fill')
        }
        if (dislikedUsers.some((u) => {return u.username === user.username})){
            setDislike('bi-hand-thumbs-down-fill')
        }
    }
    function changeLike(){
        like === ('bi-hand-thumbs-up') ? 
            (setLike('bi-hand-thumbs-up-fill')
            + setLikeCount(likeCount + 1))
            : (setLike('bi-hand-thumbs-up')
            + setLikeCount(likeCount - 1))
        dislike === ('bi-hand-thumbs-down-fill') &&
            (setDislike('bi-hand-thumbs-down')
            + setDislikeCount(dislikeCount - 1))
        
    }
    function changeDislike(){
        dislike === ('bi-hand-thumbs-down') ?
            (setDislike('bi-hand-thumbs-down-fill')
            + setDislikeCount(dislikeCount + 1))
            : (setDislike('bi-hand-thumbs-down')
            + setDislikeCount(dislikeCount - 1))
        like === ('bi-hand-thumbs-up-fill') &&
            (setLike ('bi-hand-thumbs-up')
            + setLikeCount(likeCount - 1))
    }

    async function handleLike(){
        if (props.from === 'feedback'){
            const response = await axios.put(`http://127.0.0.1:8000/api/feedback/${props.id}/handlereactions/L`, null, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            changeLike()
        }
        else if (props.from === 'replies'){
            const response = await axios.put(`http://127.0.0.1:8000/api/feedback/replies/${props.id}/handlereactions/L`, null, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            changeLike()
        }
    }

    async function handleDislike(){
        if (props.from === 'feedback'){
            const response = await axios.put(`http://127.0.0.1:8000/api/feedback/${props.id}/handlereactions/D`, null, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            changeDislike()
        }
        else if (props.from === 'replies'){
            const response = await axios.put(`http://127.0.0.1:8000/api/feedback/replies/${props.id}/handlereactions/D`, null, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            changeDislike()
        }
    }

    return ( 
        <div className='inline'>
            <i className={like} onClick={handleLike}>{likeCount}</i>
            <i className={dislike} onClick={handleDislike}>{dislikeCount}</i>
        </div>
     );
}
 
export default LikeButtons;