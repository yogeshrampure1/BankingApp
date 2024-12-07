import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Modal, { ModalStatus } from "../../shared/modal";

const Login = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [transactionStatus, setTransactionStatus] =
    useState<ModalStatus>("error");

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
          title={
            transactionStatus === "success" ? "Successful" : "Unsuccessful"
          }
          status={transactionStatus === "success" ? "success" : "error"}
        >
          <p>
            {transactionStatus === "success"
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
