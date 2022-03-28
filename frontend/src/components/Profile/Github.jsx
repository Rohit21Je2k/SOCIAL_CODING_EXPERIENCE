import React, { useState, useEffect } from "react";
import { getGithubData } from "../../util/api/Github/getGithubData";

import "./Profile.css";

export default function Github(props) {
  const { username } = props;

  const [details, setDetails] = useState(null);

  useEffect(async () => {
    const data = await getGithubData(username);
    console.log(data);
    setDetails(data);
  }, [username]);

  return (
    <div className="github profile">
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
            <div key={index} className="profile_details_card">
              <h3>{detail.title}</h3>
              <iframe
                className="dashboard__profile_iframe"
                src={detail.value}
              ></iframe>
            </div>
          );
        })}
    </div>
  );
}
