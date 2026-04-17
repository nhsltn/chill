import { useState } from "react";

export function useMediaModal() {
  const [modalData, setModalData] = useState(null);

  const handleOpenDetail = ({ id, mediaType }) => {
    setModalData({ id, mediaType });
  };

  const handleCloseDetail = () => setModalData(null);

  return { modalData, handleOpenDetail, handleCloseDetail };
}
