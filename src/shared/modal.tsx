import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

export type ModalStatus = "success" | "error" | "warning";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  status?: ModalStatus;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  status,
}) => {
  if (!isOpen) return null;

  const statusClass = status
    ? styles[`modal${status.charAt(0).toUpperCase() + status.slice(1)}`]
    : "";

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={`${styles.modalContainer} ${statusClass}`}>
        {title && <h2 className={styles.modalTitle}>{title}</h2>}
        <button onClick={onClose} className={styles.closeButton}>
          ×
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
