import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  user: null,
  setUser: null,
  signup: () => {},
  signin: () => {},
  signout: () => {},
});
