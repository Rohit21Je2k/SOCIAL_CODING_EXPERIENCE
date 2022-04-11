import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../util/context/AuthContext";
import Loader from "../Loader/Loader";
import getMenu from "../../ui/Menu";
import Following from "./Following";
import Followers from "./Followers";
import { getFollowing } from "../../util/api";

import "./Follow.css";
export default function Follow() {
  const { user } = useContext(AuthContext);
  const { username } = user;

  const Menu = getMenu(2);
  const [selected, setSelected] = useState(1);

  const [loading, setLoading] = useState(true);
  const [followDetails, setFollowDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await getFollowing(username);
      setFollowDetails(data);
      setLoading(false);
    } catch (err) {
      setError("Some Error Occured");
    }
  }, [username]);

  const handleClick = (menuNum) => {
    return () => {
      setSelected(menuNum);
    };
  };
  return (
    <div className="following-page">
      {error && <h4>{error}</h4>}
      {loading ? (
        <Loader />
      ) : (
        <div className="wrapper">
          <Menu>
            <Menu.Item
              onClick={handleClick(1)}
              className={selected === 1 ? "selected" : null}
            >
              Following
            </Menu.Item>
            <Menu.Item
              onClick={handleClick(2)}
              className={selected === 2 ? "selected" : null}
            >
              Followers
            </Menu.Item>
          </Menu>
          {selected === 1 && (
            <Following data={followDetails} setData={setFollowDetails} />
          )}
          {selected === 2 && (
            <Followers data={followDetails} setData={setFollowDetails} />
          )}
        </div>
      )}
    </div>
  );
}
