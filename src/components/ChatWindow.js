import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function ChatWindow({ me, other, socket }) {
  const [msgs, setMsgs] = useState([]);
  const [txt, setTxt] = useState('');
  const bot = useRef();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/messages/${me}/${other}`)
      .then(res => setMsgs(res.data))
      .catch(console.error);
  }, [me, other]);

  useEffect(() => {
    const handler = msg => {
      if ((msg.from === me && msg.to === other) || (msg.from === other && msg.to === me)) {
        setMsgs(prev => [...prev, msg]);
      }
    };
    socket.on('receive-message', handler);
    return () => socket.off('receive-message', handler);
  }, [me, other, socket]);

  useEffect(() => bot.current?.scrollIntoView({ behavior: 'smooth' }), [msgs]);

  const send = () => {
    if (!txt.trim()) return;
    socket.emit('send-message', { to: other, content: txt });
    setMsgs(prev => [...prev, { from: me, to: other, content: txt, timestamp: new Date().toISOString() }]);
    setTxt('');
  };

  return (
    <div style={{ flex: 1, display:'flex', flexDirection:'column' }}>
      <div style={{ padding: 15, background: '#4a5c82', color: '#fff' }}>
        <strong>{other}</strong>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 20, background: '#eef1f8' }}>
        {msgs.map((m,i) => (
          <div key={i} style={{
            marginBottom: 10,
            alignSelf: m.from === me ? 'flex-end' : 'flex-start',
            background: m.from === me ? '#0072ff' : '#e2e2e2',
            color: m.from === me ? '#fff' : '#333',
            borderRadius: 20,
            padding: '10px 14px',
            maxWidth: '70%'
          }}>
            <div>{m.content}</div>
            <div style={{ fontSize: 10, textAlign:'right', opacity:0.6 }}>
              {new Date(m.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={bot}/>
      </div>
      <div style={{ display: 'flex', padding: 12, borderTop: '1px solid #ddd' }}>
        <input
          value={txt}
          onChange={e => setTxt(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type a message"
          style={{ flex: 1, padding: 10, borderRadius: 20, border: '1px solid #ccc' }}
        />
        <button onClick={send} style={{ marginLeft: 10, padding: '10px 16px', borderRadius: 20, background: '#0072ff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          ➤
        </button>
      </div>
    </div>
  );
}
