import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  user: null,
  signup: () => {},
  signin: () => {},
  signout: () => {},
});
