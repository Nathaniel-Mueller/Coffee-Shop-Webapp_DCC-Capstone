import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import './LikeButtons.css'

const LikeButtons = (props) => {


    const [user, token] = useAuth()
    const [like, setLike] = useState('bi-hand-thumbs-up')
    const [dislike, setDislike] = useState('bi-hand-thumbs-down')
    const [likeCount, setLikeCount] = useState(props.objLikes)
    const [dislikeCount, setDislikeCount] = useState(props.dislikes)
    const [currentPost, setCurrentPost] = useState({})

    let object = props.tempObject

    async function getCurrentPost() {
        debugger
        if (props.from === 'feedback'){
            setCurrentPost(props.obj)}
       //     const response = await axios.get(`http://127.0.0.1:8000/api/feedback/${props.id}`)
       //     setCurrentPost(response.data[0])
       // }
       // else if (props.from === 'replies'){
       //     const response = await axios.get(`http://127.0.0.1:8000/api/feedback/replies/${props.id}`)
       //     setCurrentPost(response.data[0])
       // }
    }

    async function handleLike(){
        console.log(object)
        debugger
        setCurrentPost(props.obj)
        if (props.from === 'feedback'){
            const response = await axios.put(`http://127.0.0.1:8000/api/feedback/${props.id}/handlereactions/L`, null, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            like == 'bi-hand-thumbs-up' ? 
                (setLike('bi-hand-thumbs-up-fill'))
            :   (setLike('bi-hand-thumbs-up'))
           console.log(currentPost)
            if (response.status===204 && !object.liked_users.includes(user)){
                debugger
                props.setLikes(object.likes+1)
                setLikeCount(props.objLikes + 1)
               // props.setUsers(user)
            }
            else if (response.status===204 && props.liked_users.length !==0){
                props.setLikes(props.objLikes, null)
                setLikeCount(props.objLikes)
            }
        }
        else if (props.from === 'replies'){
            const response = await axios.put(`http://127.0.0.1:8000/api/feedback/replies/${props.id}/handlereactions/L`, null, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
        }
    }

    async function changeDislike(){
        if (props.from === 'feedback'){
            const response = await axios.put(`http://127.0.0.1:8000/api/feedback/${props.id}/handlereactions/D`, null, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
        }
        else if (props.from === 'replies'){
            const response = await axios.put(`http://127.0.0.1:8000/api/feedback/replies/${props.id}/handlereactions/D`, null, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
        }
    }

    return ( 
        <div className='inline'>
            <i className={like} onClick={handleLike}>{likeCount}</i>
            <i className={dislike} onClick={changeDislike}>{dislikeCount}</i>
        </div>
     );
}
 
export default LikeButtons;