/* eslint-disable @typescript-eslint/no-explicit-any */
// Update the import path if the file is located elsewhere, for example:
// import { useToast } from "../../hooks/use-toast"
// Or correct the path according to your project structure.
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
function useToast(): { toasts: any[] } {
  // Minimal, reasonable implementation for the existing Toaster component.
  // Replace this with your app's toast manager/context (add/remove, durations, etc.) as needed.
  const toasts = [
    {
      id: "toast-1",
      title: "Welcome",
      description: "This is a sample toast. Replace useToast with your real implementation.",
      action: null,
      // any other props you want forwarded to <Toast /> can live here
    },
  ]

  return { toasts }
}

