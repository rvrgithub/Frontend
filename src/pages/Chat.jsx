import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRouters";
import {ChatContainer} from "../Components/ChatContainer";
import { Contacts } from "../Components/Contact";
import { Welcome } from "../Components/Welcome";


export const  Chat=() =>{
  const navigate = useNavigate();
  // const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect( () => {
    if (!localStorage.getItem(
      "chat-app-user"
      )) {
      navigate("/login");
    } else {
      setCurrentUser(
         JSON.parse(
          localStorage.getItem(
            "chat-app-user"
            )
        )
      );
    }
  }, []);

  // console.log("currentUser",currentUser)
  // useEffect(() => {
  //   if (currentUser) {
  //     socket.current = io(host);
  //     socket.current.emit("add-user", currentUser._id);
  //   }
  // }, [currentUser]);

  useEffect( () => {
    if (currentUser) {
      if (currentUser.isProfileImageSet) {
        const data =  axios.get(`${allUsersRoute}/${currentUser._id}`)
        .then((res)=>setContacts(res.data))
        .catch((err)=>console.log("err",err));
        // setContacts(data.data);
        console.log("data.data",data)
      } else {
        navigate("/setProfile");
      }
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
    
      {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} 
            //  socket={socket}
             currentUser={currentUser}
              />
          )} 
    
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;