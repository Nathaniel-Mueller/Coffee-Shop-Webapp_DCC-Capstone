import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import FeedbackReplyObject from './FeedbackReplyObject/FeedbackReplyObject';
import PostFeedback from './PostFeedback/PostFeedback';
import ToggleActivity from './ToggleActivity/ToggleActivity';
import LikeButtons from './LikeButtons/LikeButtons';
import axios from 'axios';
import './FeedbackObject.css'

const FeedbackObject = (props) => {

    const [user, token] = useAuth()
    const [feedback, setFeedback] = useState([])
    const [feedbackReplies, setFeedbackReplies] = useState([])
    
    async function getFeedback() {
        const response = await axios.get(`http://127.0.0.1:8000/api/feedback`)
        setFeedback(response.data)
    }
    async function getFeedbackReplies() {
        const response = await axios.get(`http://127.0.0.1:8000/api/feedback/replies`)
        setFeedbackReplies(response.data)
    }
    useEffect(() => {
        getFeedback()
        getFeedbackReplies()
    }, [])


    function postFeedback(post){
        let temp = [...feedback, post]
        setFeedback(temp)
    }

    async function deleteObject(id) {
        const response = await axios.delete(`http://127.0.0.1:8000/api/feedback/${id}`, {
            headers : {
                Authorization : 'Bearer ' + token
            }
        })
        let temp = feedback.filter((o) => { return o.id !== id })
        setFeedback(temp)
    }

    return ( 
        <div>

            {feedback.map((obj) => {
                return (
                    <ul key={obj.id}
                    className='container'>
                            <div className={'feedback ' + (!obj.is_active && 'inactive')}>
                                {obj.user.username} says: {obj.text}
                                <LikeButtons likes = {obj.likes}
                                            dislikes = {obj.dislikes}
                                            id = {obj.id}
                                            liked_users = {obj.liked_users}
                                            disliked_users = {obj.disliked_users}
                                            from='feedback'/>
                                {user && (user.is_superuser && (<ToggleActivity id={obj.id}
                                                                       is_active = {obj.is_active}
                                                                      from = 'feedback'/>))}
                                {(user && (user.is_superuser || user.username === obj.user.username) && <div onClick={() => {deleteObject(obj.id)}}> del </div>)}
                            </div>
                            <FeedbackReplyObject feedbackId = {obj.id} feedbackReplies = {feedbackReplies} is_active = {obj.is_active}/>
                                
                        </ul>)
            })}
            <PostFeedback postFeedback = {postFeedback}/>
        </div>
     );
}
 
export default FeedbackObject;