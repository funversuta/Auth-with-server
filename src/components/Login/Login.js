import React, { useEffect, useState } from 'react';
import { set, useForm } from "react-hook-form";
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import s from './Login.css'
 
function Login(props) {
  const { register,formState: { errors }, handleSubmit } = useForm({criteriaMode: "all"});
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  
  const [error, setError] = useState(null);
  const [emailDirty, setEmailDitry] = useState(false);
  const [emailDirty1, setEmailDitry1] = useState(false);
  const [passDirty, setpassDitry] = useState(false);
  const [passwordDirty, setpasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState(' Объязательное поле');
  const [passwordError, setpasswordsError] = useState(' Объязательное поле');
  

 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/Profile');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError(" ⚠ Заполните все поля, они обязательны")
      setpassDitry(true); setEmailDitry1(true);
    });
  }
 
 
  const blueHandler = (e) => {
    if (!e.target.value) {
     
    switch (e.target.name) {
      case 'email':
        setEmailDitry(true);
        setEmailDitry1(true);
        break
        case 'password':
          setpasswordDirty(true);
          setpassDitry(true)
          break
    }} }
  
 
  return (
    <div className="content"> 
     
      <form action={""} >
        <label>
      {error && emailError && <><small style={{ color: 'black', background: 'pink',  display: 'block',
    boxSizing: 'border-box', width: '100%',borderRadius: '10px', border: '1px solid black',
     borderColor: 'red', height:'50px', textAlign:'center', fontSize:'16px', letterSpacing:'1px', fontWeight:'25px', padding:'10px' }}>{error}</small><br /></>}<br />
      </label>
     
      <div>
        Логин<br />
       
        <input className={emailDirty1 ? 'magic' : ''} type="email" onBlur={e => blueHandler(e)}   {...username} autoComplete="new-password" name='email' />
        {(emailDirty && emailError && emailDirty1) && <div style={{color:'red'}}>{emailError}</div>}
        
      </div>
      <div style={{ marginTop: 10 }}>
      Пароль<br />
        <input className={passDirty ? 'goRed' : ''} type="password" onBlur={e => blueHandler(e)} {...password} autoComplete="new-password" name='password' />
        {(passwordDirty && passwordError && passDirty) && <div style={{color:'red'}}>{passwordError}</div>}
      </div>
      
     
     
      </form>
      <div className='checkbox'></div>
      <input className='checkbox__input' type="checkbox"  style={{display:'inline-block', paddingTop:'15px', width:'20px', height:'15px'}} value="lsRememberMe"  id='checkbox_1' /> <label className='checkbox__label' for="checkbox_1">  Запомнить пароль?</label>
      
      
      <input type="button" value={loading ? 'Loading...' : 'Войти'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}


const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  
 
  const handleChange = e => {
    setValue(e.target.value)
    
  }
  return {
    value,
    onChange: handleChange, 
    
  }
  
}

 
export default Login;