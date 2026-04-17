import { useState } from "react";
import { ModalContext } from "./modalContext.js";

export function ModalProvider({ children }) {
  const [modalData, setModalData] = useState(null);

  const handleOpenDetail = ({ id, mediaType }) =>
    setModalData({ id, mediaType });
  const handleCloseDetail = () => setModalData(null);

  return (
    <ModalContext.Provider
      value={{ modalData, handleOpenDetail, handleCloseDetail }}
    >
      {children}
    </ModalContext.Provider>
  );
}
