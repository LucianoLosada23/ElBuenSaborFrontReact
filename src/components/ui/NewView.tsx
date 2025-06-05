import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function NewView({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex">
        <DialogPanel className="w-full h-full bg-white p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6 ">
            <DialogTitle className="text-2xl font-bold text-black">
              {title}
            </DialogTitle>
            <XMarkIcon
              width={24}
              height={24}
              className="cursor-pointer text-gray-600 hover:text-black transition"
              onClick={onClose}
            />
          </div>
          {/* Contenido centrado */}
          <div className="flex flex-1 items-center justify-center overflow-auto">
            <div className="w-full max-w-7xl">{children}</div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
