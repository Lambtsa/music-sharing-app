export interface ToastProps {
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  message?: string;
  onClose: () => void;
}
