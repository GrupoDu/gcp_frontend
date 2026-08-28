"use client";

import SelectInput from "../ui/selectInput";
import { MONTHS_OPTIONS } from "@/constants/monthsOptions.constant";
import { useState } from "react";
import { setQueryParams } from "@/utils/setQueryParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const MonthInputSelect = () => {
  const [monthFilter, setMonthFilter] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleMonthChange = (value: string) => {
    setMonthFilter(value);
    const params = setQueryParams({
      searchParams,
      value,
      key: "month",
    });
    router.push(`${pathname}?${params}`);
  };

  return (
    <>
      <SelectInput
        label={"Mês"}
        options={MONTHS_OPTIONS}
        defaultValue={"Filtrar por Mês"}
        onChange={(e) => handleMonthChange(e.target.value)}
        value={monthFilter}
      />
    </>
  );
};
