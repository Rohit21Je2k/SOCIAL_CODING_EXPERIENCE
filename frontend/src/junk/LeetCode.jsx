import React, { useState, useEffect } from "react";
import { getLeetcodeData } from "../../util/api/Leetcode/getLeetcodeData";
import "./Profile.css";

export default function LeetCode(props) {
  const { username } = props;
  const [details, setDetails] = useState(null);

  useEffect(async () => {
    const data = await getLeetcodeData(username);
    setDetails(data);
  }, [username]);

  return (
    <div className="profile">
      {details &&
        details.map((detail, index) => {
          if (detail.type === "String") {
            return (
              <div key={index} className="profile_details_card">
                <h3>{detail.title}</h3>
                <p>{detail.value}</p>
              </div>
            );
          }

          return (
            <div className="profile_details_card">
              <h3>{detail.title}</h3>
              {detail.value.map((deta, index) => {
                return <p key={index}>{deta}</p>;
              })}
            </div>
          );
        })}
    </div>
  );
}
