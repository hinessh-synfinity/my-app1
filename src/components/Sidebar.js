import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Sidebar({ me, onSelect, selected }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${me}`)
      .then(res => setList(res.data))
      .catch(console.error);
  }, [me]);
  return (
    <div style={{ width: 240, background: '#2e3a59', color: '#fff', padding: 20 }}>
      <h3 style={{ marginTop: 0 }}>Chats</h3>
      {list.map(u => {
        const active = selected === u.username;
        return (
          <div key={u.username} onClick={() => onSelect(u.username)} style={{
            padding: 12, marginBottom: 8, background: active ? '#3c4d7a' : 'transparent',
            borderRadius: 6, cursor: 'pointer'
          }}>
            {u.username}
          </div>
        );
      })}
    </div>
  );
}
