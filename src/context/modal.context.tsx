import { createContext } from "react";

type ModalContextType = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);
