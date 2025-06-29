import { createContext, useState } from "react";

export const AuthStore = createContext();

const AuthStoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthStore.Provider value={{ user, setUser }}>
      {children}
    </AuthStore.Provider>
  );
};

export default AuthStoreProvider;
