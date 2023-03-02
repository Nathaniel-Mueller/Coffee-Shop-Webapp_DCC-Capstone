import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfileNav.css'
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';

const ProfileNav = (props) => {

    const { logoutUser, user } = useContext(AuthContext)

    return ( 
        <div className='item2' style={{width: `${props.profileWidth}`}}>
        <a  onClick={props.closeProfileNav}
            className='close-button'>&times;</a>
        <div className='links'>
            <Link to='/profile'>View My Profile</Link>
            <Link to='/profile/edit'>Edit My Profile</Link>
            {user.is_staff && 
            <Link to='/schedule'>See Current Schedule</Link>}
            <Link to=''onClick={logoutUser}>Logout</Link>
        </div>

    </div>
     );
}
 
export default ProfileNav;