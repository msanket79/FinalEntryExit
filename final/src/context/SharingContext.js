import { useState, createContext } from "react";

const SharingContext = createContext();

function SharingProvider({ children }) {
  const [show, setShow] = useState(true);
  const [role, setRole] = useState("");
  const [isAuth, setAuth] = useState(false);
  const [ID, setID] = useState("");
  const [APIaddr, setAPIaddr] = useState("http://10.0.12.123:8000/");

  return (
    <SharingContext.Provider
      value={{
        show,
        setShow,
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
