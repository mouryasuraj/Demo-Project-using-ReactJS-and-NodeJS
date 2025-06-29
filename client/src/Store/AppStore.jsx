import { createContext, useState } from "react";

export const AppStore = createContext();


const AppStoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

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
        setLoading
      }}
    >
      {children}
    </AppStore.Provider>
  );
};

export default AppStoreProvider