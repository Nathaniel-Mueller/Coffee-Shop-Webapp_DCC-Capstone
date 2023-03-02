import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import './SideNav.css'


const SideNav = (props) => {


    const [user] = useAuth()

    return ( 
        <div className='item' style={{width: `${props.navWidth}`}}>
            <a  onClick={props.closeSideNav}
                className='close-button'>&times;</a>
            <div className='links'>
                <Link to='/'>Home</Link>
                <Link to='/menu'>Our Menu</Link>
                <Link to='/feedback'>Suggestions and Feedback</Link>
                {user && user.is_staff &&
                    <Link to='/menu/recipes'>View Recipes</Link>}
                {user && user.is_staff &&
                    <Link to='/inventory'>Do Inventory</Link>}
            </div>
        </div>
     );
}
 
export default SideNav;