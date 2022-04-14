import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Card from "../../ui/Card/Card";
import Input from "../../ui/Input/Input";

import apiUrl from "../../api";

import "./GroupsChat.css";

export default function GroupsChat(props) {
  const { name, id: roomId } = props;

  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(apiUrl);
    setSocket(socket);
    socket.on("connect", () => {
      console.log("Connected to socket :" + socket.id);
    });

    socket.emit("join-room", roomId);

    // receive
    socket.on("receive-message", (msg) => {
      setMessages((prevMsgs) => {
        return [msg, ...prevMsgs];
      });
    });

    return () => {
      socket.off("receive-message");
    };
  }, [name, roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const text = form.text.value;
    form.reset();
    // send message
    socket.emit("send-message", text, roomId);
    setMessages((prevMsgs) => {
      return [text, ...prevMsgs];
    });
  };

  return (
    <div className="groups-chat">
      <Card className="group-chat-card">
        <h3>{name}</h3>
        <div className="groups-chat-messages">
          {messages.map((msg, index) => {
            return <p key={index}>{msg}</p>;
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <Input name="text" type="text" placeholder="Enter Message here..." />
        </form>
      </Card>
    </div>
  );
}
