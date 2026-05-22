import styles from "./styles.module.scss";
import { AssistantsActivities } from "@/types/assistantsActivities.types";
import getAssistantsActivities from "@/utils/getAssistantsActivities";
import { dataFormater } from "@/utils/dataFormater";
import DataNotFound from "@/components/dataNotFound";

const AssistantsActivitiesList = async () => {
  const assistantsActivities = await getAssistantsActivities();

  if (!assistantsActivities) return <DataNotFound />;

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
