import React, { useRef, useEffect } from 'react';
import Message from './Message';
import './ChatWindow.css';
import Options from './Options';

const ChatWindow = ({ messages, handleOptionClick }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index}>
          <Message text={msg.content} sender={msg.role} />
          {msg.options && <Options options={msg.options} handleOptionClick={handleOptionClick} />}
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;
