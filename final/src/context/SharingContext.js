import { useState, createContext } from "react";

const SharingContext = createContext();

function SharingProvider({ children }) {
  const [show, setShow] = useState(true);
  const [dark, setDark] = useState(false);
  const [themeNo, setTheme] = useState(1);
  const [role, setRole] = useState("");
  const [isAuth, setAuth] = useState(false);
  const [ID, setID] = useState("");
  const [APIaddr, setAPIaddr] = useState("http://10.0.9.57:8000/");

  return (
    <SharingContext.Provider
      value={{
        show,
        setShow,
        dark,
        setDark,
        themeNo,
        setTheme,
        role,
        setRole,
        isAuth,
        setAuth,
        ID,
        setID,
        APIaddr,
        setAPIaddr,
      }}
    >
      {children}
    </SharingContext.Provider>
  );
}

export { SharingProvider };
export default SharingContext;
