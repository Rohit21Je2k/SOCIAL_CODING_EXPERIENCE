import React from "react";
import extractGithub from "./extractGithub";
import extractLeetCode from "./extractLeetCode";
import extractCodeChef from "./extractCodechef";

import "./Profile.css";

export default function Github(props) {
  const { profile, details } = props;
  let userData;
  if (profile == "leetcode") {
    userData = extractLeetCode(details);
  }

  if (profile == "github") {
    userData = extractGithub(details);
  }

  if (profile == "codechef") {
    userData = extractCodeChef(details);
  }

  return (
    <div className="github profile">
      {userData?.map((detail, index) => {
        const el = (
          <div key={index} className="profile_details_card">
            <h3>{detail.title}</h3>
            {detail.type === "String" && <p>{detail.value}</p>}
            {detail.type === "iframe" && (
              <iframe
                className="dashboard__profile_iframe"
                src={detail.value}
              ></iframe>
            )}
            {detail.type === "Array" &&
              detail?.value?.map((deta, index) => {
                return <p key={index}>{deta}</p>;
              })}
          </div>
        );
        return el;
      })}
    </div>
  );
}
