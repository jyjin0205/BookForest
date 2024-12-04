import React, { useEffect, useState } from 'react';

const SignupPage = () => {
    
    const [count, setCount] = useState(0);
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
    }

    return(
        <>
            <head>
                Sign Up
            </head>
            <body>
                <form onSubmit={handleSubmit}>
                    NickName : <input id='username' type='text'/>
                    ID : <input id='userid' type='text'/>
                    Password : <input id='userpw' type='password'/>
                </form>     
            </body>
        </>
    )
}

export default SignupPage;