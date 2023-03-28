import React, { useState } from 'react';
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SideNav from "./SideNav/SideNav";
import ProfileNav from './ProfileNav/ProfileNav';
import "./NavBar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sideNavWidth, setSideNavWidth] = useState('0')
  const [profileNavWidth, setProfileNavWidth] = useState('0')

  function openSideNav () {
    setSideNavWidth('25%')
  }
  function closeSideNav (){
    setSideNavWidth('0')
    
  }
  function openProfileNav () {
    setProfileNavWidth('25%')
  }
  function closeProfileNav () {
    setProfileNavWidth('0')
  }
  return (
    <div className="navBar">
      <ul>
        {((sideNavWidth !== '0') || (profileNavWidth !== '0')) && <div className='overlay' onClick={() => {closeSideNav(); closeProfileNav()}}></div>}
        <a onClick={() => {openSideNav(); closeProfileNav();}}
           className='sidenav-button'>&#9776;</a>
        <SideNav navWidth = {sideNavWidth} closeSideNav = {closeSideNav}/>
          <Link to="/"
                className='brand'>
            <h1>Grounded</h1>
            <h3>Coffee Bar</h3>
        </Link>
        <li>
          {user ? (
            <div>
              <a onClick={() => {openProfileNav(); closeSideNav();}}
                 className='profnav-button'>{user.username}</a>
              <ProfileNav profileWidth = {profileNavWidth} closeProfileNav = {closeProfileNav}/>
            </div>
          ) : (
            <a onClick={() => navigate("/login")}
               className ='login'>Login</a>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
