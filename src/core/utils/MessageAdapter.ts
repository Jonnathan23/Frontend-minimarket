import { toast, type Id } from "react-toastify";


export class ShowMessageAdapter {

    static success(message: string) {
        toast.success(message);
    }

    static error(message: string) {
        toast.error(message);
    }

    static warning(message: string) {
        toast.warning(message);
    }

    static info(message: string) {
        toast.info(message);
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
}