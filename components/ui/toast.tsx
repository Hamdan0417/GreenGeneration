'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import type {ReactNode} from 'react';

type ToastVariant = 'success' | 'error' | 'info';

type ToastMessage = {
  id: number;
  title: string;
  description?: string;
  variant?: ToastVariant;
};

type ToastContextValue = {
  // eslint-disable-next-line no-unused-vars
  notify: (toast: Omit<ToastMessage, 'id'>) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let toastId = 0;

export function ToastProvider({children}: {children: ReactNode}) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const notify = useCallback(({title, description, variant = 'info'}: Omit<ToastMessage, 'id'>) => {
    toastId += 1;
    const id = toastId;
    setToasts((prev) => [...prev, {id, title, description, variant}]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3800);
  }, []);

  const value = useMemo(() => ({notify}), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastList toasts={toasts} />
    </ToastContext.Provider>
  );
}

function ToastList({toasts}: {toasts: ToastMessage[]}) {
  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-end gap-3 sm:right-8 sm:left-auto">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{opacity: 0, y: 20, scale: 0.95}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 20, scale: 0.95}}
            transition={{type: 'spring', stiffness: 280, damping: 28}}
            className={`pointer-events-auto w-full max-w-sm rounded-2xl border border-ink/10 bg-mist/95 p-4 shadow-glow backdrop-blur dark:border-mist/10 dark:bg-ink/95 ${
              toast.variant === 'success'
                ? 'border-teal/40'
                : toast.variant === 'error'
                ? 'border-red-500/40'
                : ''
            }`}
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-ink dark:text-mist">{toast.title}</p>
            {toast.description ? (
              <p className="mt-1 text-xs text-ink/70 dark:text-mist/70">{toast.description}</p>
            ) : null}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function ToastViewport() {
  const [providerMounted, setProviderMounted] = useState(false);
  useEffect(() => setProviderMounted(true), []);
  if (!providerMounted) return null;
  return null;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
