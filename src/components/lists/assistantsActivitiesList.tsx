"use client";

import styles from "./styles.module.scss";
import { AssistantsActivities } from "@/types/assistantsActivities.types";
import { dataFormater } from "@/utils/dataFormater";
import DataNotFound from "@/components/dataNotFound";
import { useFetch } from "@/hooks/useFetch";

const AssistantsActivitiesList = () => {
  const { data: assistantsActivities } = useFetch<AssistantsActivities[]>("assistants-activities");

  return (
    <>
      <ul style={{ borderRadius: 0 }} className={styles.listContainer}>
        <div className={styles.listHeader}>
          <span>Assistente</span>
          <span>Atividade</span>
          <span>Qtd.</span>
          <span>Data</span>
        </div>
        {renderActivities(assistantsActivities)}
      </ul>
    </>
  );
};

function renderActivities(activies?: AssistantsActivities[]) {
  const isActivitiesEmpty = !activies || activies.length < 1;

  if (isActivitiesEmpty) return <DataNotFound />;

  return activies?.map((activity) => (
    <li key={activity.assistants_activities_uuid}>
      <span>{activity.assistants.name}</span>
      <span>{activity.activity_type}</span>
      <span>{activity.produced_quantity}</span>
      <span>{dataFormater(activity.registered_at)}</span>
    </li>
  ));
}

export default AssistantsActivitiesList;
