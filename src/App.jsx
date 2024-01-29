import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

import MessageList from './components/MessageList';
import MessageForm from './components/MessageForm';
import './index.css'; // Estilos globales

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Cargar mensajes al montar el componente
    fetchMessages();

    // Establecer intervalo para actualizar mensajes cada 5 segundos
    const intervalId = setInterval(fetchMessages, 5000);

    // Limpiar intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  const fetchMessages = async () => {
    try {
      console.log('Fetching messages...'); // Agregar un registro para indicar que se están recuperando los mensajes
      const { data: messagesData, error } = await supabase.from('messages').select('*');
      if (error) {
        throw error;
      }
      const formattedMessages = messagesData.map(message => ({
        ...message,
        timestamp: new Date(message.timestamp).toLocaleString(),
        content: `📌 ${message.content}`
      }));
      setMessages(formattedMessages);
      console.log('Messages loaded:', formattedMessages); // Registrar los mensajes cargados
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };

  const handleSendMessage = async (message) => {
    try {
      if (!message) {
        console.error('Error sending message: message is empty');
        return;
      }

      // Obtener la dirección IP del cliente
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const clientIP = data.ip;

      console.log('Sending message:', message, 'from IP:', clientIP); // Registrar el mensaje y la IP del cliente

      // Agregar la dirección IP al mensaje
      const messageWithIP = `${message} - Sent from: ${clientIP}`;

      // Enviar el mensaje a Supabase
      const { data: newMessageData, error } = await supabase.from('messages').insert([{ content: messageWithIP }]);
      if (error) {
        throw error;
      }
      if (newMessageData !== null && newMessageData.length > 0) {
        const formattedMessage = {
          ...newMessageData[0],
          timestamp: new Date(newMessageData[0].timestamp).toLocaleString(),
          content: `📌 ${newMessageData[0].content}`
        };
        setMessages(prevMessages => [...prevMessages, formattedMessage]);
        console.log('Message sent:', formattedMessage); // Registrar el mensaje enviado
      } else {
        console.error('Error sending message: newMessageData is null or empty');
      }
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };


  return (
    <div>
      <h1>Aplicación de Mensajería Segura</h1>
      <MessageList messages={messages} />
      <MessageForm onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
