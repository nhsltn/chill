import { useContext } from "react";
import { ModalContext } from "../context/modalContext.js";

export function useModal() {
  return useContext(ModalContext);
}
