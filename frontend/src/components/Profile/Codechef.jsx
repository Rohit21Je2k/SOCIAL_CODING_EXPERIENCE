import React, { useState, useEffect } from "react";
import {getCodechefData} from '../../util/api/Codechef/getCodechefData'
import "./Profile.css";

export default function Codechef() {
  const [details, setDetails] = useState(null);
  const userId = "ajdev";
  

  useEffect(async () => {
    const data = await getCodechefData(userId);
    console.log(data);
    setDetails(data);
  }, []);

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
        })}
    </div>
  );
}
