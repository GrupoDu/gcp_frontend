"use client";

import { AssistantsActivities, AssistantsActivitiesPagination } from "@/types/assistantsActivities.types";
import { dataFormater } from "@/utils/dataFormater";
import DataNotFound from "@/components/dataNotFound";
import { useFetch } from "@/hooks/useFetch";
import { useSearchParams } from "next/navigation";
import FiltersList from "@/components/filtersList";
import { useState } from "react";
import { Employee } from "@/types/employee.type";
import SelectInput from "../ui/selectInput";
import { Pagination } from "../pagination";
import { DateInput } from "@/components/ui/dateInput";

const AssistantsActivitiesList = () => {
  const [assistantFilter, setAssistantFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const per_page = searchParams.get("per_page");
  const { data: activities } = useFetch<AssistantsActivitiesPagination>(
    `assistants-activities?page=${page}&per_page=${per_page}`,
  );
  const { data: assistants } = useFetch<Employee[]>("employees/assistants");

  const assistantsOptions = assistants?.map((assistant) => ({
    value: assistant.employee_uuid || "",
    label: assistant.name,
  }));

  if (!page) return <h1>Página não encontrada</h1>;

  const isActivitiesEmpty = !activities?.assistantsActivities || activities.assistantsActivities.length < 1;

  return (
    <div className={"mainContainer"}>
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
      {isActivitiesEmpty ? (
        <DataNotFound />
      ) : (
        <>
          <div className="tableWrapper">
            <table style={{ borderRadius: 0 }} className={"listContainer"}>
              <thead className={"listHeader"}>
                <tr>
                  <th>Assistente</th>
                  <th>Atividade</th>
                  <th>Qtd.</th>
                  <th>Data</th>
                </tr>
              </thead>
              {renderActivities(activities.assistantsActivities)}
            </table>
          </div>
          <Pagination max_pages={activities.max_pages} />
        </>
      )}
    </div>
  );
};

function renderActivities(activies: AssistantsActivities[]) {
  return activies?.map((activity, index) => (
    <tbody className={"listItem"} key={index}>
      <tr>
        <td>{activity.employees.name}</td>
        <td>{activity.activity_type}</td>
        <td>{activity.produced_quantity}</td>
        <td>{dataFormater(activity.registered_at)}</td>
      </tr>
    </tbody>
  ));
}

export default AssistantsActivitiesList;
