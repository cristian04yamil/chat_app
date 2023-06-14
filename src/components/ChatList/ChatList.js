import React, { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "../../utils/firebase";
import {Badge, Alert} from "react-bootstrap";

import "./chatList.css";

const ChatList = ({ selectedChannel }) => {
  const [messages, setMessages] = useState([]);
  const senderColors = {};

  const generateRandomColor = () => {
    const colors = ["#eaf6ff", "#fff9e6", "#fde2e6", "#f3e5f5", "#e8eaf6"];
    // Filtrar colores ya asignados
    const availableColors = colors.filter((color) => {
      return !Object.values(senderColors).includes(color);
    });

    if (availableColors.length === 0) {
      // Si todos los colores ya han sido asignados, generar un color aleatorio
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    } else {
      // Si hay colores disponibles, seleccionar uno aleatorio
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      return availableColors[randomIndex];
    }
  };

  const getSenderStyle = (sender) => {
    if (!senderColors[sender]) {
      senderColors[sender] = generateRandomColor();
    }
    return { backgroundColor: senderColors[sender] };
  };

  useEffect(() => {
    const messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesList = Object.keys(messagesData).map((key) => ({
          id: key,
          ...messagesData[key],
        }));

        const tita = messagesList.filter(
          (message) => message.channel === selectedChannel
        );
        setMessages(tita);
      } else {
        setMessages([]);
      }
    });
    return () => {
      off(messagesRef);
    };
  }, [selectedChannel]);

  return (
    <div className="message-list">
      <h2>
        <Badge bg="warning">Live chat {selectedChannel}</Badge>{" "}
      </h2>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message-item`}
          style={getSenderStyle(message.userName)}
        >
          {/* <p>{message.text} - {new Date(message.timestamp).toLocaleString()}</p> */}
          <Alert
            variant="info"
            className={`message-item`}
            style={getSenderStyle(message.userName)}
          >
            {message.text} - {new Date(message.timestamp).toLocaleString()}
          </Alert>
        </div>
      ))}
      {/* <ul
        style={listItem}>
        {messages.map((message) => (
          <li key={message.id}>
            {message.text} - {new Date(message.timestamp).toLocaleString()}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default ChatList;
