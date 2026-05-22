"use client";

import { createContext } from "react";

type OpenMobileContextType = {
  setOpenMobile: (value: boolean) => void;
  openMobile: boolean;
};

export const OpenMobileContext = createContext<OpenMobileContextType | undefined>(undefined);
