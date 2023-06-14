import React, { useEffect, useState } from "react";
import { ref, onValue, off, push, serverTimestamp } from "firebase/database";
import { database } from "../../utils/firebase"; import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import PeopleChat from '../../components/PeopleChat/PeopleChat';

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBIcon,
    MDBTextArea,
} from "mdb-react-ui-kit";
import "./cardChat.css"

export default function CardChat({ selectedChannel, username }) {
    const [messages, setMessages] = useState([]);
    const senderColors = {};
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = (e) => {
        const formattedMessage = `[User: ${username}] ${message}`;
        if (formattedMessage.trim() !== '') {
            push(ref(database, 'messages'), {
                channel: selectedChannel,
                userName,
                text: formattedMessage,
                timestamp: serverTimestamp(),
            });
            setMessage('');
        }
    };

    useEffect(() => {
        console.log('aaaa' + username)
        const messagesRef = ref(database, "messages");
        onValue(messagesRef, (snapshot) => {
            const messagesData = snapshot.val();
            if (messagesData) {
                const messagesList = Object.keys(messagesData).map((key) => ({
                    id: key,
                    ...messagesData[key],
                }));

                const chat = messagesList.filter(
                    (message) => message.channel === selectedChannel
                );
                setMessages(chat);
            } else {
                setMessages([]);
            }
        });
        return () => {
            off(messagesRef);
        };
    }, [selectedChannel]);

    useEffect(() => {
        setUserName(username)
    }, [username]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
      };

    return (
        <MDBContainer className="py-5">
            <MDBRow className="d-flex justify-content-center">
                <MDBCol md="8" lg="6" xl="4">
                    <MDBCard id="chat1" style={{ borderRadius: "15px" }}>
                        <MDBCardHeader
                            className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                            style={{
                                borderTopLeftRadius: "15px",
                                borderTopRightRadius: "15px",
                            }}
                        >
                            <MDBIcon fas icon="angle-left" />
                            <p className="mb-0 fw-bold">Live chat {selectedChannel}</p>
                            <MDBIcon fas icon="times" />
                        </MDBCardHeader>
                        <MDBCardBody>
                            {messages.map((message) => (
                                <PeopleChat key={message.id} message={message} username={username}></PeopleChat>
                            ))}
                            <MDBTextArea
                                className="form-outline"
                                value={message}
                                onChange={handleMessageChange}
                                onKeyPress={handleKeyPress}
                                label="Type your message"
                                id="textAreaExample"
                                rows={4}
                            />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}