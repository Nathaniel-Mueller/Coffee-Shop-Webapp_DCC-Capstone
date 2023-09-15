import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth';
import EditProfilePopUp from '../../components/EditProfilePopUp/EditProfilePopUp';
import axios from 'axios';
import './EditProfilePage.css'

const EditProfilePage = (props) => {

    let formValues = {
        newPass: '',
        newPassAgain: '',
        oldPass: '',
        first_name: '',
        last_name: '',
        email: '',
        username: '',
    }
    const [user, token] = useAuth()
    const [formData, handleInputChange, handleSubmit] = useCustomForm(formValues, updateProfile)
    const [seePass, setSeePass] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [changePass, setChangePass] = useState(false)
    

    function togglePassVisibility(){
        if (seePass){
            setSeePass(false)
        }
        else if (!seePass){
            setSeePass(true)
        }
    }

    function togglePopUp() {
        setSubmitted(true)
    }

    function togglePassOrProfile(){
        if (changePass){
            setChangePass(false)
        }
        else if (!changePass){
            setChangePass(true)
        }
    }

    async function updateProfile(){
        if (formData.username === ''){
            delete formData.username
        }
        if (formData.newPass === ''){
            delete formData.newPass
        }
        if (formData.first_name === ''){
            delete formData.first_name
        }
        if (formData.last_name === ''){
            delete formData.last_name
        }
        if (formData.newPassAgain === ''){
            delete formData.newPassAgain
        }
        if (formData.email === ''){
            delete formData.email
        }
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/auth/profile/edit/`, formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            console.log (response.status)
            if (response.status === 200){
                togglePopUp()
            }
        } catch (error) {
            if (error.response.status === 401){
                alert('Incorrect Password')
            }
            else if (error.response.status === 400){
                alert ('Those passwords do not match, please try again.')
            }
            else {
                alert('I don\'t know how you got here, but good job I guess? Please refresh the page!')
            }
        }

    }

    return (
        <div className='center margins'>
            {submitted && <EditProfilePopUp />}
            <form onSubmit={handleSubmit}>
                <div className=''>
                    <h1 className='h1-margin'>Edit Your Profile</h1>
                    <div onClick={togglePassOrProfile} className='link'>Click here to change {changePass ? 'profile' : 'password'} instead</div>
                    {!changePass ? (
                    <div className="form-row">
                        <div className="form-group col-md-20">
                            <label>New Username</label>
                            <input  type="text"
                                    className="form-control"
                                    name='username'
                                    value={formData.username || ''}
                                    onChange = {handleInputChange}
                                    placeholder="New Username" />
                        </div>
                        <div className="form-group col-md-20">
                            <label>New Email</label>
                            <input  type="text"
                                    className="form-control"
                                    name='email'
                                    value={formData.email || ''}
                                    onChange = {handleInputChange}
                                    placeholder="New Email" />
                        </div>
                        <div className="form-group col-md-20">
                            <label>First name</label>
                            <input  type="text"
                                    className="form-control"
                                    name='first_name'
                                    value={formData.first_name || ''}
                                    onChange = {handleInputChange}
                                    placeholder="First Name" />
                        </div>
                        <div className="form-group col-md-20">
                            <label>Last name</label>
                            <input  type="text"
                                    className="form-control"
                                    name='last_name'
                                    value={formData.last_name || ''}
                                    onChange = {handleInputChange}
                                    placeholder="Last name" />
                        </div>
                        <div className="form-group col-md-20">
                            <label>Password</label>
                                <input  type={seePass ? 'text' : 'password'}
                                        className="form-control"
                                        name='oldPass'
                                        value={formData.oldPass || ''}
                                        onChange = {handleInputChange}
                                        placeholder="Password (Required)" />
                                <i
                                    onClick={togglePassVisibility}
                                    className = {`bi-custom ${!seePass ? 'bi-eye-slash' : 'bi-eye'}`}>
                                </i>
                        </div>
                    </div>): (
                    <div>
                        <div className="form-group col-md-20">
                            <label>New Password</label>
                                <input  type={seePass ? 'text' : 'password'}
                                        className="form-control"
                                        name='newPass'
                                        value={formData.newPass || ''}
                                        onChange = {handleInputChange}
                                        placeholder="New Password" />
                        </div>
                        <div className="form-group col-md-20">
                            <label>New Password Again</label>
                                <input  type={seePass ? 'text' : 'password'}
                                        className="form-control"
                                        name='newPassAgain'
                                        value={formData.newPassAgain || ''}
                                        onChange = {handleInputChange}
                                        placeholder="New Password Again" />
                        </div>
                        <div className="form-group col-md-20">
                            <label>Password</label>
                                <input  type={seePass ? 'text' : 'password'}
                                        className="form-control"
                                        name='oldPass'
                                        value={formData.oldPass || ''}
                                        onChange = {handleInputChange}
                                        placeholder="Old Password" />
                                <i
                                    onClick={togglePassVisibility}
                                    className = {`bi-custom ${!seePass ? 'bi-eye-slash' : 'bi-eye'}`}>
                                </i>
                        </div>
                    </div>)}
                </div> 
                    <button type="submit" className="btn btn-primary button">Update</button>
            </form>
        </div>
     );
}
 
export default EditProfilePage;