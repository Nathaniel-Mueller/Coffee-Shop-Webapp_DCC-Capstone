import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import LikeButtons from '../LikeButtons/LikeButtons';
import PostFeedbackReply from './PostFeedbackReply/PostFeedbackReply';
import './FeedbackReplyObject.css'
import ToggleActivity from '../ToggleActivity/ToggleActivity';
import axios from 'axios';

const FeedbackReplyObject = (props) => {

    const [filteredReplies, setFilteredReplies] = useState([])
    const [user, token] = useAuth()

    let tempReplies = props.feedbackReplies
    //debugger
    let replies = tempReplies.filter((reply) => {
        if (reply.reply_to_feedback.id === props.feedbackId){
            return reply
        }
    })

    function postFeedbackReply(newReply) {
        let temp = [...filteredReplies, newReply]
        setFilteredReplies(temp)
    }

    useEffect(() => {
        setFilteredReplies(replies)
    }, [props.feedbackReplies])

    async function deleteReply(id){
        const response = await axios.delete(`http://127.0.0.1:8000/api/feedback/replies/${id}`, {
            headers: {
                Authorization : 'Bearer ' + token
            }
        })
        let temp = filteredReplies.filter((r) => { return r.id !== id})
        setFilteredReplies(temp)
        
    }
    return ( 
        <div>
           {filteredReplies.map((reply) => {
            return <ul className={'reply ' + (!props.is_active && 'inactive')} key={reply.id}>{reply.user.username} replied: {reply.text}
            <LikeButtons likes = {reply.likes}
                         dislikes = {reply.dislikes}
                         id = {reply.id}
                         liked_users = {reply.liked_users}
                         disliked_users = {reply.disliked_users}
                         from = 'replies'/>
            {user && ((user.is_superuser || user.username === reply.user.username) && <div onClick={() => {deleteReply(reply.id)}}>delete</div>)}
            </ul>
           
           })}
           {props.is_active && <PostFeedbackReply id={props.feedbackId} postFeedbackReply = {postFeedbackReply}/>}
        </div>
     );
}
 
export default FeedbackReplyObject;