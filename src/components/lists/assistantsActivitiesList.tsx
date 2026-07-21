"use client";

import { AssistantsActivities } from "@/types/assistantsActivities.interface";
import { dataFormater } from "@/utils/dataFormater";
import DataNotFound from "@/components/dataNotFound";
import { useFetch } from "@/hooks/useFetch";
import { useSearchParams } from "next/navigation";
import FiltersList from "@/components/filtersList";
import { useEffect, useState } from "react";
import { Employee } from "@/types/employee.interface";
import SelectInput from "../ui/selectInput";
import { Pagination } from "../pagination";
import { DateInput } from "@/components/ui/dateInput";

const AssistantsActivitiesList = () => {
  const [assistantFilter, setAssistantFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const { data: activities, maxPages } = useFetch<AssistantsActivities[]>(
    `assistantActivity/offset?page=${page}&pageSize=${pageSize}`,
  );
  const { data: assistants } = useFetch<Employee[]>("employee/filter?role=Assistente");

  const assistantsOptions = assistants?.map((assistant) => ({
    value: assistant.employeeUuid || "",
    label: assistant.name,
  }));

  useEffect(() => {
    console.log(activities);
  }, [activities]);

  if (!page) return <h1>Página não encontrada</h1>;

  const isActivitiesEmpty = !activities || activities.length < 1;

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
              {renderActivities(activities)}
            </table>
          </div>
          <Pagination maxPages={maxPages} />
        </>
      )}
    </div>
  );
};

function renderActivities(activies: AssistantsActivities[]) {
  return activies?.map((activity, index) => (
    <tbody className={"listItem"} key={index}>
      <tr>
        <td>{activity.employee.name}</td>
        <td>{activity.activityType}</td>
        <td>{activity.producedQuantity}</td>
        <td>{dataFormater(activity.registeredAt)}</td>
      </tr>
    </tbody>
  ));
}

export default AssistantsActivitiesList;
