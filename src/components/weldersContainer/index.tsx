"use client";

import styles from "./styles.module.scss";
import OpenMobileProvider from "@/providers/openMobile.provider";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.interface";
import { WeldersActivities } from "@/types/weldersActivities.interface";
import { getOptions } from "@/utils/getOptions";
import { dataFormater } from "@/utils/dataFormater";
import FiltersList from "@/components/filtersList";
import SelectInput from "@/components/ui/selectInput";
import { TableList } from "@/components/lists/tableList";
import { Pagination } from "@/components/pagination";
import { CustomDropdown } from "@/components/ui/customDropdown";
import { monthsOptions } from "@/Constants/monthsOptions.constant";

function setFilterParam(value: string, searchParams: URLSearchParams): string {
  const params = new URLSearchParams(searchParams.toString());
  params.set("welderUuid", value);

  return params.toString();
}

function WeldersContainer() {
  const { isLoading } = useLoading();
  const [monthFilter, setMonthFilter] = useState("");
  const [welderFilter, setWelderFilter] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const month = searchParams.get("month");
  const welderUuid = searchParams.get("welderUuid");
  const isFiltering = !!month || !!welderUuid;

  const { data: welders } = useFetch<Employee[]>("employee/filter?role=Soldador");
  const { data: weldersActivities, maxPages } = useFetch<WeldersActivities[]>(
    `welderActivity${isFiltering ? "" : `/offset?page=${page}&pageSize=${pageSize}`}`,
    true,
  );

  const weldersOptions = welders?.map((welder) => getOptions(welder.employeeUuid, welder.name));
  const isListPopulated = !!weldersActivities && weldersActivities?.length > 0;
  const headValues = ["Soldador", "Produto/Atividade", "Qtd.", "Data"];
  const displayList = weldersActivities?.map((activity) => (
    <tr key={activity.welderActivityUuid}>
      <td>{activity.employee.name}</td>
      <td>{activity.product ? activity.product.name : activity.descriptionGeneralActivity}</td>
      <td>{activity.producedQuantity}</td>
      <td>{dataFormater(activity.registeredAt)}</td>
    </tr>
  ));
  const handleWelderChange = (value: string) => {
    setWelderFilter(value);
    const params = setFilterParam(value, searchParams);
    router.push(`${pathname}?${params}`);
  };

  return (
    <>
      {isLoading && <Loading />}
      <main className={`mainContainer ${isLoading ? "loading" : ""}`}>
        <OpenMobileProvider>
          <div className={styles.weldersActivitiesContainer}>
            <FiltersList hrefButton={"/soldadores/atividade"} buttonLabel={"Registrar atividade"}>
              <SelectInput
                onChange={(e) => handleWelderChange(e.target.value)}
                value={welderFilter}
                label={"Soldador"}
                options={weldersOptions}
                defaultValue={"Selecione um soldador"}
              />
              <CustomDropdown
                label={"Mês"}
                options={monthsOptions}
                isFilter={true}
                filterTarget={"month"}
                setOption={setMonthFilter}
                value={monthFilter}
              />
            </FiltersList>
            <TableList isListPopulated={isListPopulated} tHeadValues={headValues}>
              {displayList}
            </TableList>
            <Pagination maxPages={maxPages} />
          </div>
        </OpenMobileProvider>
      </main>
    </>
  );
}

export default WeldersContainer;
