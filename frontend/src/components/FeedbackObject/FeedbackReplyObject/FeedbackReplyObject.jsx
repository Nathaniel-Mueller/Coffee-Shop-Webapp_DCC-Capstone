import React, { useState, useEffect } from 'react';
import LikeButtons from '../LikeButtons/LikeButtons';
import './FeedbackReplyObject.css'

const FeedbackReplyObject = (props) => {

    let replies = props.feedbackReplies
    let filteredReplies = replies.filter((reply) => {
        if (reply.reply_to_feedback.id === props.feedbackId){
            return reply
        }
    })

    return ( 
        <div>
           {filteredReplies.map((reply) => {
            return <ul className='reply' key={reply.id}>{reply.user.username} replied: {reply.text}
            <LikeButtons likes = {reply.likes}
                         dislikes = {reply.dislikes}
                         id = {reply.id}
                         liked_users = {reply.liked_users}
                         from = 'replies'/>
            </ul>
           })}
        </div>
     );
}
 
export default FeedbackReplyObject;