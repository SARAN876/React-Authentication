import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history=useHistory();
  const  newPasswordInptRef=useRef();
  const authCtx=useContext(AuthContext);

  const submitHandler=event=>{
    event.preventDefault();
    const enteredNewPassword=newPasswordInptRef.current.value;
  
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBJW4nAwcD6BDibYDlye3T5yp_k4x2WES0',{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:enteredNewPassword,
        returnSecureToken:false,
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then((res)=>{
      //assumption : Always succeeds!
      history.replace('/');
    })
  
  }
  
  return (
    <form className={classes.form} onSubmit={submitHandler} >
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordId} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
