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
import { MONTHS_OPTIONS } from "@/constants/monthsOptions.constant";
import { TRACK_PARAMS } from "@/constants/trackParams.constant";
import { hasFilters } from "@/utils/hasFilters";
import { setQueryParams } from "@/utils/setQueryParams";

function WeldersContainer() {
  const { isLoading } = useLoading();
  const [monthFilter, setMonthFilter] = useState("");
  const [welderFilter, setWelderFilter] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const endpoint = `welderActivity${hasFilters(searchParams) ? `/filter` : `/offset`}`;

  const { data: welders } = useFetch<Employee[]>("employee/filter?role=Soldador");
  const { data: weldersActivities, maxPages } = useFetch<WeldersActivities[]>(endpoint, TRACK_PARAMS);

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
    const params = setQueryParams({ searchParams, key: "welderUuid", value });
    router.push(`${pathname}?${params}`);
  };

  const handleMonthChange = (value: string) => {
    setMonthFilter(value);
    const params = setQueryParams({ searchParams, key: "month", value });
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
                options={MONTHS_OPTIONS}
                isFilter={true}
                filterTarget={"month"}
                setOption={(e) => handleMonthChange(e.target.value)}
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
