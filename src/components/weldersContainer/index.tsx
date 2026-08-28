"use client";

import { useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { WeldersActivities } from "@/types/weldersActivities.interface";
import { dataFormater } from "@/utils/dataFormater";
import { TableList } from "@/components/lists/tableList";
import { Pagination } from "@/components/pagination";
import { hasFilters } from "@/utils/hasFilters";

function WeldersContainer() {
  const searchParams = useSearchParams();
  const endpoint = `welderActivity${hasFilters(searchParams) ? `/filter` : `/offset`}?${searchParams.toString()}`;

  const { data: weldersActivities, maxPages } = useFetch<WeldersActivities[]>(endpoint);

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
    <>
      <TableList isListPopulated={isListPopulated} tHeadValues={headValues}>
        {displayList}
      </TableList>
      <Pagination maxPages={maxPages} />
    </>
  );
}

export default WeldersContainer;
