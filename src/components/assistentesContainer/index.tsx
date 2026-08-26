"use client";

import OpenMobileProvider from "@/providers/openMobile.provider";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { AssistantsActivities } from "@/types/assistantsActivities.interface";
import { Employee } from "@/types/employee.interface";
import { getOptions } from "@/utils/getOptions";
import { dataFormater } from "@/utils/dataFormater";
import { Pagination } from "@/components/pagination";
import { TableList } from "@/components/lists/tableList";
import FiltersList from "@/components/filtersList";
import SelectInput from "@/components/ui/selectInput";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";
import { TRACK_PARAMS } from "@/constants/trackParams.constant";
import { hasFilters } from "@/utils/hasFilters";
import { MONTHS_OPTIONS } from "@/constants/monthsOptions.constant";
import { setQueryParams } from "@/utils/setQueryParams";

function AssistantContainer() {
  const { isLoading } = useLoading();
  const [assistantFilter, setAssistantFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const endpoint = `assistantActivity/${hasFilters(searchParams) ? "filter" : "offset"}`;
  const { data: activities, maxPages } = useFetch<AssistantsActivities[]>(endpoint, TRACK_PARAMS);
  const { data: assistants } = useFetch<Employee[]>("employee/filter?role=Assistente");

  const assistantsOptions = assistants?.map((assistant) => getOptions(assistant.employeeUuid, assistant.name));
  const headValues = ["Assistente", "Atividade", "Qtd.", "Data"];
  const isListPopulated = !!activities && activities?.length > 0;
  const displayList = activities?.map((activity) => (
    <tr key={activity.assistantsActivitiesUuid}>
      <td>{activity.employee.name}</td>
      <td>{activity.activityType}</td>
      <td>{activity.producedQuantity}</td>
      <td>{dataFormater(activity.registeredAt)}</td>
    </tr>
  ));

  const handleMonthChange = (value: string) => {
    setMonthFilter(value);
    const params = setQueryParams({ searchParams, key: "month", value });
    router.push(`${pathname}?${params}`);
  };

  const handleAssistantChange = (value: string) => {
    setAssistantFilter(value);
    const params = setQueryParams({ searchParams, key: "assistantUuid", value });
    router.push(`${pathname}?${params}`);
  };

  return (
    <>
      {isLoading && <Loading />}
      <OpenMobileProvider>
        <main className={`mainContainer ${isLoading ? "loading" : ""}`}>
          <FiltersList hrefButton={"assistentes/atividade"} buttonLabel={"Registrar"}>
            <SelectInput
              onChange={(e) => handleAssistantChange(e.target.value)}
              value={assistantFilter}
              defaultValue={"Filtrar por assistente"}
              label={"Assistente"}
              options={assistantsOptions}
            />
            <SelectInput
              label={"Mês"}
              options={MONTHS_OPTIONS}
              onChange={(e) => handleMonthChange(e.target.value)}
              value={monthFilter}
              defaultValue={"Filtrar por mês"}
            />
          </FiltersList>
          <TableList tHeadValues={headValues} isListPopulated={isListPopulated}>
            {displayList}
          </TableList>
          <Pagination maxPages={maxPages} />
        </main>
      </OpenMobileProvider>
    </>
  );
}

export default AssistantContainer;
