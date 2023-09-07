import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';


const ChatForm = ({ selectedChannel, onSelectedUser }) => {
  const [userName, setUserName] = useState('');
  const [existUser, setExistUser] = useState(false);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };


  const saveUsername = (e) => {
    if (userName) {
      setExistUser(true);
      onSelectedUser(userName);
    }
  }

return (

  <div>

    <Form>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Control value={userName} placeholder="username" readOnly={existUser} onChange={handleUserNameChange}
          />
        </Col>
        <Col>
          <Button variant="success" onClick={saveUsername}>
            Set Username
          </Button>
        </Col>
      </Row>
    </Form>
    <br></br>
  </div>
);
};

export default ChatForm;