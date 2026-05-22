"use client";

import React, { useState } from "react";
import { OpenMobileContext } from "@/context/openMobile.context";

function OpenMobileProvider({ children }: { children: React.ReactNode }) {
  const [openMobile, setOpenMobile] = useState(false);

  return <OpenMobileContext value={{ setOpenMobile, openMobile }}>{children}</OpenMobileContext>;
}

export default OpenMobileProvider;
