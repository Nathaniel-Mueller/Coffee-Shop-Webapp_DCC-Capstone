import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import './ProfilePage.css'

const ProfilePage = (props) => {

    const [user, token] = useAuth()


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
        <div>
            Email: {user.email}
            Username: {user.username}
            Name: {user.first_name} {user.last_name}
        </div> 
    );
}
 
export default ProfilePage;