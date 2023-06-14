import React, { useEffect, useState } from "react";
import { ref, onValue, off, push, serverTimestamp } from "firebase/database";
import { database } from "../../utils/firebase";
import { Button, Col, Form, Row } from "react-bootstrap";
import CardChat from '../../components/CardChat/CardChat';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./channelList.css";
function ChannelList({ onSelectChannel, selectedChannel, onSelectedUser, username }) {
  const [channelName, setChannelName] = useState("");
  const [channels, setChannels] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [user, setUser] = useState('');

  const sendChannel = (e) => {
    e.preventDefault();
    if (channelName.trim() !== "") {
      push(ref(database, "channel"), {
        text: channelName,
        timestamp: serverTimestamp(),
      });
      setChannelName("");
    }
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannelId(channel.id);
    onSelectChannel(channel);
  };

  const selectedUser = (value) => {
    console.log(value);
    setUser(value);
  };

  useEffect(() => {
    const messagesRef = ref(database, "channel");
    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      console.log(messagesData);
      if (messagesData) {
        const messagesList = Object.keys(messagesData).map((key) => ({
          id: key,
          ...messagesData[key],
        }));
        console.log(messagesList);
        setChannels(messagesList);
      } else {
        setChannels([]);
      }
    });
    return () => {
      off(messagesRef);
    };
  }, []);

  useEffect(() => {
    console.log('selected channel changed')
  }, [selectedChannelId]);

  // return (
  //     <div className="channel-list">
  //         <h3><Badge bg="secondary">Channels:</Badge></h3>
  //         {channels && channels.map((channel) => (
  //             <Alert key='info' variant='info' className={selectedChannelId === channel.id ? 'selected alert-success' : ''}
  //                 onClick={() => handleChannelSelect(channel)}
  //             ><Alert.Heading>{channel.text}</Alert.Heading>
  //             </Alert>
  //         ))}
  //         {/* <ul>
  //             {channels &&
  //                 channels.map((channel) => (
  //                     <li
  //                         className={selectedChannelId === channel.id ? 'selected' : ''}
  //                         key={channel.id} onClick={() => handleChannelSelect(channel)}>
  //                         {channel.text}
  //                     </li>
  //                 ))}
  //         </ul> */}
  //         <Form>
  //             <Row className="align-items-center">
  //                 <Col xs="auto">
  //                     <Form.Control value={channelName} placeholder="Enter new chanel name" onChange={(e) => setChannelName(e.target.value)}
  //                     />
  //                 </Col>
  //                 <Col>
  //                     <Button variant="info" onClick={sendChannel}>
  //                         save channel
  //                     </Button>
  //                 </Col>
  //             </Row>
  //         </Form>
  //         <br></br>
  //         {/* <form >
  //             <input
  //                 type="text"
  //                 value={channelName}
  //                 onChange={(e) => setChannelName(e.target.value)}
  //                 placeholder="Enter channel name"
  //             />
  //             <Form.Control type="text" placeholder="Enter new chanel name" />
  //             <Button variant="info" onClick={sendChannel}>
  //                 send message
  //             </Button>
  //         </form> */}
  //     </div>
  // );
  return (
    <>
      <Form>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Control value={channelName} placeholder="Enter new chanel name" onChange={(e) => setChannelName(e.target.value)}
            />
          </Col>
          <Col>
            <Button variant="info" onClick={sendChannel}>
              save channel
            </Button>
          </Col>
        </Row>
      </Form>
      <br></br>
      <MDBContainer fluid className="py-5 gradient-custom">
        <MDBRow>
          <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <h5 className="font-weight-bold mb-3 text-center text-white">
              Channels
            </h5>

            <MDBCard className="mask-custom">
              <MDBCardBody>
                <MDBTypography listUnStyled className="mb-0">
                  {channels &&
                    channels.map((channel) => (
                      <li
                        key={channel.id}
                        onClick={() => handleChannelSelect(channel)}
                        className="p-2 border-bottom"
                        style={{
                          borderBottom:
                            "1px solid rgba(255,255,255,.3) !important",
                        }}
                      >
                        <a
                          href="#!"
                          className="d-flex justify-content-between link-light"
                        >
                          <div className="d-flex flex-row">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0 text-dark">
                                {channel.text}
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small mb-1 text-dark">Just now</p>
                            <span className="badge bg-danger float-end">1</span>
                          </div>
                        </a>
                      </li>
                    ))}
                </MDBTypography>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" lg="7" xl="8">
            <MDBTypography listUnStyled className="text-white">
              <CardChat
                selectedChannel={selectedChannel}
                onSelectedUser={selectedUser} username={username}>
              </CardChat>
            </MDBTypography>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default ChannelList;
