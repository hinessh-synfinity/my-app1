import React, { useState, useEffect, useRef } from 'react';

const ChatWindow = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const chatRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const getChatKey = () => {
    const sorted = [currentUser, selectedUser].sort();
    return `${sorted[0]}__${sorted[1]}`;
  };

  const loadMessages = () => {
    const key = getChatKey();
    const all = JSON.parse(localStorage.getItem('messages')) || {};
    setMessages(all[key] || []);
  };

  const saveMessages = (updated) => {
    const key = getChatKey();
    const all = JSON.parse(localStorage.getItem('messages')) || {};
    all[key] = updated;
    localStorage.setItem('messages', JSON.stringify(all));
  };

  const handleSend = () => {
    if (!text.trim()) return;
    const newMsg = {
      from: currentUser,
      to: selectedUser,
      text,
      time: new Date().toLocaleTimeString(),
    };
    const updated = [...messages, newMsg];
    setMessages(updated);
    saveMessages(updated);
    setText('');
    setIsTyping(false);
  };

  useEffect(() => {
    loadMessages();
  }, [selectedUser]);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const typingTimer = setTimeout(() => setIsTyping(false), 1500);
    return () => clearTimeout(typingTimer);
  }, [text]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#eef1f8' }}>
      {/* Header */}
      <div style={{
        padding: '15px 20px',
        background: '#4a5c82',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: '#fff',
          color: '#4a5c82',
          fontWeight: 'bold',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {selectedUser[0].toUpperCase()}
        </div>
        <div>
          <h3 style={{ margin: 0 }}>{selectedUser}</h3>
          <div style={{ fontSize: '12px', color: '#ccc' }}>Online</div>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        background: '#f3f7fc',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.from === currentUser ? 'flex-end' : 'flex-start',
              background: msg.from === currentUser
                ? 'linear-gradient(145deg, #0072ff, #00c6ff)'
                : '#e2e2e2',
              color: msg.from === currentUser ? '#fff' : '#333',
              borderRadius: '20px',
              padding: '12px 18px',
              margin: '10px 0',
              maxWidth: '70%',
              boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
              animation: 'fadeIn 0.3s ease-in-out',
              transition: 'transform 0.2s ease-in-out'
            }}
          >
            <div style={{ marginBottom: '4px' }}>{msg.text}</div>
            <div style={{ fontSize: '10px', textAlign: 'right', opacity: 0.7 }}>{msg.time}</div>
          </div>
        ))}
        <div ref={chatRef} />

        {isTyping && (
          <div style={{
            fontSize: '12px',
            color: '#999',
            fontStyle: 'italic',
            marginTop: '5px'
          }}>
            {selectedUser} is typing...
          </div>
        )}
      </div>

      {/* Input Section */}
      <div style={{
        display: 'flex',
        padding: '14px 20px',
        borderTop: '1px solid #ddd',
        background: '#fff',
        alignItems: 'center'
      }}>
        <input
          placeholder="Type a message..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setIsTyping(true);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '25px',
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '14px',
            transition: '0.2s ease'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            marginLeft: '12px',
            padding: '12px 18px',
            borderRadius: '25px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0, 123, 255, 0.4)',
            transition: 'transform 0.2s ease'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
