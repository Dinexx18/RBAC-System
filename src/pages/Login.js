// src/pages/Login.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // To navigate after successful login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Mock authentication (replace with real logic/API call)
  const handleLogin = () => {
    if (email === 'admin' && password === 'admin123') {
      // Store the token in localStorage or sessionStorage to simulate login persistence
      localStorage.setItem('authToken', 'your_token_here');
      navigate('/');  // Redirect to the Users page
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button onClick={handleLogin} variant="contained" color="primary" fullWidth>
        Login
      </Button>
      <Snackbar open={error} autoHideDuration={3000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity="error">
          Invalid credentials!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
