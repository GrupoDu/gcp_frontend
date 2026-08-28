"use client";

import { useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { AssistantsActivities } from "@/types/assistantsActivities.interface";
import { dataFormater } from "@/utils/dataFormater";
import { Pagination } from "@/components/pagination";
import { TableList } from "@/components/lists/tableList";
import { hasFilters } from "@/utils/hasFilters";

function AssistantContainer() {
  const searchParams = useSearchParams();
  const endpoint = `assistantActivity${hasFilters(searchParams) ? "/filter" : "/offset"}?${searchParams.toString()}`;
  const { data: activities, maxPages } = useFetch<AssistantsActivities[]>(endpoint);

  const headValues = ["Assistente", "Atividade", "Qtd.", "Data"];
  const isListPopulated = !!activities && activities?.length > 0;

  return (
    <>
      <TableList tHeadValues={headValues} isListPopulated={isListPopulated}>
        <DisplayList activities={activities} />
      </TableList>
      <Pagination maxPages={maxPages} />
    </>
  );
}

function DisplayList({ activities }: { activities?: AssistantsActivities[] }) {
  if (!activities || activities.length === 0) return [];

  return activities?.map((activity) => (
    <tr key={activity.assistantsActivitiesUuid}>
      <td>{activity.employee.name}</td>
      <td>{activity.activityType}</td>
      <td>{activity.producedQuantity}</td>
      <td>{dataFormater(activity.registeredAt)}</td>
    </tr>
  ));
}

export default AssistantContainer;
