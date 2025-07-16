import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

const ChatUI = ({ username, allUsers = [], onLogout }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const users = allUsers.filter(u => u.username !== username);

  useEffect(() => {
    if (!selectedUser && users.length > 0) {
      setSelectedUser(users[0]);
    }
  }, [users, selectedUser]);

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <div style={{
        background: '#2e3a59',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div><strong>Welcome, {username}</strong></div>
        <button onClick={onLogout} style={{
          background: '#ff4d4f',
          border: 'none',
          padding: '8px 14px',
          borderRadius: '6px',
          color: '#fff',
          cursor: 'pointer'
        }}>Logout</button>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar
          users={users}
          onUserClick={setSelectedUser}
          selectedUser={selectedUser}
        />
        {selectedUser ? (
          <ChatWindow
            currentUser={username}
            selectedUser={selectedUser.username}
          />
        ) : (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            background: '#f5f8fc'
          }}>
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatUI;
