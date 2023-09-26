import React, { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  timeout?: number;
};

const Toast: React.FC<ToastProps> = ({ message, type, timeout = 5_000 }) => {
  const [show, setShow] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, timeout);
  }, [timeout]);

  return (
    <div
      className={`
          fixed bottom-5 left-1/2 mx-auto -ml-32 w-64 rounded-md p-4 text-center text-grey
        ${type === "success" ? "bg-light-green" : "bg-red-100"} 
        ${show ? "block" : "hidden"}
      `}
      role="alert"
    >
      <p>{message}</p>
    </div>
  );
};

export default Toast;
