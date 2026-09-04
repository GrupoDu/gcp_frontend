import { useContext } from "react";
import { ModalContext } from "@/context/modal.context";

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) throw new Error("useModal deve ser usado com ModalProvider");

  return context;
};
