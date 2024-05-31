import { toast, ToastContainer, ToastOptions } from "react-toastify";

const toastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// showToast function that can be exported and used elsewhere
export const showToast = (
  message: string,
  type: "success" | "error" | "info"
) => {
  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};

// The ToastNotifier component just renders the ToastContainer
const ToastNotifier = () => {
  return <ToastContainer />;
};

export default ToastNotifier;
