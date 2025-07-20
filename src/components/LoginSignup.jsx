import React, { useEffect, useState } from 'react';
import './LoginSignup.css';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const LoginSignup = () => {
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    const handleSignUpClick = () => container.classList.add('right-panel-active');
    const handleSignInClick = () => container.classList.remove('right-panel-active');

    signUpButton.addEventListener('click', handleSignUpClick);
    signInButton.addEventListener('click', handleSignInClick);

    return () => {
      signUpButton.removeEventListener('click', handleSignUpClick);
      signInButton.removeEventListener('click', handleSignInClick);
    };
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { email, password, name } = signUpData;
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCred.user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
      });
      alert('Signup successful');
    navigate('/cardform'); // Optional

    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignin = async (e) => {
  e.preventDefault();
  try {
    const { email, password } = signInData;
    await signInWithEmailAndPassword(auth, email, password);
    alert('Login successful');
    navigate('/cardform'); // ✅ Redirect after login
  } catch (error) {
    alert(error.message);
  }
};


  return (
    <div className="container" id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            value={signUpData.name}
            onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={signUpData.email}
            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignin}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input
            type="email"
            placeholder="Email"
            value={signInData.email}
            onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={signInData.password}
            onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
            required
          />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Overlay Panels */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn">Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
