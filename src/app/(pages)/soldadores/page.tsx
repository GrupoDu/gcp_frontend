"use client";

import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import styles from "./page.module.scss";
import OpenMobileProvider from "@/providers/openMobile.provider";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.interface";
import { WeldersActivities } from "@/types/weldersActivities.interface";
import { getOptions } from "@/utils/getOptions";
import { dataFormater } from "@/utils/dataFormater";
import FiltersList from "@/components/filtersList";
import SelectInput from "@/components/ui/selectInput";
import { DateInput } from "@/components/ui/dateInput";
import { TableList } from "@/components/lists/tableList";
import { Pagination } from "@/components/pagination";

function WeldersActivitiesPage() {
  const { isLoading } = useLoading();
  const [registeredAtFilter, setRegisteredAtFilter] = useState("");
  const [welderFilter, setWelderFilter] = useState("");

  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");

  const { data: welders } = useFetch<Employee[]>("employee/filter?role=Soldador");
  const { data: weldersActivities, maxPages } = useFetch<WeldersActivities[]>(
    `welderActivity/offset?page=${page}&pageSize=${pageSize}`,
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

  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção de soldadores" />
      {isLoading && <Loading />}
      <main className={"mainContainer"}>
        <OpenMobileProvider>
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
            <TableList isListPopulated={isListPopulated} tHeadValues={headValues}>
              {displayList}
            </TableList>
            <Pagination maxPages={maxPages} />
          </div>
        </OpenMobileProvider>
      </main>
    </div>
  );
}

export default WeldersActivitiesPage;
