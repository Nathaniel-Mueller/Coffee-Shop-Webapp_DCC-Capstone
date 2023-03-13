import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InventoryPopUp.css'

const InventoryPopUp = (props) => {

    const nav = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            nav(0)
        }, 3000);
    })

    return ( 
        <div className='pop-up'>
            <div>
                Thank you for doing inventory!
            </div>
            <div>
                This page will now refresh, please wait...
            </div>
        </div>
     );
}
 
export default InventoryPopUp;