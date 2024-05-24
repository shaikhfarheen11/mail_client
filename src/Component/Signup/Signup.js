import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import classes from './Signup.module.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    try {
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_API_KEY'; // Replace with your API key

      if (password.length < 6) {
        console.error('Password should be at least 6 characters long.');
        return;
      }

      if (!/\d/.test(password)) {
        console.error('Password should contain at least one digit.');
        return;
      }

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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      console.log('User has successfully signed up:', data);

      setSignupSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (passwordError) {
      setPasswordError(false);
    }
  };

  return (
    <div className={classes.signupContainer}>
      <h2>SignUp</h2>
      {signupSuccess && <p className={classes.successMessage}>Signed up successfully!</p>}
      <Form onSubmit={handleSignup}>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={passwordError ? classes.error : ''}
          />
          {passwordError && <p className={classes.errorMessage}>Passwords do not match!</p>}
        </Form.Group>
        <Button type='submit' className={classes.submit}>Sign Up</Button>
      </Form>
      <p className={classes.acc}>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
