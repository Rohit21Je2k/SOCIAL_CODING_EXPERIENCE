import React, { useState, useEffect, useContext } from "react";
import GroupsList from "./GroupsList";
import getGroups from "../../util/api/getGroups";
import { AuthContext } from "../../util/context/AuthContext";
import Loader from "../../components/Loader/Loader";

import "./AllGroups.css";
import Card from "../../ui/Card/Card";
export default function AllGroups() {
  const { user, token } = useContext(AuthContext);
  const { username } = user;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(async () => {
    setLoading(true);
    const data = await getGroups(username, token);
    if (!data) {
      setError("Couldn't get groups data");
    }
    setData(data);
    setLoading(false);
  }, [username, token]);

  if (loading) {
    return (
      <div className="all-groups">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-groups">
        <Card className="error_card">{error}</Card>
      </div>
    );
  }
  return (
    <div className="all-groups">
      <GroupsList groups={data.groups} />
    </div>
  );
}
