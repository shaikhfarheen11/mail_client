import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase"; 
import { signin } from "../store/userSlice";
import gmailLogo from '../asset/gmailLogo.png';
import './LoginLogo.css';

function LoginLogo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginn = () => {
    auth.signInWithPopup(provider).then(({ user }) => {
      dispatch(signin({
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email
      }));
      console.log("User signed in:", user);
      navigate("/header");
    }).catch(error => {
      alert(error.message);
      console.error("Error signing in with Google:", error);
    });
  };

  return (
    <div className="loginwrapper">
      <div className="loginlogo">
        <img className="gmail__logo" src={gmailLogo} alt="Gmail Login" onClick={loginn} />
      </div>
      <button className="gmail_login" onClick={loginn}>
        Login with Gmail
      </button>
    </div>
  );
}

export default LoginLogo;
