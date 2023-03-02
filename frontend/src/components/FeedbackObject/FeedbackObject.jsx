import React, { useState, useEffect } from 'react';
import FeedbackReplyObject from './FeedbackReplyObject/FeedbackReplyObject';
import LikeButtons from './LikeButtons/LikeButtons';
import axios from 'axios';
import './FeedbackObject.css'

const FeedbackObject = (props) => {

    const [feedback, setFeedback] = useState([])
    const [feedbackReplies, setFeedbackReplies] = useState([])
    const [feedbackLikes, setFeedbackLikes] = useState(0)
    const [feedbackLikedUsers, setFeedbackLikedUsers] = useState ([])
    const [object, setObject] = useState({})

    async function getFeedback() {
        const response = await axios.get(`http://127.0.0.1:8000/api/feedback/`)
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

    return ( 
        <div>

            {feedback.map((obj) => {
                //debugger
                function setLikes(likeCount) {
                    setFeedbackLikes(likeCount)
                }
                
                function setUsers(user) {
                    let tempUser = [...feedbackLikedUsers, user]
                    setFeedbackLikedUsers(tempUser)
                }
                function setObject(obj) {
                    setObject(obj)
                }
                return (
                        <ul key={obj.id}
                            className='container'>
                                <div className='feedback'>
                                    {obj.user.username} says: {obj.text}
                                    <LikeButtons objLikes = {obj.likes}
                                                 setCurrent = {setObject}
                                                 obj = {obj}
                                                 tempObject = {object}
                                                 likes = {feedbackLikes}
                                                 setLikes = {setLikes}
                                                 dislikes = {obj.dislikes}
                                                 id = {obj.id}
                                                 liked_users = {feedbackLikedUsers}
                                                 setUsers = {setUsers}
                                                 from='feedback'/>
                                </div>
                                <FeedbackReplyObject feedbackId = {obj.id} feedbackReplies = {feedbackReplies}/> 
                        </ul>)
            })}
        </div>
     );
}
 
export default FeedbackObject;