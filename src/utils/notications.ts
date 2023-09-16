import { toast } from 'react-toastify';

export const successNotification = (message: string) => {
  toast.success(message, {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
  });
}

export const errorNotification = (message: string) => {
  toast.error(message, {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
  });
}