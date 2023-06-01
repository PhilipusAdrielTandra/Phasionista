import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
import Header from '../Components/header/layout'
import {Button} from '@mui/material'

const socket = io.connect('http://localhost:3011');

function JoinChat() {
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState('');

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div className=''>
      <Header/>
      {! showChat? (
    <div className="h-screen flex flex-col justify-center items-center pb-44">
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="Usermame"
        onChange={(event) => {
          setUsername(event.target.value);
        }} className='w-96'
      />
      <input
        type="text"
        placeholder="Room ID"
        onChange={(event) => {
          setRoom(event.target.value);
        }} className='w-96'
      />
      <Button onClick={joinRoom} variant='outlined' className='my-2'>Join A Room</Button>
      </div>
      )
      :(
      <Chat socket={socket} username={username} room={room}/>
      )}
      </div>
  );
}

export default JoinChat;
