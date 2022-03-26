import React from "react";

import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile">
      <div className="profile_details_card">
        <h3>Rating</h3>
        <p>120</p>
      </div>
      <div className="profile_details_card">
        <h3>Activity</h3>
        <iframe
          className="dashboard__profile_iframe"
          src="https://ghchart.rshah.org/anuj12122000"
          title="W3Schools Free Online Web Tutorials"
        ></iframe>
      </div>
    </div>
  );
}
