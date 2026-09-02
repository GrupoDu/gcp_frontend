"use client";

import { useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { AssistantsActivities } from "@/types/assistantsActivities.interface";
import { dataFormater } from "@/utils/dataFormater";
import { Pagination } from "@/components/pagination";
import { TableList } from "@/components/lists/tableList";
import { hasFilters } from "@/utils/hasFilters";

/**
 * Componente container para exibição e controle da listagem de atividades dos assistentes.
 */
const AssistantContainer = () => {
  const searchParams = useSearchParams();
  const endpoint = `assistantActivity${hasFilters(searchParams) ? "/filter" : "/offset"}?${searchParams.toString()}`;
  const { data: activities, maxPages } = useFetch<AssistantsActivities[]>(endpoint);

  const headValues = ["Assistente", "Atividade", "Qtd.", "Data"];
  const isListPopulated = !!activities && activities?.length > 0;

  const displayList = activities?.map((activity, index) => (
    <tr key={activity.assistantsActivitiesUuid || activity.assistantActivityUuid || index}>
      <td>{activity.employee.name}</td>
      <td>{activity.activityType}</td>
      <td>{activity.producedQuantity}</td>
      <td>{dataFormater(activity.registeredAt)}</td>
    </tr>
  ));

  return (
    <>
      <TableList tHeadValues={headValues} isListPopulated={isListPopulated}>
        {displayList}
      </TableList>
      <Pagination maxPage={maxPages} />
    </>
  );
};

export default AssistantContainer;

