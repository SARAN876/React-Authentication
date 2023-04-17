import React, { useRef, useState } from 'react';
import classes from "./AuthForm.module.css"
const Authexp = () => {
const emailInputRef=useRef();
const passwordInputRef=useRef();

const [isLogin,setIsLogin]=useState(true);
const [isLoading,setIsLoading]=useState(false)

const switchAuthModeHandler=()=>{
    setIsLogin((prevState)=> !prevState);
}
const submitHadler=(event)=>{
    event.preventDefault();

    const enteredEmail=emailInputRef.event.current.value;
    const enteredPassword=passwordInputRef.event.current.value;

    setIsLoading(true);

    if(isLogin){

    }else{
        fetch (
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJW4nAwcD6BDibYDlye3T5yp_k4x2WES0',
            {
                method:"POST",
                body:JSON.stringify({
                    email:enteredEmail,
                    password:enteredPassword,
                    returnSecureToken: true,
                }),
                 headers:{
          'Content-type':'application/json',
            },
        }
        ).then(res=>{
            setIsLoading(false);
            if(res.ok){

            }else{
                 return  res.json().then((data)=>{
            let errorMessage='Authentication failed!';
        //     if(data && data.error && data.error.message)
        // {
        //      errorMessage=data.error.message;
        //     }
           alert(errorMessage);
          });
            }
        }
        )
    }
}

return (
   <section className={classes.auth}>
       <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
       <form onSubmit={submitHadler}>
           <div className={classes.control}>
               <label htmlFor='gmail'>Gmail</label>
               <input 
                    type="gmail" 
                    id='gmail' 
                    required 
                    ref={emailInputRef}
                    />
           </div>
           <div className={classes.control}>
               <label htmlFor='password' >Password</label>
               <input 
                    type="password" 
                    id='password' 
                    required 
                    ref={passwordInputRef}
                    />
           </div>
            <div className={classes.actions}>
                 {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                 {isLoading && <h1>Sending request....!</h1>}
                <button 
                 type='button'
                 className={classes.toggle}
                  onClick={switchAuthModeHandler}
                >
                     {isLogin ? 'Create new account' : 'Login with existing account'}
                </button>
            </div>
       </form>
   </section>
  )
}

export default Authexp