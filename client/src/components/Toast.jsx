
const Toast = ({message, type}) => {
  return (
    <div className="toast toast-top toast-center">
      <div className={`alert alert-${type}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
