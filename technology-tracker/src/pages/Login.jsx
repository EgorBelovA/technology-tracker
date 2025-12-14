import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = () => {
    if (!username.trim()) return;

    localStorage.setItem('username', username);
    navigate(from, { replace: true });
  };

  return (
    <div className='login-container'>
      <div className='login-icon'>😊</div>
      <input
        className='login-input'
        autoFocus
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Username'
      />
      <button onClick={handleLogin} className='login-button'>
        Login
      </button>
    </div>
  );
}
