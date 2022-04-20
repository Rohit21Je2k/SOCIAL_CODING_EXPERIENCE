import React, { useState, useContext } from "react";
import searchGroup from "../../util/api/searchGroup";
import { AuthContext } from "../../util/context/AuthContext";
import joinGroup from "../../util/api/joinGroup";
import Card from "../../ui/Card/Card";
import Loader from "../../components/Loader/Loader";
import Input from "../../ui/Input/Input";
import groupPNG from "../../assets/group.png";

export default function AddGroup() {
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [show, setShow] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShow(true);
    const groupname = e.target.groupname.value;
    const data = await searchGroup(groupname, token);
    if (!data) {
      setGroups(null);
    } else {
      setGroups(data.groups);
    }
    setLoading(false);
  };

  const sendJoinRequest = (groupId) => {
    return async () => {
      const data = await joinGroup(groupId, user.username, token);
      if (!data) {
        alert("Some error occured");
      } else {
        alert("Request sent successfully");
      }
    };
  };
  return (
    <div className="add-group search">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <Input
            label="Search Group Name"
            type="text"
            name="groupname"
            placeholder="Enter groupname..."
          />
          <button>Submit</button>
        </form>
        {loading ? (
          <Loader />
        ) : !groups ? (
          <Card className="error_card">No group found</Card>
        ) : (
          groups.map((group, index) => {
            return (
              <div key={index} className="follow_card">
                <span>
                  <img src={groupPNG} />
                </span>
                <h3>Name : {group.name}</h3>
                <h4>Members: {group.members}</h4>
                <button onClick={sendJoinRequest(group._id)} className="btn">
                  Join
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
