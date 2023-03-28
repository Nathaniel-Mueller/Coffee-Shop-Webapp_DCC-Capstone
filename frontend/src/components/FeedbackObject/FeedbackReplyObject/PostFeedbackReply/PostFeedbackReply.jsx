import axios from 'axios';
import React, { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';

const PostFeedbackReply = (props) => {

    const [user, token] = useAuth()
    const [postReplyText, setPostReplyText] = useState('')

    async function handleSubmit(e){
        e.preventDefault()
        let newPostReply = {
            text: postReplyText,
        }
        const response = await axios.post(`http://127.0.0.1:8000/api/feedback/${props.id}/replies`, newPostReply, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        props.postFeedbackReply(response.data)
    }

    return ( 
        user ? 
        (<form onSubmit={handleSubmit}>
            <input type = 'text' value = {postReplyText} onChange={(e) => setPostReplyText(e.target.value)} />
            <button className='btn btn-primary'>Post</button>
        </form>) :
        (<div>
            log in lol
        </div>)
     );
}
 
export default PostFeedbackReply;