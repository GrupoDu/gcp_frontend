import styles from "./styles.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { dataFormater } from "@/utils/dataFormater";
import DeleteButton from "@/components/deleteButton";
import EditButton from "@/components/editButton";
import DeliverButton from "../deliverButton";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { BsCheck } from "react-icons/bs";

async function handleDelivery(e: React.SubmitEvent, goalId: string) {
  e.preventDefault();

  try {
    await api.patch(`/goal/${goalId}`);

    toast.success("Meta marcada como alcançada");
  } catch (e) {
    console.error(e);
    toast.error((e as Error).message);
  }
}

type CardGoalProps = {
  title: string;
  description: string;
  status: string;
  deadline: string;
  goalId: string;
  refetch?: () => void;
};

const CardGoal = ({ title, description, status, deadline, goalId, refetch }: CardGoalProps) => {
  const statusIcon =
    status === "Alcancada" ? (
      <FaCheckCircle color="#009688" className={styles.iconStatus} />
    ) : status === "EmProgresso" ? (
      <FaClock color="#FFD079" className={styles.iconStatus} />
    ) : (
      <IoIosCloseCircle color="#d32f2f" className={styles.iconStatus} />
    );

  return (
    <div className={styles.cardGoalContainer}>
      <div className={styles.goalTitle}>
        {statusIcon}
        <h4>{title}</h4>
        <div className={styles.buttons}>
          <DeleteButton deleteAction={() => toast.warning("Funcionalidade em desenvolvimento.")} />
          {status === "EmProgresso" && <EditButton href={`/metas/edit/${goalId}`} />}
        </div>
      </div>
      <hr />
      <p className={styles.deadline}>Prazo: {dataFormater(deadline)}</p>
      <p>{description ? description : "Sem descrição"}</p>
      <DisplayBottomButton status={status} goalId={goalId} refetch={refetch} />
    </div>
  );
};

function DisplayBottomButton({ status, goalId, refetch }: { status: string; goalId: string; refetch?: () => void }) {
  const isInProgress = status === "EmProgresso";

  if (isInProgress) {
    return (
      <form
        onSubmit={async (e) => {
          await handleDelivery(e, goalId);
          if (refetch) refetch();
        }}
        className={styles.deliverButtonContainer}
      >
        <DeliverButton>Marcar como batida</DeliverButton>
      </form>
    );
  }

  return (
    <div className={styles.deliveredDisplay}>
      <BsCheck />
      <p>Meta batida</p>
    </div>
  );
}

export default CardGoal;
