import styles from "./styles.module.scss";
import LinkButton from "../../linkButton";
import DeleteButton from "@/components/deleteButton";
import EditButton from "@/components/editButton";

type CardRegisterProps = {
  status: string;
  registerId: string;
  title: string;
  date: string;
  description: string;
  refetch?: () => void;
};

const CardProductionOrder = (props: CardRegisterProps) => {
  const statusColor = props.status === "Aguardando" ? "#FFD079" : props.status === "Entregue" ? "green" : "red";

  return (
    <div className={styles.cardRegisterContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.status} style={{ backgroundColor: statusColor }}></div>
        <h3>{props.title}</h3>
        <div className={styles.buttons}>
          {props.status === "Pendente" && <EditButton href={`/producao/edit/${props.registerId}`} />}
          <DeleteButton endpoint="productionOrder" uuid={props.registerId} refetch={props.refetch} />
        </div>
      </div>
      <span>{props.date}</span>
      <div className={styles.dash} />
      {props.description ? (
        <p className={styles.observationField}>{props.description}</p>
      ) : (
        <p className={styles.noObservation}>Registro sem observação</p>
      )}
      <LinkButton color="black" fullWidth={true} textAlign="center" href={`/producao/${props.registerId}`}>
        Visualizar ordem de produção
      </LinkButton>
    </div>
  );
};

export default CardProductionOrder;
