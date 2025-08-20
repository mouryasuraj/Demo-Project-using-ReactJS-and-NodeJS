import { createContext, useState } from "react";

export const AppStore = createContext();

const AppStoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  // For Connections
  const [connections, setConnections] = useState([]);
  const [feed, setFeed] = useState([]);
  const [userRequests, setUserRequests] = useState([]);

  return (
    <AppStore.Provider
      value={{
        showToast,
        setShowToast,
        toastMessage,
        setToastMessage,
        toastType,
        setToastType,
        loading,
        setLoading,
        connections,
        setConnections,
        feed,
        setFeed,
        userRequests,
        setUserRequests,
      }}
    >
      {children}
    </AppStore.Provider>
  );
};

export default AppStoreProvider;
