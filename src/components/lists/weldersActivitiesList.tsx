"use client";

import styles from "./styles.module.scss";
import { WeldersActivitiesPagination } from "@/types/weldersActivities.interface";
import { dataFormater } from "@/utils/dataFormater";
import { useFetch } from "@/hooks/useFetch";
import DataNotFound from "@/components/dataNotFound";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination";
import { useEffect, useRef, useState } from "react";
import FiltersList from "@/components/filtersList";
import SelectInput from "@/components/ui/selectInput";
import { DateInput } from "@/components/ui/dateInput";
import { Employee } from "@/types/employee.interface";

const WeldersActivitiesList = () => {
  const [registeredAtFilter, setRegisteredAtFilter] = useState("");
  const [welderFilter, setWelderFilter] = useState("");

  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const itemRef = useRef<HTMLTableRowElement | null>(null);

  const { data: welders } = useFetch<Employee[]>("employee/filter?role=Soldador");
  const { data } = useFetch<WeldersActivitiesPagination>(`welderActivity/offset?page=${page}&pageSize=${pageSize}`);
  const isListPopulated = !!data && data?.length > 0;
  const weldersOptions = welders?.map((welder) => ({
    value: welder.employeeUuid || "",
    label: welder.name,
  }));

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!page) return <h3>Página não encontrada</h3>;

  return (
    <div className={styles.weldersActivitiesContainer}>
      <FiltersList hrefButton={"/soldadores/atividade"} buttonLabel={"Registrar atividade"}>
        <SelectInput
          onChange={(e) => setWelderFilter(e.target.value)}
          value={welderFilter}
          label={"Soldador"}
          options={weldersOptions}
          defaultValue={"Selecione um soldador"}
        />
        <DateInput
          label={"Data da atividade"}
          isFilter={true}
          filterTarget={"registered_at"}
          value={registeredAtFilter}
          setValue={setRegisteredAtFilter}
        />
      </FiltersList>
      {!isListPopulated ? (
        <DataNotFound />
      ) : (
        <>
          <div className="tableWrapper">
            <table style={{ borderRadius: 0 }} className={"listContainer"}>
              <thead className={"listHeader"}>
                <tr>
                  <th>Soldador</th>
                  <th>Produto/Atividade</th>
                  <th>Qtd.</th>
                  <th>Data</th>
                </tr>
              </thead>
              {data?.map((activity) => (
                <tbody key={activity.welderActivityUuid}>
                  <tr className={"listItem"}>
                    <td>{activity.employee.name}</td>
                    <td>{activity.product ? activity.product.acronym : activity.descriptionGeneralActivity}</td>
                    <td>{activity.producedQuantity}</td>
                    <td>{dataFormater(activity.registeredAt)}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <Pagination maxPages={data.maxPages} />{" "}
        </>
      )}
    </div>
  );
};

export default WeldersActivitiesList;
