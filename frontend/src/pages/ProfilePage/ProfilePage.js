import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './ProfilePage.css'

const ProfilePage = (props) => {

    const [user, token] = useAuth()
    const navigate = useNavigate()


    async function getUser() {
        const response = await axios.get(`http://127.0.0.1:8000/api/auth/profile`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
    }
    useEffect(() => {
        user && getUser()
    }, [])
    return ( 
        <div className='container'>
            <h1>{user.username}'s profile</h1>
            <h3>Email: {user.email}</h3>
            <h3>Name: {user.first_name} {user.last_name}</h3>
            

            <div onClick={() => {navigate('/profile/edit')}}>Click here to edit your profile</div>
            
            
        </div> 
    );
}
 
export default ProfilePage;