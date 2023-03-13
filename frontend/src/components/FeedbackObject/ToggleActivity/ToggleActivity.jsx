import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const ToggleActivity = (props) => {

    const [user, token] = useAuth()
    const navigate = useNavigate()



    async function togglePost() {
            const response = await axios.put(`http://127.0.0.1:8000/api/feedback/${props.id}/toggleactive`, null, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
        navigate(0)
    }

    return ( 
        <div onClick={togglePost}>
            test
        </div>
     );
}
 
export default ToggleActivity;