import React from 'react';

const Sidebar = ({ users, onUserClick, selectedUser }) => {
  return (
    <div style={{ width: '250px', background: '#2e3a59', color: '#fff', padding: '20px' }}>
      <h3 style={{ color: '#fff', marginBottom: '20px' }}>Chats</h3>
      {users.map((user, i) => (
        <div
          key={i}
          onClick={() => onUserClick(user)}
          style={{
            padding: '10px',
            marginBottom: '10px',
            cursor: 'pointer',
            backgroundColor: selectedUser?.username === user.username ? '#3c4d7a' : 'transparent',
            borderRadius: '8px'
          }}
        >
          <strong>{user.username}</strong>
          <div style={{ fontSize: '12px', color: '#aaa' }}>Online</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
