"use client";

import styles from "./styles.module.scss";
import { AssistantsActivities } from "@/types/assistantsActivities.types";
import { dataFormater } from "@/utils/dataFormater";
import DataNotFound from "@/components/dataNotFound";
import { useFetch } from "@/hooks/useFetch";
import { useSearchParams } from "next/navigation";

const AssistantsActivitiesList = () => {
  const { data: assistantsActivities } = useFetch<AssistantsActivities[]>("assistants-activities");
  const searchParams = useSearchParams();
  const activityParam = searchParams.get("activity");
  const employeeNameParam = searchParams.get("employee");
  const isParamActivityEmpty = !activityParam || activityParam === "";
  const isParamNameEmpty = !employeeNameParam || employeeNameParam === "";
  const isParamsEmpty = isParamActivityEmpty && isParamNameEmpty;
  const filteredActivities = assistantsActivities?.filter(
    (activity) =>
      (isParamNameEmpty
        ? true
        : activity.employees.name.toLowerCase().includes(employeeNameParam?.toLowerCase() || "")) &&
      (isParamActivityEmpty ? true : activity.activity_type === activityParam),
  );
  const displayList = isParamsEmpty ? assistantsActivities : filteredActivities;

  return (
    <>
      <ul style={{ borderRadius: 0 }} className={styles.listContainer}>
        <div className={styles.listHeader}>
          <span>Assistente</span>
          <span>Atividade</span>
          <span>Qtd.</span>
          <span>Data</span>
        </div>
        {renderActivities(displayList)}
      </ul>
    </>
  );
};

function renderActivities(activies?: AssistantsActivities[]) {
  const isActivitiesEmpty = !activies || activies.length < 1;

  if (isActivitiesEmpty) return <DataNotFound />;

  return activies?.map((activity, index) => (
    <li className={styles.listItem} key={index}>
      <span>{activity.employees.name}</span>
      <span>{activity.activity_type}</span>
      <span>{activity.produced_quantity}</span>
      <span>{dataFormater(activity.registered_at)}</span>
    </li>
  ));
}

export default AssistantsActivitiesList;
