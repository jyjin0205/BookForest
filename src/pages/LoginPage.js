import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HorizonBar from "../components/HorizonBar"

import '../styles/LoginPage.css'

const LoginPage = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [signupData, setsignupData] = useState({
        userid: "",
        userpw: "",
    });

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:3001/api/users/login", {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(signupData),
                credentials: 'include',
            });

            if(response.ok)
            {
                const data = await response.json();
                setSuccessMessage("Login Succeed. ");

                    navigate('/');
            }
            else
            {
                setErrorMessage("Login Failed.");
            }

        } catch(error) {
            console.error('Error submitting form:',error);
        }
    }

    return(
        <>
        <HorizonBar />
        <div className="document">
            <div className="signin">
                    <span className="signintext1">Log In</span>
                    <span className="signintext2">You can Log In</span>
            </div>
            <div className="login-continer">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-group">
                        <label>ID: </label> 
                        <input 
                        id='userid' 
                        type='text'
                        value={signupData.userid}
                        onChange={(e)=>setsignupData({ ...signupData, userid: e.target.value })}
                        /> 
                    </div>

                    <div className="login-group">
                        <label>Password: </label>
                        <input 
                        id='userpw' 
                        type='password'
                        value={signupData.userpw}
                        onChange={(e)=>setsignupData({ ...signupData, userpw: e.target.value })}
                        />
                    </div>

                    <button className="form-button" type ="submit">Login</button>
                </form>
                <div>
                    <button className="form-button" onClick={() => {
                    navigate("/signup");
                    }}>SignUp</button>
                </div>
                
            </div>
        </div>
                 
        </>
    )

    
}

export default LoginPage;