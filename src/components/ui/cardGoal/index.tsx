import styles from "./styles.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { dataFormater } from "@/utils/dataFormater";
import DeleteButton from "@/components/deleteButton";
import EditButton from "@/components/editButton";
import DeliverButton from "../deliverButton";
import { handlePatch } from "@/utils/handleSubmitUtils/handlePatch";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useState } from "react";

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
      <FaCheckCircle color="green" className={styles.iconStatus} />
    ) : status === "EmProgresso" ? (
      <FaClock color="#FFD079" className={styles.iconStatus} />
    ) : (
      <IoIosCloseCircle color="red" className={styles.iconStatus} />
    );

  return (
    <div className={styles.cardGoalContainer}>
      <div className={styles.goalTitle}>
        {statusIcon}
        <h4>{title}</h4>
        <div className={styles.buttons}>
          <DeleteButton refetch={refetch} endpoint="goal" uuid={goalId} />
          {status === "EmProgresso" && <EditButton href={`/metas/edit/${goalId}`} />}
        </div>
      </div>
      <hr />
      <p className={styles.deadline}>Prazo: {dataFormater(deadline)}</p>
      <p>{description ? description : "Sem descrição"}</p>
      {status === "EmProgresso" && (
        <form
          onSubmit={async (e) => {
            await handleDelivery(e, goalId);
            if (refetch) refetch();
          }}
          className={styles.deliverButtonContainer}
        >
          <DeliverButton>Marcar como batida</DeliverButton>
        </form>
      )}
    </div>
  );
};

export default CardGoal;
