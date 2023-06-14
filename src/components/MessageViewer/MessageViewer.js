import React, { useEffect, useState } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../../firebase';

const MessageViewer = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesList = Object.keys(messagesData).map((key) => ({
          id: key,
          ...messagesData[key],
        }));
        setMessages(messagesList);
      } else {
        setMessages([]);
      }
    });
    return () => {
      off(messagesRef);
    };
  }, []);

  return (
    <div style={listContainer}>
      <ul
        style={listItem}>
        {messages.map((message) => (
          <li key={message.id}>
            {message.text} - {new Date(message.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

const listContainer = {
  'max-width': '400px',
  'margin': '0 auto',
  'padding': '20px'
}

const listItem = {
  'background-color': '#f2f2f2',
  'border-radius': '4px',
  'padding': '10px',
  'margin-bottom': '10px'
}

export default MessageViewer;