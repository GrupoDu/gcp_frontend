"use client";

import { useFetch } from "@/hooks/useFetch";
import { AssistantsPORegisters } from "@/types/assistantsPORegister.type";
import React, { useMemo } from "react";
import { AssistantsPORegisterContext, assistantsPORegisterContextValues } from "@/context/assistantsPORegister.context";
import { usePathname } from "next/navigation";

export default function AssistantsPORegisterProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const productionOrderId = pathname.split("/")[2];
  const { data, status, err, refetch } = useFetch<AssistantsPORegisters[]>(
    `assistantsPORegisters/${productionOrderId}`,
  );

  const assistantsPORegistersData: assistantsPORegisterContextValues = useMemo(
    () => ({
      assistantsPORegisters: data || undefined,
      status: status || undefined,
      err: err || undefined,
      refetch,
    }),
    [err, status, data, refetch],
  );

  return <AssistantsPORegisterContext value={assistantsPORegistersData}>{children}</AssistantsPORegisterContext>;
}
