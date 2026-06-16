"use client";

import styles from "./styles.module.scss";
import { AssistantsActivities, AssistantsActivitiesPagination } from "@/types/assistantsActivities.types";
import { dataFormater } from "@/utils/dataFormater";
import DataNotFound from "@/components/dataNotFound";
import { useFetch } from "@/hooks/useFetch";
import { useSearchParams } from "next/navigation";

const AssistantsActivitiesList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const { data } = useFetch<AssistantsActivitiesPagination>(`assistants-activities?page=${page}`);

  if (!page) return <h1>Página não encontrada</h1>;

  const isActivitiesEmpty = !data?.assistantsActivities || data.assistantsActivities.length < 1;

  if (isActivitiesEmpty)
    return (
      <div className={"notFoundTable"}>
        <DataNotFound />
      </div>
    );

  return (
    <table style={{ borderRadius: 0 }} className={"listContainer"}>
      <thead className={"listHeader"}>
        <tr>
          <th>Assistente</th>
          <th>Atividade</th>
          <th>Qtd.</th>
          <th>Data</th>
        </tr>
      </thead>
      {renderActivities(data.assistantsActivities)}
    </table>
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
