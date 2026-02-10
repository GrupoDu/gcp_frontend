import styles from "./styles.module.scss";
import LinkButton from "../../linkButton";
import DeleteButton from "@/components/deleteButton";
import EditButton from "@/components/editButton";

type CardRegisterProps = {
  status: string;
  register_id: string;
  title: string;
  date: string;
  description: string;
  refetch?: () => void;
};

const CardRegister = (props: CardRegisterProps) => {
  const statusColor =
    props.status === "Pendente"
      ? "#FFD079"
      : props.status === "Entregue"
        ? "green"
        : "red";

  return (
    <div className={styles.cardRegisterContainer}>
      <div className={styles.cardHeader}>
        <div
          className={styles.status}
          style={{ backgroundColor: statusColor }}
        ></div>
        <h3>{props.title}</h3>
        <div className={styles.buttons}>
          <EditButton href={`/producao/edit/${props.register_id}`} />
          <DeleteButton
            endpoint="registers"
            uuid={props.register_id}
            refetch={props.refetch}
          />
        </div>
      </div>
      <span>{props.date}</span>
      <div className={styles.dash} />
      {props.description ? (
        <p className={styles.observationField}>{props.description}</p>
      ) : (
        <p className={styles.noObservation}>Registro sem observação</p>
      )}
      <LinkButton color="black" href={`/producao/${props.register_id}`}>
        Visualizar registro
      </LinkButton>
    </div>
  );
};

export default CardRegister;
