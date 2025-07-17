import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import ChatUI from './components/ChatUI';

const socket = io('http://localhost:5000');

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('chat-user')));
  const [mode, setMode] = useState('login');
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (user) socket.emit('login', user.username);
  }, [user]);

  const handleAction = async () => {
    if (!u.trim() || !p.trim()) return setErr('Enter both fields');
    try {
      const path = mode === 'login' ? '/api/login' : '/api/register';
      const { data } = await axios.post('http://localhost:5000' + path, { username: u, password: p });
      setUser(data);
      localStorage.setItem('chat-user', JSON.stringify(data));
      setErr('');
    } catch (e) {
      setErr(e.response?.data.error || 'Error occurred');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chat-user');
    setU(''); setP(''); setErr('');
  };

  if (!user) {
    const st = {
      cont: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', background: 'linear-gradient(to right, #141e30, #243b55)', color: '#fff', fontFamily: 'Poppins' },
      input: { width: 280, padding: 10, margin: '8px 0', borderRadius: 8, border: 'none' },
      button: { padding: 12, width: 300, background: '#0072ff', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' },
      error: { color: '#ff4d4f', marginTop: 10 },
      toggle: { marginTop: 12, color: '#00c6ff', cursor: 'pointer', textDecoration: 'underline' }
    };
    return (
      <div style={st.cont}>
        <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
        <input placeholder="Username" value={u} onChange={e => setU(e.target.value)} style={st.input} />
        <input type="password" placeholder="Password" value={p} onChange={e => setP(e.target.value)} style={st.input} />
        <button style={st.button} onClick={handleAction}>
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
        {err && <div style={st.error}>{err}</div>}
        <div style={st.toggle} onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'New user? Register' : 'Have account? Login'}
        </div>
      </div>
    );
  }

  return <ChatUI username={user.username} socket={socket} onLogout={logout} />;
}
