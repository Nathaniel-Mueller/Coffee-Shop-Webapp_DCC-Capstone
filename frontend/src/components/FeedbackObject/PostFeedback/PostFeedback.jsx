import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const PostFeedback = (props) => {

    const [user, token] = useAuth()
    const [postText, setPostText] = useState('')

    async function handleSubmit(e){
        e.preventDefault()
        let newPost = {
            text: postText,
        }
        const response = await axios.post(`http://127.0.0.1:8000/api/feedback/`, newPost, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
        props.postFeedback(response.data)
    }

    return ( 
        user ? (
        <form onSubmit={handleSubmit}>
            <input type = 'text' value = {postText} onChange={(e) => setPostText(e.target.value)} />
            <button className='btn btn-primary'>Post</button>
        </form>) :
        (
        <div>
            You must be logged in to add feedback!
        </div>
        )
        
     );
}
 
export default PostFeedback;