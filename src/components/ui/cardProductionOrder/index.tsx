"use client";

import styles from "./styles.module.scss";
import LinkButton from "../../linkButton";
import DeleteButton from "@/components/deleteButton";
import { dataFormater } from "@/utils/dataFormater";
import EditButton from "@/components/editButton";
import { useModal } from "@/hooks/useModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setQueryParams } from "@/utils/setQueryParams";
import { removeUnusedParams } from "@/utils/removeUnusedParams";

type CardRegisterProps = {
  productionOrderUuid: string;
  status: string;
  registerId: string;
  title: string;
  date: string;
  description: string;
  deliveryDate?: string | null;
  refetch?: () => void;
};

const CardProductionOrder = (props: CardRegisterProps) => {
  const statusColor = props.status === "EmProducao" ? "#FFD079" : props.status === "Finalizado" ? "#009688" : "#d32f2f";
  const searchParams = useSearchParams();
  const deliveryDate = props.deliveryDate || props.deliveryDate === "" ? ` - ${dataFormater(props.deliveryDate)}` : "";
  const isDone = props.status === "Finalizado";
  const router = useRouter();
  const pathname = usePathname();
  const { setShowModal, showModal } = useModal();

  const handleDeleteClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Usando aqui pra remover o param caso
    // ele já exista na URL e não acabe duplicado.
    removeUnusedParams({
      searchParams: params,
      key: "targetOrderDelete",
      value: "",
    });

    setShowModal(true);

    const newParams = setQueryParams({
      searchParams,
      key: "targetOrderDelete",
      value: props.productionOrderUuid,
    });
    router.push(`${pathname}?${newParams}`);
  };

  return (
    <div className={styles.cardRegisterContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.status} style={{ backgroundColor: statusColor }}></div>
        <h3>{props.title}</h3>
        {!isDone && (
          <div className={styles.buttons}>
            <EditButton href={`producao/atividade?formTo=edit&orderUuid=${props.productionOrderUuid}`} />
            <DeleteButton deleteAction={() => handleDeleteClick()} />
          </div>
        )}
      </div>
      <span>
        {props.date}
        {deliveryDate}
      </span>
      <div className={styles.dash} />
      <ProductionOrderDescription description={props.description} />
      <LinkButton color="black" fullWidth={true} textAlign="center" href={`/producao/${props.registerId}`}>
        Visualizar ordem de produção
      </LinkButton>
    </div>
  );
};

function ProductionOrderDescription({ description }: { description?: string }) {
  if (description) return <p className={styles.observationField}>{description}</p>;

  return <p className={styles.noObservation}>Registro sem observação</p>;
}

export default CardProductionOrder;
