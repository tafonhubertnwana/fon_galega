"use client";

import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative bg-white rounded-2xl shadow-2xl p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">{title}</h2>
        )}

        {/* Modal Content */}
        <div>{children}</div>

        {/* Action (optional footer) */}
        <div className="modal-action mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Overlay click closes modal */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
