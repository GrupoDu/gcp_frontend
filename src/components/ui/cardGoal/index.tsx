import styles from "./styles.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { FaClock } from "react-icons/fa";

type CardGoalProps = {
  title: string;
  description: string;
  status: string;
};

const CardGoal = ({ title, description, status }: CardGoalProps) => {
  const statusIcon =
    status === "Batido" ? (
      <FaCheckCircle color="green" />
    ) : status === "Pendente" ? (
      <FaClock color="#FFD079" />
    ) : (
      <IoIosCloseCircle color="red" />
    );

  console.log("Status: ", status);

  return (
    <div className={styles.cardGoalContainer}>
      <div className={styles.goalTitle}>
        {statusIcon}
        <h4>{title}</h4>
      </div>
      <hr />
      <p>{description}</p>
    </div>
  );
};

export default CardGoal;
