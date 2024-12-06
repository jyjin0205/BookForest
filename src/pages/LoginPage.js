import React, { useEffect, useState } from 'react';
import '../styles/LoginPage.css'

const LoginPage = () => {
    
    const [signupData, setsignupData] = useState({
        userid: "",
        userpw: "",
    });

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        // attempt log in
        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(signupData),
                credentials: 'include',
            });

            if(response.ok)
            {
                const data = await response.json();
            }

        } catch(error) {
            console.error('Error submitting form:',error);
        }
    }

    return(
        <>
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
            </div>
        </div>
                 
        </>
    )

    
}

export default LoginPage;