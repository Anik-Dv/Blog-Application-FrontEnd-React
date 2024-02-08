import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { USER_LOGIN } from '../services/UserService';
import { doLogin } from '../auth/auth';
import toast from 'react-hot-toast';
import { useEffect } from 'react';


const Login = () => {

  
  useEffect(() => {
    let timerId = setInterval(()=> {
      if (localStorage.getItem('data')) navigate('/');
    }, 2000);
    return ()=> {
      clearInterval(timerId);
    };
  }, []);


  const [userData, setUserData] = useState ({
    username: "",
    password: ""
  });

  //const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      console.log(prevState)
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const notify = () => { 
    // toast.loading('Checking...', {
    // success: <b>Checking...</b>,
    // duration: 800
    // });
  }


  /* Call Server For Login The User */
  const loginUser = (e) => {
    e.preventDefault();

    /* Validation The User */
   if(userData.username.trim() === '' || userData.password.trim() === '') {
    /* Show Error Message */
    toast.error("You Can't Enter Information", {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
    return;
  }

    // send request from server for login
    USER_LOGIN(userData).then((data) => {
      console.log(data)
       // set user data in localstorage
       doLogin(data, ()=> {
        console.log("saved userdata in localstorage")
      });

      /* Set Input feild Blank */
      setUserData({
        username: '',
        password: ''
      })

      /* Show Success Message */
      toast.success('Login Success.', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        icon: '👏',
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        }
      });
      navigate("/");
      //window.location.reload();
      console.log("Success")
    }).catch(err => {
       /* Show Error Message */
       toast.error(err?.response?.data?.message, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
      return;
    })
  }


  return (
    /* User Login */
    <section className="register">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form register_form" onSubmit={loginUser}>
          {/* Error Message Show */}
         {/*  <p className="form-error_mgs">This is Error Message</p> */}
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter Email Address"
            name="username"
            value={userData.username}
            onChange={changeInputHandler} 
            autoFocus
          />
          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler} 
            autoFocus
          />
          {/* Submit Form Button */}
          <button type="submit" className="btn primary" onClick={notify}>Login</button>
        </form>
        {/* Link for go user registration */}
        <small>Don't Have an Account? <Link to='/register'>Sign Up</Link></small>
      </div>
    </section>
  )
}

export default Login
