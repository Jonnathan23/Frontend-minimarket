import { toast, type Id } from "react-toastify";


export class ShowMessageAdapter {

    static success(message: string): Id {
        return toast.success(message);
    }

    static error(message: string): Id {
        return toast.error(message);
    }

    static warning(message: string): Id {
        return toast.warning(message);
    }

    static info(message: string): Id {
        return toast.info(message);
    }

    static loading(message: string): Id {
        return toast.loading(message);
    }

    static updateToast(toastId: Id, message: string, type: 'success' | 'error' | 'warning' | 'info') {
        toast.update(toastId, {
            render: message,
            type: type,
            isLoading: false,
            autoClose: 3000
        });
    }

    static closeToast(toastId: Id) {
        toast.dismiss(toastId);
    }
}