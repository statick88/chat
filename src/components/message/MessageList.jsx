import React from 'react';
import PropTypes from 'prop-types';

const MessageList = ({ messages }) => {
  return (
    <div>
      <ul className="list-group">
        {messages.map((message, index) => (
          <li key={index} className="list-group-item">
            {message.id && <p><strong>ID:</strong> {message.id}</p>}
            {message.content && <p><strong>Mensaje:</strong> {message.content}</p>}
            {message.timestamp && <p><small><strong>Enviado:</strong> {message.timestamp}</small></p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default MessageList;
