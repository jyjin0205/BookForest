import React, { useEffect, useState } from 'react';
import '../styles/SignupPage.css'


const SignupPage = () => {
    
    const [errorMessage, setErrorMessage] = useState(''); 

    const [passwordConfirm,setPasswordConfirm] = useState('');

    const [errorPwMessage, setErrorPwMessage] = useState('');
    
    const [signupData, setsignupData] = useState({
        userid: "",
        userpw: "",
        userlostkey: "",
        nickname: "",
        email: "",
    });

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
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
    
        }catch(error){

        }
    }

    const handleComparePw = async(e) => {
        e.preventDefault();
        if(signupData.userpw && passwordConfirm && signupData.userpw!==passwordConfirm)
            setErrorPwMessage("Please Confirm Password");
    }

    const handleCheckId = async(e) =>{
        const inputId = e.target.value;
        try 
        {
            const response = await fetch(`http://localhost:5000/api/users/idcheck?userid=${inputId}`, {
                method: 'GET',
            });
    
            if (!response.ok) {
                throw new Error('Failed to check user ID');
            }
    
            const data = await response.json();
            if(data.exists)
            {
                setErrorMessage('This ID is already taken');
                setsignupData({ ...signupData, userid: ""})
            }
            else
                setErrorMessage('');
            
        } catch (error) 
        {
            console.error(error.message);
        }
    }

    return(
        <>
            <div>
                <div className="signintext1"> Sign Up
                </div>
                <div className="signup-container">
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="signup-group">
                            NickName <input id='username' type='text'/>
                        </div>
                        <div className="signup-group">
                            ID <input id='userid' type='text' value = {signupData.userid} onChange= {(e)=>setsignupData({ ...signupData, userid: e.target.value })} onBlur={handleCheckId}/>
                        </div>
                        <div className="signup-errormessage">
                        {errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}
                        </div>
                        <div className="signup-group">
                            Password <input id='userpw' type='password'  value = {signupData.userpw} onChange = {(e)=>setsignupData({ ...signupData, userpw: e.target.value })} onBlur={handleComparePw}/>
                        </div>
                        <div className="signup-group">
                            PasswordComfirm <input id='userpwComfirm' type='password' onChange = {(e)=>setPasswordConfirm(e.target.value)} onBlur={handleComparePw} />
                        </div>
                        <div className="signup-errormessage">
                        {errorPwMessage && <p style={{color:'red'}}>{errorMessage}</p>}
                        </div>
                        <div className="signup-group">
                            Lost Key Question - What is your favorite food?
                            <input id='userlostkey' type='text'  value = {signupData.userlostkey} onChange = {(e)=>setsignupData({ ...signupData, userlostkey: e.target.value })}/> 
                        </div>
                        <div className="signup-group">
                            Email <input id='email' type='email'  value = {signupData.email} onChange = {(e)=>setsignupData({ ...signupData, email: e.target.value })}/>
                        </div>
                        <button className="form-button" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
            
        </>
    )
}

export default SignupPage;