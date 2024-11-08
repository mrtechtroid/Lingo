import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/register', {
        username,
        email,
        password,
      });
      setSuccess(true);
    } catch (err) {
      setError('Registration failed.');
    }
  };

  return (
    <div className="nes-container is-centered" style={{ fontFamily: '"Press Start 2P", cursive' }}>
      <h1>Register</h1>
      {error && <p className="nes-text is-error">{error}</p>}
      {success && <p className="nes-text is-success">Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        <div className="nes-field">
          <label>Username</label>
          <input type="text" className="nes-input" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="nes-field">
          <label>Email</label>
          <input type="email" className="nes-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="nes-field">
          <label>Password</label>
          <input type="password" className="nes-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="nes-btn is-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
