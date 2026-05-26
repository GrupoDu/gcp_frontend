"use client";

import styles from "./styles.module.scss";
import { WeldersActivities } from "@/types/weldersActivities.type";
import { dataFormater } from "@/utils/dataFormater";
import { useFetch } from "@/hooks/useFetch";
import DataNotFound from "@/components/dataNotFound";
import { useSearchParams } from "next/navigation";

const WeldersActivitiesList = () => {
  const { data: weldersActivities } = useFetch<WeldersActivities[]>("welders-activities");
  const searchParams = useSearchParams();
  const employeeFilter = searchParams.get("employee");
  const dateFilter = searchParams.get("deadline");
  const productFilter = searchParams.get("product");
  const isEmployeeFilterEmpty = employeeFilter === "" || !employeeFilter;
  const isDateFilterEmpty = dateFilter === "" || !dateFilter;
  const isProductFilterEmpty = productFilter === "" || !productFilter || productFilter.includes("todos");
  const isFilterEmpty = isEmployeeFilterEmpty && isDateFilterEmpty && isProductFilterEmpty;
  const filteredActivities = weldersActivities?.filter(
    (activity) =>
      (isEmployeeFilterEmpty
        ? true
        : activity.employees.name.toLowerCase().includes(employeeFilter?.toLowerCase() || "")) &&
      (isDateFilterEmpty ? true : dataFormater(activity.registered_at) === dataFormater(dateFilter)) &&
      (isProductFilterEmpty ? true : activity.products.acronym === productFilter),
  );
  const listItems = isFilterEmpty ? weldersActivities : filteredActivities;

  return (
    <>
      <ul style={{ borderRadius: 0 }} className={styles.listContainer}>
        <div className={styles.listHeader}>
          <span>Soldador</span>
          <span>Produto</span>
          <span>Qtd.</span>
          <span>Data</span>
        </div>
        {renderActivities(listItems)}
      </ul>
    </>
  );
};

function renderActivities(activities?: WeldersActivities[]) {
  if (!activities || activities.length < 1) return <DataNotFound />;

  return activities?.map((activity) => (
    <li className={styles.listItem} key={activity.welder_activity_uuid}>
      <span>{activity.employees.name}</span>
      <span>{activity.products.acronym}</span>
      <span>{activity.produced_quantity}</span>
      <span>{dataFormater(activity.registered_at)}</span>
    </li>
  ));
}

export default WeldersActivitiesList;
