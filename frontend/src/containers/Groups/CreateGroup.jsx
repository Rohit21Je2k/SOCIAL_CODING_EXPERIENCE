import React, { useState, useContext } from "react";
import createGroup from "../../util/api/createGroup";
import { AuthContext } from "../../util/context/AuthContext";
import Input from "../../ui/Input/Input";

import "./CreateGroup.css";

export default function CreateGroup() {
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const groupname = e.target.groupname.value;
    const data = await createGroup(groupname, user.username, token);
    if (!data) {
      alert("couldn't create group");
    } else {
      alert("group created");
    }
    setLoading(false);
  };
  return (
    <div className="add-group search">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <Input
            label="Enter Group Name"
            type="text"
            name="groupname"
            placeholder="Enter groupname..."
          />
          <button>Create Group</button>
        </form>
        {loading && <h4 className="cg_t">Creating Group...</h4>}
      </div>
    </div>
  );
}
