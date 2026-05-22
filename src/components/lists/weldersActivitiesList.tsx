"use client";

import styles from "./styles.module.scss";
import { WeldersActivities } from "@/types/weldersActivities.type";
import { dataFormater } from "@/utils/dataFormater";
import { useFetch } from "@/hooks/useFetch";
import DataNotFound from "@/components/dataNotFound";

const WeldersActivitiesList = () => {
  const { data: weldersActivities } = useFetch<WeldersActivities[]>("welders-activities");

  return (
    <>
      <ul style={{ borderRadius: 0 }} className={styles.listContainer}>
        <div className={styles.listHeader}>
          <span>Soldador</span>
          <span>Produto</span>
          <span>Qtd.</span>
          <span>Data</span>
        </div>
        {renderActivities(weldersActivities)}
      </ul>
    </>
  );
};

function renderActivities(activities?: WeldersActivities[]) {
  if (!activities || activities.length < 1) return <DataNotFound />;

  return activities.map((activity) => (
    <li className={styles.listItem} key={activity.welder_activity_uuid}>
      <span>{activity.employees.name}</span>
      <span>{activity.products.acronym}</span>
      <span>{activity.produced_quantity}</span>
      <span>{dataFormater(activity.registered_at)}</span>
    </li>
  ));
}

export default WeldersActivitiesList;
