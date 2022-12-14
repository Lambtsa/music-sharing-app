import { TranslationKey } from "@customTypes";
import { ReactNode } from "react";

export type ToastType = "Active" | "Error";

export interface ToastMessage {
  id: TranslationKey;
  variables?: Record<string, ReactNode>;
}

export interface ToastProps {
  type: ToastType;
  message: ToastMessage;
  passableData?: Record<string, ReactNode>;
  onClose: () => void;
}
