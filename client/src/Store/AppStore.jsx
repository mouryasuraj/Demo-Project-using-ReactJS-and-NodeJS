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

  // For Chat
  const [currChatUser, setCurrChatUser] = useState(null)

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
        currChatUser, 
        setCurrChatUser
      }}
    >
      {children}
    </AppStore.Provider>
  );
};

export default AppStoreProvider;
