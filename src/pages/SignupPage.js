import React, { useEffect, useState } from 'react';

const SignupPage = () => {
    
    const [userId, setuserId] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
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
                setuserId('');
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
            <head>
                Sign Up
            </head>
            <body>
                <form onSubmit={handleSubmit}>
                    NickName : <input id='username' type='text'/>
                    ID : <input id='userid' type='text' onChange = {(e)=>setuserId(e.target.value)} onBlur={handleCheckId}/>
                    {errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}
                    Password : <input id='userpw' type='password'/>
                    Lost Key Question - What is your favorite food?
                    <input id='userlostkey' type='text'/>
                    Email : <input id='email' type='email'/>
                    <button type="submit">Sign Up</button>
                </form>     
            </body>
        </>
    )
}

export default SignupPage;