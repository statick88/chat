import React, { useState, useEffect } from "react";
import { fetchMessages, handleSendMessage } from "../../api/api";

import MessageForm from "../message/MessageForm";
import MessageList from "../message/MessageList";

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const loadMessages = async () => {
      const fetchedMessages = await fetchMessages();
      setMessages(fetchedMessages);
    };

    loadMessages();

    const intervalId = setInterval(loadMessages, 2000);

    return () => clearInterval(intervalId);
  }, []); 

  const onSendMessage = async (message) => {
    const newMessage = await handleSendMessage(message);
    if (newMessage) {
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <div className={darkMode ? "bg-dark text-white" : "bg-light"}>
      <button className="btn btn-secondary my-3" onClick={toggleDarkMode}>
        {darkMode ? "Modo Claro" : "Modo Oscuro"}
      </button>
      <MessageForm onSendMessage={onSendMessage} />
      <MessageList messages={messages} />
    </div>
  );
}

export default Home;
