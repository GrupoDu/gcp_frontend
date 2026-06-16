"use client";

import styles from "./styles.module.scss";
import { WeldersActivities, WeldersActivitiesPagination } from "@/types/weldersActivities.type";
import { dataFormater } from "@/utils/dataFormater";
import { useFetch } from "@/hooks/useFetch";
import DataNotFound from "@/components/dataNotFound";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination";
import { Ref, useEffect, useRef, useState } from "react";

const WeldersActivitiesList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const perPage = searchParams.get("per_page");
  const { data } = useFetch<WeldersActivitiesPagination>(`welders-activities?page=${page}&per_page=${perPage}`);
  const itemRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {}, [data]);

  if (!page) return <h3>Página não encontrada</h3>;

  if (!data?.weldersActivities || data.weldersActivities.length < 1) return <DataNotFound />;

  return (
    <>
      <table style={{ borderRadius: 0 }} className={"listContainer"}>
        <thead className={"listHeader"}>
          <tr>
            <th>Soldador</th>
            <th>Produto</th>
            <th>Qtd.</th>
            <th>Data</th>
          </tr>
        </thead>
        {data?.weldersActivities.map((activity) => (
          <tbody className={"listItem"} key={activity.welder_activity_uuid}>
            <tr ref={itemRef} className={"item"}>
              <td>{activity.employees.name}</td>
              <td>{activity.products.acronym}</td>
              <td>{activity.produced_quantity}</td>
              <td>{dataFormater(activity.registered_at)}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <Pagination max_pages={data.max_pages} />
    </>
  );
};

function renderActivities(itemRef: Ref<HTMLTableRowElement>, activities?: WeldersActivities[]) {
  return activities?.map((activity) => (
    <tbody className={"listItem"} key={activity.welder_activity_uuid}>
      <tr ref={itemRef}>
        <td>{activity.employees.name}</td>
        <td>{activity.products.acronym}</td>
        <td>{activity.produced_quantity}</td>
        <td>{dataFormater(activity.registered_at)}</td>
      </tr>
    </tbody>
  ));
}

export default WeldersActivitiesList;
