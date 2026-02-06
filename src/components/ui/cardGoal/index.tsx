import styles from "./styles.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { dataFormater } from "@/utils/dataFormater";

type CardGoalProps = {
  title: string;
  description: string;
  status: string;
  deadline: string;
};

const CardGoal = ({ title, description, status, deadline }: CardGoalProps) => {
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
      <div></div>
      <p className={styles.deadline}>Prazo: {dataFormater(deadline)}</p>
      <p>{description}</p>
    </div>
  );
};

export default CardGoal;
