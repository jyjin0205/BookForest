import React, { useEffect, useState } from 'react';

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
            Sign In
            <form onSubmit={handleSubmit}>
                ID : <input 
                        id='userid' 
                        type='text'
                        value={signupData.userid}
                        onChange={(e)=>setsignupData({ ...signupData, userid: e.target.value })}
                        />
                Password : <input 
                                id='userpw' 
                                type='password'
                                value={signupData.userpw}
                                onChange={(e)=>setsignupData({ ...signupData, userpw: e.target.value })}
                                />
                <button type ="submit">Login</button>
            </form>     
        </>
    )

    
}

export default LoginPage;