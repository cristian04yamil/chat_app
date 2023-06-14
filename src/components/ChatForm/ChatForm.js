import React, { useState } from 'react';
import { ref, push, serverTimestamp } from 'firebase/database';
import { database } from '../../utils/firebase';
import { Link } from 'react-router-dom';
import { Alert, Badge, Button, Col, Form, Row } from 'react-bootstrap';


const ChatForm = ({ selectedChannel, onSelectedUser }) => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [existUser, setExistUser] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();
    const formattedMessage = `[User: ${userName}] ${message}`;
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
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    console.log(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const saveUsername = (e) => {
    setExistUser(true);
    onSelectedUser(userName);
  }

return (

  <div>

    <Form>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Control value={userName} placeholder="username" readOnly={existUser} onChange={handleUserNameChange}
          />
        </Col>
        {/* <Col xs="auto">
            <Form.Control value={message} placeholder="message" onChange={handleMessageChange}
            />
          </Col> */}
        <Col>
          <Button variant="success" onClick={saveUsername}>
            Set Username
          </Button>
        </Col>
      </Row>
    </Form>
    <br></br>

    {/* <form style={formStyles} className='form-horizontal'>
        <div className=" message-form">
          <input
            type="text"
            className="form-control"
            style={inputStyles}
            placeholder="Enter your namee"
            value={userName}
            onChange={handleUserNameChange}
          />
          <input
            type="text"
            className="form-control"
            style={inputStyles}
            placeholder="Add you message"
            value={message}
            onChange={handleMessageChange}
          />
          <button className="btn btn-success" onClick={sendMessage}>
            send message
          </button>
          <br></br>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <Link to="/messages" className="btn btn-default">View Messages</Link>
            </div>
          </div>
        </div>
      </form> */}
  </div>
);
};

export default ChatForm;