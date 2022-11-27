import { createContext, useState, ReactNode } from "react";

const AuthContext = createContext({
  token: "",
  isAdmin: false,
  login: (token: string, isAdmin: boolean) => {},
  logout: () => {},
});

const getCookie = (cname: string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(getCookie("token"));
  const [isAdmin, setIsAdmin] = useState(getCookie("isAdmin") === "1");

  const loginHandler = (token: string, isAdmin: boolean) => {
    setToken(token);
    setIsAdmin(isAdmin);
    document.cookie = `token=${token}; path=/`;
    document.cookie = `isAdmin=${isAdmin}; path=/`;
  };

  const logoutHandler = () => {
    setToken("");
    setIsAdmin(false);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const contextValue = {
    token: token,
    isAdmin: isAdmin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
