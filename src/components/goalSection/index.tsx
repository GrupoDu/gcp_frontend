"use client";

import styles from "./styles.module.scss";
import LinkButton from "../linkButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import CardGoal from "../ui/cardGoal";
import { useGoal } from "@/hooks/useGoal";

const GoalSection = () => {
  const { goalsData, refetch } = useGoal();
  let isGoalsEmpty: boolean;

  if (goalsData && goalsData.length > 0) {
    isGoalsEmpty = false;
  } else {
    isGoalsEmpty = true;
  }

  return (
    <div className={styles.goalSectionContainer}>
      <div className={styles.goalButtons}>
        <LinkButton
          color="black"
          href="/metas/register"
          fullWidth={false}
          Icon={FaPlus}
        >
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
          goalsData?.map((meta) => (
            <li key={meta.goal_id}>
              <CardGoal
                refetch={refetch}
                goal_id={meta.goal_id}
                title={meta.title}
                description={meta.description}
                deadline={meta.deadline.toString()}
                status={meta.goal_status}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default GoalSection;
