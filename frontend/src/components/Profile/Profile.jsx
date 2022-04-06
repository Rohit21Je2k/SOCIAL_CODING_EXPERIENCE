import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";

// css
import "./Profile.css";

export default function Github(props) {
  const { username, getData } = props;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setLoading(true);
    const data = await getData(username);
    if (data == null) {
      setError("Failed to Fetch");
    }
    setDetails(data);
    setLoading(false);
  }, [username]);

  return (
    <div className="github profile">
      {loading ? (
        <Loader />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        details?.map((detail, index) => {
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
        })
      )}
    </div>
  );
}
