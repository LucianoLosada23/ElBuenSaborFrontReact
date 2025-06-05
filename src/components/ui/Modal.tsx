import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}
export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-2">
        <DialogPanel className="w-full max-w-6xl rounded-md bg-white p-22 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-3xl font-semibold text-black">
              {title}
            </DialogTitle>
            <XMarkIcon 
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
