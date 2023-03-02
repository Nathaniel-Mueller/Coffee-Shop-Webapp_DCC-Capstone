import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './Redirect.css'

const Redirect = (props) => {

    const [user] = useAuth()
    const navigate = useNavigate()


    useEffect(() => {
        setTimeout(() => {
            !user && navigate('/login')
        }, 5000);
    })

    return ( 
        !user ? (
        <div className='redir'>
            <div>You must be logged in to view this page</div>
            <span>Redirecting you to the login page...</span>

        </div>)
        : (
            !user.is_staff && (
                <div className='redir'>
                    <div>You are not authorized to view this page</div>
                    <a onClick={() => navigate(-1)}>Click here to go back</a>
                </div>
            )
        )
     );
}
 
export default Redirect;