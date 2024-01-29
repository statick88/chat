import supabase from './SupabaseClient';

export const fetchMessages = async () => {
  const { data: messagesData, error } = await supabase.from('messages').select('*');
  if (error) {
    console.error('Error fetching messages:', error.message);
    return [];
  }

  return messagesData.map(message => ({
    ...message,
    timestamp: new Date(message.timestamp).toLocaleString(),
    content: `📌 ${message.content}`
  }));
};

export const handleSendMessage = async (message) => {
  if (!message) {
    console.error('Error sending message: message is empty');
    return;
  }

  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  const clientIP = data.ip;

  const messageWithIP = `${message} - Sent from: ${clientIP}`;
  const { data: newMessageData, error } = await supabase.from('messages').insert([{ content: messageWithIP }]);
  if (error) {
    console.error('Error sending message:', error.message);
    return null;
  }

  if (newMessageData && newMessageData.length > 0) {
    return {
      ...newMessageData[0],
      timestamp: new Date(newMessageData[0].timestamp).toLocaleString(),
      content: `📌 ${newMessageData[0].content}`
    };
  } else {
    console.error('Error sending message: newMessageData is null or empty');
    return null;
  }
};
