import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { RootState } from "../components/store";
import { useSelector } from "react-redux";

export type ModalStatus = "success" | "error" | "warning";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  const { transactionStatus, message } = useSelector((state: RootState) => state.fundTransfer);
  const statusClass = transactionStatus
    ? styles[`modal${transactionStatus.charAt(0).toUpperCase() + transactionStatus.slice(1)}`]
    : "";

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={`${styles.modalContainer} ${statusClass}`}>
        <button onClick={onClose} className={styles.closeButton}>
          ×
        </button>
        <div>{message}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
