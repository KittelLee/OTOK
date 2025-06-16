import { useState } from "react";
import "../../styles/Modal/ReceiptModal.css";

function ReceiptModal() {
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <form className="receipt-wrap">
      <h2>N차 정산 입력</h2>
      <label>
        금액
        <input type="number" placeholder="총 금액을 입력하세요" />
      </label>

      <label>
        벙에 참여한 인원 수
        <input type="number" placeholder="벙에 참여한 인원 수 입력" />
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
