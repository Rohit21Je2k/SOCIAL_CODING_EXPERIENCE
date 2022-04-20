import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../util/context/AuthContext";
import getGroupRequests from "../../util/api/getGroupRequests";
import Loader from "../../components/Loader/Loader";
import acceptMember from "../../util/api/acceptMember";
import Card from "../../ui/Card/Card";

import groupPNG from "../../assets/group.png";

import "./GroupRequest.css";
export default function GroupRequest() {
  const { user, token } = useContext(AuthContext);
  const { username } = user;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupRequests, setGroupRequests] = useState([]);
  useEffect(async () => {
    setLoading(true);
    const data = await getGroupRequests(username, token);
    if (!data) {
      setError("Couldn't find group request");
      setGroupRequests([]);
    } else {
      setGroupRequests(data.groupRequests);
    }
    setLoading(false);
  }, [username, token]);

  const sendAcceptRequest = (groupId, requestedUser, index) => {
    return async () => {
      const data = await acceptMember(groupId, requestedUser, username, token);
      if (!data) {
        alert("couldn't accept request");
      } else {
        alert("request accepted successfully");
        setGroupRequests((prevRequests) => {
          prevRequests = prevRequests.filter((v, i) => i != index);
          return [...prevRequests];
        });
      }
    };
  };

  if (loading) {
    return (
      <div className="group-requests">
        <div className="wrapper">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="group-requests">
        <div className="wrapper">
          <Card className="error_card">{error}</Card>
        </div>
      </div>
    );
  }

  return (
    <div className="group-requests">
      <div className="wrapper">
        {groupRequests.length === 0 ? (
          <Card className="error_card">No request Found</Card>
        ) : (
          groupRequests.map((request, index) => {
            return (
              <div key={index} className="follow_card">
                <span>
                  <img src={groupPNG} />
                </span>
                <h3>Name : {request.username}</h3>
                <button
                  onClick={sendAcceptRequest(
                    request.groupId,
                    request.username,
                    index
                  )}
                  className="btn"
                >
                  Accept
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
