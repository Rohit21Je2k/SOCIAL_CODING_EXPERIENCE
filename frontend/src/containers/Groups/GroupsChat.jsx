import React, { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import Card from "../../ui/Card/Card";
import Input from "../../ui/Input/Input";
import { AuthContext } from "../../util/context/AuthContext";

import apiUrl from "../../api";

import "./GroupsChat.css";

export default function GroupsChat(props) {
  const { user } = useContext(AuthContext);
  const { username } = user;
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
    socket.on("receive-message", (msg, user) => {
      console.log(user);
      setMessages((prevMsgs) => {
        return [{ msg, user }, ...prevMsgs];
      });
    });

    return () => {
      socket.off("receive-message");
    };
  }, [name, roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const msg = form.text.value;
    form.reset();
    // send message
    socket.emit("send-message", msg, username, roomId);
    setMessages((prevMsgs) => {
      return [{ msg, user: username }, ...prevMsgs];
    });
  };

  return (
    <div className="groups-chat">
      <Card className="group-chat-card">
        <h3>{name}</h3>
        <div className="groups-chat-messages">
          {messages.map((msgs, index) => {
            return (
              <div className="msg_pill" key={index}>
                <p>{msgs.msg}</p>
                <span>sent by {msgs.user}</span>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <Input name="text" type="text" placeholder="Enter Message here..." />
        </form>
      </Card>
    </div>
  );
}
