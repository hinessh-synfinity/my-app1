import React, { useState, useEffect, useRef } from 'react';
import ChatUI from './components/ChatUI';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);

    const lastUser = localStorage.getItem('loggedInUser');
    if (lastUser) {
      setUsername(lastUser);
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      alert('Please enter username and password');
      inputRef.current.focus();
      return;
    }

    const existingUser = users.find(u => u.username === username);
    let updatedUsers = [...users];

    if (existingUser) {
      if (existingUser.password !== password) {
        alert('Wrong password!');
        return;
      }
    } else {
      updatedUsers.push({ username, password });
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }

    localStorage.setItem('loggedInUser', username);
    setUsers(updatedUsers);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem('loggedInUser');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <>
      {!loggedIn ? (
        <div style={styles.wrapper}>
          <div style={styles.card}>
            <div style={styles.logo}>🔐</div>
            <h2 style={styles.title}>React Chat Login</h2>

            <div style={styles.inputWrapper}>
              <input
                ref={inputRef}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyPress}
                style={{
                  ...styles.input,
                  paddingTop: username ? '20px' : '14px',
                }}
              />
              <label
                style={{
                  ...styles.label,
                  top: username ? '6px' : '50%',
                  fontSize: username ? '12px' : '14px',
                  color: username ? '#333' : '#555',
                }}
              >
                Username
              </label>
            </div>

            <div style={styles.inputWrapper}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                style={{
                  ...styles.input,
                  paddingTop: password ? '20px' : '14px',
                }}
              />
              <label
                style={{
                  ...styles.label,
                  top: password ? '6px' : '50%',
                  fontSize: password ? '12px' : '14px',
                  color: password ? '#333' : '#555',
                }}
              >
                Password
              </label>
            </div>

            <button style={styles.button} onClick={handleLogin}>
              Let’s Chat
            </button>
          </div>
        </div>
      ) : (
        <ChatUI username={username} allUsers={users} onLogout={handleLogout} />
      )}
    </>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(to right top, #141e30, #243b55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins, sans-serif',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(15px)',
    padding: '50px 40px',
    textAlign: 'center',
    width: '90%',
    maxWidth: '400px',
    color: '#fff',
  },
  logo: {
    fontSize: '48px',
    marginBottom: '15px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '30px',
    fontWeight: '600',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: '25px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '14px 12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #aaa',
    background: 'rgba(255,255,255,0.85)',
    color: '#000',
  },
  label: {
    position: 'absolute',
    left: '12px',
    transform: 'translateY(-50%)',
    fontSize: '14px',
    pointerEvents: 'none',
  },
  button: {
    width: '106%',
    padding: '14px',
    fontSize: '16px',
    background: '#00c6ff',
    backgroundImage: 'linear-gradient(to right, #0072ff, #00c6ff)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default App;
