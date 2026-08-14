import styles from "./styles.module.scss";
import LinkButton from "../../linkButton";
import DeleteButton from "@/components/deleteButton";

type CardRegisterProps = {
  status: string;
  registerId: string;
  title: string;
  date: string;
  description: string;
  deliveryDate?: string;
  refetch?: () => void;
};

const CardProductionOrder = (props: CardRegisterProps) => {
  const statusColor = props.status === "EmProducao" ? "#FFD079" : props.status === "Finalizado" ? "#009688" : "#d32f2f";
  const deliveryDate = props.deliveryDate || props.deliveryDate === "" ? ` - ${props.deliveryDate}` : "";

  return (
    <div className={styles.cardRegisterContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.status} style={{ backgroundColor: statusColor }}></div>
        <h3>{props.title}</h3>
        <div className={styles.buttons}>
          <DeleteButton endpoint="productionOrder" uuid={props.registerId} refetch={props.refetch} />
        </div>
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
