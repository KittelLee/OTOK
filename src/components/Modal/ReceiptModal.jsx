import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../../styles/Modal/ReceiptModal.css";
import PropTypes from "prop-types";

function ReceiptModal({ onClose, onConfirm }) {
  const [fileName, setFileName] = useState("");
  const [amount, setAmount] = useState("");
  const [people, setPeople] = useState("");
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amt = Number(amount);
    const cnt = Number(people);
    if (!amt || !cnt) return alert("금액과 인원수를 모두 입력하세요.");

    let photoURL = "";
    if (file) {
      const storage = getStorage();
      const id = `${Date.now()}_${file.name}`;
      const refPath = ref(storage, `receipts/${id}`);
      await uploadBytes(refPath, file);
      photoURL = await getDownloadURL(refPath);
    }

    onConfirm({
      amount: amt,
      people: cnt,
      photoURL,
      fileName,
    });
    onClose();
  };

  return (
    <form className="receipt-wrap" onSubmit={handleSubmit}>
      <h2>N차 정산 입력</h2>
      <label>
        금액
        <input
          type="number"
          placeholder="총 금액을 입력하세요"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <label>
        벙에 참여한 인원 수
        <input
          type="number"
          placeholder="벙에 참여한 인원 수 입력"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />
      </label>

      <label htmlFor="receipt" className="file-btn">
        {fileName || "(클릭) 영수증 사진 첨부"}
      </label>

      <input id="receipt" type="file" accept="image/*" onChange={handleFile} />

      <div className="form-button">
        <button type="submit">저장</button>
      </div>
    </form>
  );
}

export default ReceiptModal;

ReceiptModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
