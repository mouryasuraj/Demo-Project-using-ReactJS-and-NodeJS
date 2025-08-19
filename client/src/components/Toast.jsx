
const Toast = ({message, type}) => {
  console.log(`alert alert-${type}`);
  
  return (
    <div className="toast toast-top toast-center z-[101]">
      <div className={`alert alert-${type}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
