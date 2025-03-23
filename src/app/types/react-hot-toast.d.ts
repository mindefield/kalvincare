declare module 'react-hot-toast' {
  import { ReactNode } from 'react';

  interface ToasterProps {
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    toastOptions?: {
      duration?: number;
      style?: React.CSSProperties;
      className?: string;
      icon?: ReactNode;
      ariaProps?: {
        role: string;
        'aria-live': string;
      };
    };
  }

  interface Toast {
    success(message: string, options?: ToasterProps['toastOptions']): string;
    error(message: string, options?: ToasterProps['toastOptions']): string;
    loading(message: string, options?: ToasterProps['toastOptions']): string;
    custom(message: string, options?: ToasterProps['toastOptions']): string;
    dismiss(toastId?: string): void;
    promise<T>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string;
        error: string;
      },
      options?: ToasterProps['toastOptions']
    ): Promise<T>;
  }

  export function Toaster(props?: ToasterProps): JSX.Element;
  export const toast: Toast;
} 