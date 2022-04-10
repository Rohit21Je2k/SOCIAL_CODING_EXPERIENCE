import React from "react";
import Card from "../../ui/Card/Card";
import Input from "../../ui/Input/Input";

import "./GroupsChat.css";

export default function GroupsChat() {
  return (
    <div className="groups-chat">
      <Card className="group-chat-card">
        <h3>Emacs Lover</h3>
        <div className="groups-chat-messages">hi</div>
        <form>
          <Input placeholder="Enter Message here..." />
        </form>
      </Card>
    </div>
  );
}
