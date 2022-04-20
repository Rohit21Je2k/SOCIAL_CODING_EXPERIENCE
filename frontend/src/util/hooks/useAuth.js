import { useState, useEffect, useCallback } from "react";
import apiUrl from "../../api";

let logoutTimer;
export function useAuth() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const authorize = (details) => {
    //   calculate token expiration time
    const tokenValidity = 1000 * 60 * 60; // 1 hour
    const currentDate = Date.now();
    const tokenExpirationDate = currentDate + tokenValidity;

    // store data to local storage
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...details,
        expiration: tokenExpirationDate,
      })
    );

    // update state
    setUser({ ...details });
    setToken(details.token);
    setTokenExpirationDate(tokenExpirationDate);
  };

  const deAuthorize = () => {
    localStorage.removeItem("userData");
    setUser();
    setToken();
    setTokenExpirationDate();
  };

  const signup = useCallback(
    async (
      name,
      username,
      password,
      github_username,
      leetcode_username,
      codechef_username
    ) => {
      try {
        let reqUrl = `${apiUrl}/api/auth/signup`;

        let reqFormValues = {
          name,
          username,
          password,
          github_username,
          leetcode_username,
          codechef_username,
        };

        const response = await fetch(reqUrl, {
          method: "POST",
          body: JSON.stringify(reqFormValues),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();
        const { error, token } = responseData;
        if (error) {
          throw error;
        }

        const details = {
          username,
          token,
        };

        if (token) {
          authorize(details);
        }
        return "success";
      } catch (err) {
        console.log(err);
        alert(err);
        return null;
      }
    },
    []
  );

  const signin = useCallback(async (username, password) => {
    try {
      const reqFormValues = {
        username,
        password,
      };

      const reqUrl = `${apiUrl}/api/auth/login`;

      const response = await fetch(reqUrl, {
        method: "POST",
        body: JSON.stringify(reqFormValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      const { error, token } = responseData;

      if (error) {
        throw error;
      }

      const details = {
        username,
        token,
      };

      if (token) {
        authorize(details);
      }
    } catch (err) {
      console.log(err);
      alert(err || "Some error occured");
    }
  }, []);

  const signout = useCallback(() => {
    deAuthorize();
  }, []);

  //   update logout
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate - Date.now();
      logoutTimer = setTimeout(signout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate]);

  //   first render
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      setUser({ ...storedData });
      setToken(storedData.token);
      setTokenExpirationDate(storedData.expiration);
    }
  }, []);

  return { user, setUser, token, signup, signin, signout };
}
