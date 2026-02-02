import styles from "./styles.module.scss";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import LinkButton from "../linkButton";

type CardRegisterProps = {
  status: "Pendente" | "Entregue" | "Não finalizado";
  title: string;
  date: string;
  description: string;
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
          <FaEdit className={`${styles.button} ${styles.editButton}`} />
          <MdOutlineDelete
            className={`${styles.button} ${styles.deleteButton}`}
          />
        </div>
      </div>
      <span>{props.date}</span>
      <hr />
      <p>{props.description}</p>
      <LinkButton href="/" placeholder="Visualizar registro" />
    </div>
  );
};

export default CardRegister;
