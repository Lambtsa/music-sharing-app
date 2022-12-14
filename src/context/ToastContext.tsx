import { Toast } from "@components/Toast";
import { ToastMessage, ToastType } from "@components/Toast/Toast.types";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from "react";

interface ToastContextShape {
  addToast: (props: AddToastProps) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

interface AddToastProps {
  type: ToastType;
  toastMessage: ToastMessage;
}

const ToastContext = createContext<ToastContextShape | undefined>(undefined);

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastType, setToastType] = useState<ToastType>("Active");
  const [toastMessage, setToastMessage] = useState<ToastMessage>();
  const [isOpen, setIsOpen] = useState(false);

  const addToast = useCallback(({ type, toastMessage }: AddToastProps) => {
    setToastType(type);
    setToastMessage(toastMessage);
    setIsOpen(true);

    const timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
    setToastMessage(undefined);
  }, []);

  const validationState = {
    addToast,
  };

  return (
    <ToastContext.Provider value={validationState}>
      {isOpen && toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={onClose} />
      )}
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };

export function useToast(): ToastContextShape {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
