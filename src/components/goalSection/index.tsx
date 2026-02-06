"use client";

import styles from "./styles.module.scss";
import LinkButton from "../linkButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import CardGoal from "../ui/cardGoal";
import { useFetch } from "@/hooks/useFetch";
import { Goal } from "@/types/goal.type";

const GoalSection = () => {
  const { data: goalsData } = useFetch<Goal>(`http://localhost:8000/goals/`);

  return (
    <div className={styles.goalSectionContainer}>
      <div className={styles.goalButtons}>
        <LinkButton color="black" href="/" fullWidth={false} Icon={FaPlus}>
          Criar nova meta
        </LinkButton>
        <LinkButton color="black" href="/" Icon={FaExternalLinkAlt}>
          Visualizar metas
        </LinkButton>
      </div>
      <ul>
        {goalsData?.goals?.map((meta) => (
          <li key={meta.goal_id}>
            <CardGoal
              title={meta.title}
              description={meta.description}
              deadline={meta.deadline.toString()}
              status={meta.goal_status}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalSection;
