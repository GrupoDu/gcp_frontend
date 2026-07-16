"use client";

import styles from "./styles.module.scss";
import LinkButton from "../linkButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import CardGoal from "../ui/cardGoal";
import { useGoal } from "@/hooks/useGoal";

const GoalSection = () => {
  const { goalsData, refetch } = useGoal();
  const isGoalsEmpty: boolean | undefined = goalsData && goalsData.length > 0;
  const pendingGoals = goalsData?.filter((goal) => goal.goalStatus === "Pendente");

  return (
    <div className={styles.goalSectionContainer}>
      <h3>Metas pendentes</h3>
      <div className={styles.goalButtons}>
        <LinkButton color="black" href="/metas/register" fullWidth={false} Icon={FaPlus}>
          Criar nova meta
        </LinkButton>
        <LinkButton color="black" href="/metas" Icon={FaExternalLinkAlt}>
          Visualizar metas
        </LinkButton>
      </div>
      <ul>
        {isGoalsEmpty ? (
          <h4 className={styles.noGoalsText}>Nenhuma meta cadastrada</h4>
        ) : (
          pendingGoals?.map((meta) => (
            <li key={meta.goalUuid}>
              <CardGoal
                refetch={refetch}
                goalId={meta.goalUuid || ""}
                title={meta.goalTitle}
                description={meta.goalDescription}
                deadline={meta.goalDeadline.toString()}
                status={meta.goalStatus || "Pendente"}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default GoalSection;
