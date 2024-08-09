import React from 'react';
import './Message.css';
// import agentIcon from '../../../assets/AI_agent_logo.jpeg';
// import userIcon from '../../assets/user.png';

import agentIcon from 'assets/AI_agent_logo.jpeg';
import userIcon from 'assets/user.png';

const Message = ({ text, sender }) => {
  // console.log('text:', text, 'sender:', sender);
  return (
    <div className={`message ${sender}`}>
      <div className="avatar">

        <img src={sender === 'user' ? userIcon : agentIcon} alt="avatar" />
      </div>
      <div className="message-bubble">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;
