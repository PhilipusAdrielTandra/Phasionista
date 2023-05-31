import React, { useEffect, useState, useMemo } from 'react';
import {io, Socket} from 'socket.io-client'
import Dashboard from '../Components/Dashboard';
import '../Styles/Chat.css';
import profile from '../Assets/branding/logo.png'
import Header from '../Components/header'
import Footer from '../Components/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FaPaperPlane } from 'react-icons/fa';

const socket = io('http://localhost:3011/chat');



interface ChatProps {
  socket: Socket;
  username: string;
  room: string;
}

function Chat({ socket, username, room }: ChatProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className=''>
    <Header/>

    <div className='flex justify-center items-center min-h-screen bg-[#26547C] pt-8'>
      <div className='relative w-[1100px] max-w-full h-[calc(100vh-140px)] flex'>
      {/* right side */}
      <div className='relative flex-[70%] bg-white border-[1px] border-black'>
        <div className='relative w-full h-14 bg-neutral-300 border-b-[1px] border-black'>
          <img src={profile} className='relative w-[40px] h-[40px] overflow-hidden rounded-[50%] left-4 top-2 float-left cursor-pointer'></img>
          <h1 className='relative left-6 top-3 font-semibold text-[1.2em]'>Live Chat</h1>
        </div>
        {/* chat */}
        <div className='relative w-full h-[calc(100%-120px)] overflow-y-auto overflow-x-hidden'>
            {messageList.map((messageContent) => {
              if (messageContent.author === username) {
                return (
                  <div className='relative flex w-full my-[5px] pr-5 justify-end'>
                    <p className='relative right-0 text-left max-w-[65%] p-[12px] bg-[#D00505] rounded-[10px]'>
                      {messageContent.message}<br/>
                      <span className='block text-right text-[14px] font-light'>{messageContent.time}</span>
                    </p>
                  </div>
                );
              } else {
                return (
                  <div className='relative flex w-full my-[5px] ml-5 justify-start'>
                    <p className='relative right-0 text-right max-w-[65%] p-[12px] bg-[#63A375] rounded-[10px]'>
                      {messageContent.message}<br/>
                      <span className='block text-left text-[14px] font-light'>{messageContent.time}</span>
                    </p>
                  </div>
                );
              }
            })}
          </div>

        {/* input chat */}
        <div className='relative w-full h-[65px] bg-slate-200 flex justify-between items-center p-[15px] border-t-[1px] border-b-[1px] border-black'>
          <input type='text' value={currentMessage} placeholder='type a message' className='relative w-[90%] rounded-[30px]'  onChange={(event) => {setCurrentMessage(event.target.value);}} onKeyPress={(event) => {event.key === "Enter" && sendMessage()}}></input>
          <button onClick={sendMessage} className='pr-6 text-2xl'><FontAwesomeIcon icon={ faPaperPlane } /></button>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
  </div>
  );
}

export default Chat;