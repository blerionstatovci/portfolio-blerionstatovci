import { useCallback, useMemo, useState } from "react";
import { Check, Info, TriangleAlert, X } from "lucide-react";
import { ToastContext } from "../hooks/useToast";
import type { ToastTone } from "../hooks/useToast";
type ToastItem = { id: number; message: string; tone: ToastTone };

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, tone: ToastTone = "info") => {
    const id = Date.now() + Math.random();
    setItems((current) => [...current, { id, message, tone }].slice(-3));
    window.setTimeout(() => setItems((current) => current.filter((item) => item.id !== id)), 3600);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {items.map((item) => {
          const Icon = item.tone === "success" ? Check : item.tone === "error" ? TriangleAlert : Info;
          return (
            <div className={`system-toast toast-${item.tone}`} key={item.id} role={item.tone === "error" ? "alert" : "status"}>
              <Icon size={15} aria-hidden="true" />
              <span>{item.message}</span>
              <button onClick={() => setItems((current) => current.filter((toast) => toast.id !== item.id))} aria-label="Dismiss notification">
                <X size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
