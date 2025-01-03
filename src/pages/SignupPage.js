import React, { useEffect, useState } from 'react';
import '../styles/SignupPage.css'
import { useNavigate } from 'react-router-dom';
import HorizonBar from "../components/HorizonBar"



const SignupPage = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    
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

    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3001/api/users/register", {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(signupData),
                credentials: 'include',
            });

            if(response.ok)
            {
                setSuccessMessage("Registering Succeed. ");

                setTimeout(()=>{
                    navigate('/');
                },2000);
            }
            else
            {
                setErrorMessage2("Registering Failed.");
            }
    
        }catch(error){

        }
    }

    const handleComparePw = async(e) => {
        console.log(passwordConfirm);
        console.log(signupData.userpw);
        e.preventDefault();
        if(signupData.userpw && passwordConfirm && signupData.userpw !== passwordConfirm)
            setErrorPwMessage("Please Confirm Password");
        else
            setErrorPwMessage("");

    }

    const handleCheckId = async(e) =>{
        const inputId = e.target.value;
        try 
        {
            const response = await fetch(`http://localhost:3001/api/users/idcheck?userid=${inputId}`, {
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
            <HorizonBar />
            <div className="document">
                <div className="signuptext1"> Sign Up
                </div>
                <div className="signup-container">
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="signup-group">
                            NickName <input id='username' type='text' value = {signupData.nickname} onChange= {(e)=>setsignupData({ ...signupData, nickname: e.target.value })}/>
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
                            PasswordComfirm <input id='userpwComfirm' type='password' value={passwordConfirm} onChange = {(e)=>setPasswordConfirm(e.target.value)} onBlur={handleComparePw} />
                        </div>
                        <div className="signup-errormessage">
                        {errorPwMessage && <p style={{color:'red'}}>{errorPwMessage}</p>}
                        </div>
                        <div className="signup-group">
                            Lost Key Question - What is your favorite food?
                            <input id='userlostkey' type='text'  value = {signupData.userlostkey} onChange = {(e)=>setsignupData({ ...signupData, userlostkey: e.target.value })}/> 
                        </div>
                        <div className="signup-group">
                            Email <input id='email' type='email'  value = {signupData.email} onChange = {(e)=>setsignupData({ ...signupData, email: e.target.value })}/>
                        </div>
                        {!errorPwMessage && !errorMessage ? (                        
                            <button className="form-button" type="submit">Sign Up</button>
                        ) : (<></>)}
                    </form>

                    {successMessage && (
                    <div style={{ 
                        backgroundColor: '#28a745', 
                        color: 'white', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        marginTop: '10px' 
                    }}>
                        {successMessage}
                    </div>
                )}
                {errorMessage2 && (
                    <div style={{ 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        marginTop: '10px' 
                    }}>
                        {errorMessage2}
                    </div>
                )}
                </div>
            </div>
            
        </>
    )
}

export default SignupPage;