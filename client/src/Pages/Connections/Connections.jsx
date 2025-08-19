import { useContext, useEffect } from "react";
import { handleFetchConnections } from "./services/connectionsService";
import ConnectionCard from "./components/ConnectionCard.jsx"
import { AppStore } from "../../Store/AppStore.jsx";

const Connections = () => {
  const {connections,setLoading, setConnections} = useContext(AppStore);
  useEffect(() => {
    handleFetchConnections(setConnections, setLoading);
  }, []);


  return (
    <div className="text-gray-200">
      <h1 className="m-5 text-2xl">Connections </h1>
      <div className="m-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {connections.length===0 ? <div>No Connection Made</div> : connections.map((connection) => {
          return (
            <ConnectionCard key={connection._id} connection={connection} />
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
