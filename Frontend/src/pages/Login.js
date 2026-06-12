// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('email.com');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div style={styles.loginContainer}>
      {/* GreenEye Logo */}
      <div style={styles.logoSection}>
        <h1 style={styles.logo}>🌿 GreenEye</h1>
      </div>
      
      {/* Login Form Card */}
      <div style={styles.loginCard}>
        <h2 style={styles.welcomeText}>Welcome</h2>
        <p style={styles.subtitle}>Login to your account</p>
        
        <form onSubmit={handleLogin} style={styles.form}>
          {/* Email Input */}
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>
          
          {/* Password Input */}
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>
          
          {/* Forgot Password */}
          <div style={styles.forgotPassword}>
            <a href="#" style={styles.forgotLink}>Forget Password?</a>
          </div>
          
          {/* Login Button */}
          <button type="submit" style={styles.loginButton}>
            Secure Login
          </button>
          
          {/* Sign Up Link */}
          <p style={styles.signupText}>
            Don't have an account? <a href="#" style={styles.signupLink}>Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  logoSection: {
    marginBottom: '40px',
    textAlign: 'center'
  },
  logo: {
    fontSize: '48px',
    color: 'white',
    margin: '0',
    fontWeight: '700'
  },
  loginCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
  },
  welcomeText: {
    fontSize: '32px',
    color: '#333',
    margin: '0 0 10px 0',
    fontWeight: '600',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: '0 0 30px 0',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  inputLabel: {
    fontSize: '14px',
    color: '#555',
    fontWeight: '500'
  },
  input: {
    padding: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '16px',
    transition: 'border-color 0.3s'
  },
  input: {
    padding: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '16px',
    transition: 'border-color 0.3s'
  },
  inputFocus: {
    outline: 'none',
    borderColor: '#667eea'
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: '-10px'
  },
  forgotLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '14px'
  },
  loginButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '18px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'transform 0.3s'
  },
  loginButtonHover: {
    transform: 'translateY(-2px)'
  },
  signupText: {
    textAlign: 'center',
    color: '#666',
    fontSize: '14px',
    marginTop: '20px'
  },
  signupLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '500'
  }
};

export default Login;