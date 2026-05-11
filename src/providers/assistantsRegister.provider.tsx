"use client";

import { useFetch } from "@/hooks/useFetch";
import { AssistantsRegisters } from "@/types/assistantsRegister.type";
import React, { useMemo } from "react";
import { AssistantsRegisterContext, assistantsRegisterContextValues } from "../context/assistantsRegisterContext";
import { usePathname } from "next/navigation";

export default function AssistantsRegisterProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const productionOrderId = pathname.split("/")[2];
  const { data, status, err, refetch } = useFetch<AssistantsRegisters[]>(
    `assistants-po-registers/${productionOrderId}`,
  );

  const assistantsRegisters: assistantsRegisterContextValues = useMemo(
    () => ({
      assistantsRegisters: data || undefined,
      status: status || undefined,
      err: err || undefined,
      refetch,
    }),
    [err, status, data, refetch],
  );

  return <AssistantsRegisterContext value={assistantsRegisters}>{children}</AssistantsRegisterContext>;
}
