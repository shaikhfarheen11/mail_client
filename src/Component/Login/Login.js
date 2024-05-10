import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import classes from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCV5PF3StNEQRWcAvE_gDgzP_yU9ltwkuA';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.idToken;
        const userId = data.localId;

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);

        console.log('User has successfully logged in. Token:', token);
        navigate('/header'); 
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setLoginError(error.message);
    }
  };

  return (
    <div className={classes.signupContainer}>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <div className={classes.passwordInput}>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className={classes.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </Form.Group>
        {loginError && <p className={classes.errorMessage}>{loginError}</p>}
        <Button type='submit' className={classes.submit}>Login</Button>
      </Form>
      <p className={classes.frgtpassword}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
      <p className={classes.acc}>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
