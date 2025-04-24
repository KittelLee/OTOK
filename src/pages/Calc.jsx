import { useState } from "react";
import CalcCard from "../components/Calc/CalcCard";
import CalcModal from "../components/Modal/CalcAddModal";
import ModalForm from "../common/Modal/ModalForm";
import UploadIcon from "../assets/icons/upload.svg";
import "../styles/Calc.css";

function Calc() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <section className="calc-wrap">
        <div className="calc-top">
          <input type="text" placeholder="벙 이름으로 검색" />
          <button onClick={openModal}>
            <img src={UploadIcon} />
          </button>
        </div>
        <div>
          <CalcCard />
          <CalcCard />
        </div>
      </section>
      <ModalForm isOpen={isModalOpen} onClose={closeModal}>
        <CalcModal />
      </ModalForm>
    </>
  );
}

export default Calc;
