import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Modal, { ModalStatus } from "../../shared/modal";

const Login = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [transactionStatus, setTransactionStatus] =
    useState<ModalStatus>("success");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const username = useSelector(
    (state: RootState) => state.mortGageReducer.userData.userName
  );
  return (
    <div>
      {username}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <button onClick={handleOpenModal}>Open Modal</button>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={transactionStatus ? "Successful" : "Unsuccessful"}
          status={transactionStatus}
        >
          <p>
            {transactionStatus
              ? "Your transaction is Successful"
              : "Your transaction is unsuccessful. Please try again."}
          </p>
          <button onClick={handleCloseModal}>Close Modal</button>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
