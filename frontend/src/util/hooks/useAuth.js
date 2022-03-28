import { useState, useEffect, useCallback } from "react";
import apiUrl from "../../api";

let logoutTimer;
export function useAuth() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const authorize = (
    name,
    email,
    github_username,
    leetcode_username,
    codechef_username,
    token
  ) => {
    //   calculate token expiration time
    const tokenValidity = 1000 * 60 * 60; // 1 hour
    const currentDate = Date.now();
    const tokenExpirationDate = currentDate + tokenValidity;

    // store data to local storage
    localStorage.setItem(
      "userData",
      JSON.stringify({
        name: name,
        email: email,
        github_username,
        leetcode_username,
        codechef_username,
        token: token,
        expiration: tokenExpirationDate,
      })
    );

    // update state
    setUser({
      name: name,
      email: email,
      github_username,
      leetcode_username,
      codechef_username,
    });
    setToken(token);
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
      email,
      password,
      github_username,
      leetcode_username,
      codechef_username
    ) => {
      try {
        let reqUrl = `${apiURL}/api/users/signup`;

        let reqFormValues = {
          name,
          email,
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
        const { message, token } = responseData;
        if (message) {
          alert(message);
        }

        if (token) {
          authorize(
            name,
            email,
            github_username,
            leetcode_username,
            codechef_username,
            token
          );
        }
      } catch (err) {
        alert(err);
        console.log(err);
      }
    },
    []
  );

  const signin = useCallback(async (email, password) => {
    try {
      const reqFormValues = {
        email,
        password,
      };

      const reqUrl = `${apiURL}/api/users/login`;

      const response = await fetch(reqUrl, {
        method: "POST",
        body: JSON.stringify(reqFormValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      const {
        message,
        name,
        token,
        github_username,
        leetcode_username,
        codechef_username,
      } = responseData;
      console.log(responseData);
      if (message) {
        alert(message);
      }
      if (token) {
        authorize(
          name,
          email,
          github_username,
          leetcode_username,
          codechef_username,
          token
        );
      }
    } catch (err) {
      alert("Fetching Error");
      console.log(err);
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
      setUser({ email: storedData.email });
      setToken(storedData.token);
      setTokenExpirationDate(storedData.expiration);
    }
  }, []);

  return { user, token, signup, signin, signout };
}
