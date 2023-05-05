import { useState, createContext } from "react";

const SharingContext = createContext();

function SharingProvider({ children }) {
  const [show, setShow] = useState(true);
  const [role, setRole] = useState("");
  const [isAuth, setAuth] = useState(false);
  const [ID, setID] = useState("");
  const [APIaddr, setAPIaddr] = useState("http://10.0.1.78:8000/");
  const [access, setAccess] = useState([]);
  const [curRole, setCurRole] = useState();

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
        access,
        setAccess,
        curRole,
        setCurRole,
      }}
    >
      {children}
    </SharingContext.Provider>
  );
}

export { SharingProvider };
export default SharingContext;
