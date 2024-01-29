import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MessageForm = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    } else {
      console.error('Error: Message cannot be empty');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
      <input
        className="form-control mr-sm-2"
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Escribe tu mensaje aquí..."
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Enviar</button>
    </form>
  );
};

MessageForm.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default MessageForm;
