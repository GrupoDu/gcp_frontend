import styles from "./styles.module.scss";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import LinkButton from "../../linkButton";
import { authToken } from "@/hooks/useFetch";
import { toast } from "react-toastify";

type CardRegisterProps = {
  status: string;
  register_id: string;
  title: string;
  date: string;
  description: string;
  refetch: () => void;
};

const CardRegister = (props: CardRegisterProps) => {
  const statusColor =
    props.status === "Pendente"
      ? "#FFD079"
      : props.status === "Entregue"
        ? "green"
        : "red";

  async function deleteRegister(uuid: string) {
    try {
      const response = await fetch(
        `http://localhost:8000/registers/${uuid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir registro.");
      }

      toast.success("Registro excluido com sucesso!");
      props.refetch();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <div className={styles.cardRegisterContainer}>
      <div className={styles.cardHeader}>
        <div
          className={styles.status}
          style={{ backgroundColor: statusColor }}
        ></div>
        <h3>{props.title}</h3>
        <div className={styles.buttons}>
          <button type="button" className={styles.editButton}>
            <FaEdit className={styles.buttonIcon} />
          </button>
          <button
            type="button"
            onClick={() => deleteRegister(props.register_id)}
            className={styles.deleteButton}
          >
            <MdOutlineDelete className={styles.buttonIcon} />
          </button>
        </div>
      </div>
      <span>{props.date}</span>
      <hr />
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
