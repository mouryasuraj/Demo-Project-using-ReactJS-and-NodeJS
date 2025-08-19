
const ConnectionCard = ({ connection }) => {
  const { fullName, age, photoUrl,about } = connection;
  return (
    <div className="flex gap-3 bg-gray-600 p-3 rounded-xl">
      <div>
        <img
          src={photoUrl}
          className="w-20 h-20 rounded-lg bg-center bg-cover bg-no-repeat"
          alt={fullName + " Profile"}
        />
      </div>
      <div>
        <h2 className="font-bold">{fullName}, {age && age}</h2>
      </div>
    </div>
  );
};

export default ConnectionCard;
