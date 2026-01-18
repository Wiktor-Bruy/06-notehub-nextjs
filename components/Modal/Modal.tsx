import css from "./Modal.module.css";

import { createPortal } from "react-dom";
import { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ children, onClose }: ModalProps) {
  function clickBackdrop(ev: React.MouseEvent) {
    if (ev.target != ev.currentTarget) {
      return;
    }
    onClose();
  }
  useEffect(() => {
    function closeModal(ev: KeyboardEvent) {
      if (ev.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", closeModal);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeModal);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={clickBackdrop}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
