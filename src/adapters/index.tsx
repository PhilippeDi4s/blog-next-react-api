import { toast } from "react-toastify";

export const showMessage = {
  succsses: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  dismiss: () => toast.dismiss(),
};
