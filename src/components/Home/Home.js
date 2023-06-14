import React, { useState } from 'react';
import ChatForm from '../../components/ChatForm/ChatForm';
import ChannelList from '../../components/ChannelList/ChannelList';

import Badge from 'react-bootstrap/Badge';

function Home() {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [user, setUser] = useState('');

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel.text);
  };

  const selectedUser = (value) => {
    setUser(value);
  };
  return (
    <div className='gradient-custom'>
      <h1>
        <Badge bg="secondary">Welcome to the Chat List</Badge>
      </h1>
      {selectedChannel && <ChatForm selectedChannel={selectedChannel} onSelectedUser={selectedUser}
        username={user} />}
        
      <ChannelList onSelectChannel={handleChannelSelect} selectedChannel={selectedChannel} onSelectedUser={selectedUser}
        username={user} />

      {/* <CardChat 
        selectedChannel={selectedChannel} 
        onSelectedUser={selectedUser} username={user}>
      </CardChat> */}
    </div>
  );
}

export default Home;