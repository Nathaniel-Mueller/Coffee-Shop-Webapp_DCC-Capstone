import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './EditProfileSubmit.css'

const EditProfileSubmit = (props) => {

    const {logoutUser} = useContext(AuthContext)

    useEffect(() => {
        setTimeout(() => {
            logoutUser()
        }, 1000);
    })

    return ( 
        <div className='pop-up'>
            <div>
                Your profile has been updated!
            </div>
            <div>
                You will now be logged out...
            </div>
        </div>
     );
}
 
export default EditProfileSubmit;