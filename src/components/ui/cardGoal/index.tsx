import styles from "./styles.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { dataFormater } from "@/utils/dataFormater";
import DeleteButton from "@/components/deleteButton";
import EditButton from "@/components/editButton";

type CardGoalProps = {
  title: string;
  description: string;
  status: string;
  deadline: string;
  goal_id: string;
  refetch?: () => void;
};

const CardGoal = ({
  title,
  description,
  status,
  deadline,
  goal_id,
  refetch,
}: CardGoalProps) => {
  const statusIcon =
    status === "Batido" ? (
      <FaCheckCircle color="green" />
    ) : status === "Pendente" ? (
      <FaClock color="#FFD079" />
    ) : (
      <IoIosCloseCircle color="red" />
    );

  console.log("Goal_id: ", goal_id);

  return (
    <div className={styles.cardGoalContainer}>
      <div className={styles.goalTitle}>
        {statusIcon}
        <h4>{title}</h4>
        <div className={styles.buttons}>
          <DeleteButton refetch={refetch} endpoint="goals" uuid={goal_id} />
          <EditButton href={`/metas/edit/${goal_id}`} />
        </div>
      </div>
      <hr />
      <p className={styles.deadline}>Prazo: {dataFormater(deadline)}</p>
      <p>{description}</p>
    </div>
  );
};

export default CardGoal;
