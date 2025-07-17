import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

export default function ChatUI({ username, socket, onLogout }) {
  const [sel, setSel] = useState(null);
  const headerSt = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '10px 20px', background: '#2e3a59', color: '#fff'
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={headerSt}>
        <span><strong>Welcome, {username}</strong></span>
        <button onClick={onLogout} style={{ background: '#ff4d4f', border: 'none', padding: '6px 12px', borderRadius: 6, color: '#fff', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar me={username} onSelect={setSel} selected={sel} />
        {sel ? <ChatWindow me={username} other={sel} socket={socket} /> :
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h3>Select a user to chat</h3>
          </div>}
      </div>
    </div>
  );
}
