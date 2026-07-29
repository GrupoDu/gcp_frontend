"use client";

import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import OpenMobileProvider from "@/providers/openMobile.provider";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { AssistantsActivities } from "@/types/assistantsActivities.interface";
import { Employee } from "@/types/employee.interface";
import { getOptions } from "@/utils/getOptions";
import { dataFormater } from "@/utils/dataFormater";
import { Pagination } from "@/components/pagination";
import { TableList } from "@/components/lists/tableList";
import FiltersList from "@/components/filtersList";
import { DateInput } from "@/components/ui/dateInput";
import SelectInput from "@/components/ui/selectInput";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";

function AssistantActivityPage() {
  const { isLoading } = useLoading();
  const [assistantFilter, setAssistantFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const { data: activities, maxPages } = useFetch<AssistantsActivities[]>(
    `assistantActivity/offset?page=${page}&pageSize=${pageSize}`,
  );
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

  return (
    <div className={`pageContainer `}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle={"Atividades de Assistentes"} />
      <OpenMobileProvider>
        {isLoading && <Loading />}
        <main className={`mainContainer ${isLoading ? "loading" : ""}`}>
          <FiltersList hrefButton={"assistentes/atividade"} buttonLabel={"Registrar"}>
            <SelectInput
              onChange={(e) => setAssistantFilter(e.target.value)}
              value={assistantFilter}
              defaultValue={"Filtra por assistente"}
              label={"Assistente"}
              options={assistantsOptions}
            />
            <DateInput label={"Data"} setValue={setDateFilter} value={dateFilter} isFilter={true} />
          </FiltersList>
          <TableList tHeadValues={headValues} isListPopulated={isListPopulated}>
            {displayList}
          </TableList>
          <Pagination maxPages={maxPages} />
        </main>
      </OpenMobileProvider>
    </div>
  );
}

export default AssistantActivityPage;
