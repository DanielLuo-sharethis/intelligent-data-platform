import React, { useEffect, useRef, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import './Signup.css';
import computerImage from 'assets/Auth/computer.png';
import purpleWhiteMask from 'assets/Auth/white_purple.png';
import predactivLogo_transparent from 'assets/Auth/predactiv_logo.png';
import predactiv_logo from 'assets/predactiv-logo.svg';
import predactiv_TM from 'assets/predactiv_TM.svg';

import {useAuth} from 'contexts/AuthContext';
import { Alert } from "react-bootstrap";




const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {signup, currentUser} = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Email:", emailRef.current.value);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
        setError('');
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        navigate('/dashboard/current-application');
    }catch {
        setError('Failed to create an account');
    }
   
    
  };

  return (
    <div className="login-page">

      <div className="login-image-container">
        <img className="computer-image" src={computerImage} alt="Login Illustration" />
        <img className="mask-image" src={purpleWhiteMask} alt="Purple White Mask" />
        <img className="predactiv-logo" src={predactivLogo_transparent} alt="Predactiv Logo" />
      </div>



      <div className="login-right-container">

        <div className='sidebar-logo-frame-top-group logo_and_TM_wrapper'>
            <img className='logo-img' src={predactiv_logo} alt="Predactiv Logo" />
            <div className="sidebar-logo-frame-top-group-text">
              <img className='predactiv_TM' src={predactiv_TM} alt="predactiv_TM"/>
              <p className='text-intelligent-data-platform'>Intelligent Data Platform</p>
            </div>
        </div>
        
        <div className="login-form">
          
          <h3>Sign Up</h3>
         
          {error && <Alert variant="danger"  className="custom-alert">{error}</Alert>}
          <button className="login-button google-button">Continue with Google</button>
          <button className="login-button apple-button">Continue with Apple</button>
          <div className="divider">
            <span>or</span>
          </div>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label htmlFor="email">Work Email</label>
              <input type="email" id="email" name="email" placeholder="Type here" ref={emailRef} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Type here" ref={passwordRef}required />
              <small>
                At least 8 characters, 1 small letter, 1 capital letter, 1 number or symbol.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password-confirm">Password Confirmation</label>
              <input type="password-confirm" id="password-confirm" name="password-confirm" placeholder="Type here" ref={passwordConfirmRef}required />
    
            </div>
            <div className="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>
            <div className="forgot-password">
              Already have an account? <a href="/login">Log In</a>
            </div>
            <button disabled = {loading} type="submit" className="login-button">Sign Up</button>
            <button className="request-trial-button">Request Free Trial</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;