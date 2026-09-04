"use client";

import { ModalContext } from "@/context/modal.context";
import { useState } from "react";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  return <ModalContext.Provider value={{ showModal, setShowModal }}>{children}</ModalContext.Provider>;
};
