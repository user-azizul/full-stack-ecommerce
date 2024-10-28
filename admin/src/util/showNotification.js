import { toast } from "react-toastify";
export function successNotification(msg) {
  toast.success(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
}
export function errorNotification(msg) {
  toast.error(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
}
