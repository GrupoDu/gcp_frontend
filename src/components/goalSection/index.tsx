"use client";

import styles from "./styles.module.scss";
import LinkButton from "../linkButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import CardGoal from "../ui/cardGoal";
import { useFetch } from "@/hooks/useFetch";
import { Goal } from "@/types/goal.interface";

const GoalSection = () => {
  const { data: goals, refetch } = useFetch<Goal[]>("goal/filter?status=EmProgresso");

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
        <DisplayGoals goals={goals} refetch={refetch} />
      </ul>
    </div>
  );
};

function DisplayGoals({ goals, refetch }: { goals: Goal[] | undefined; refetch: () => void }) {
  const isGoalsEmpty: boolean | undefined = goals && goals.length < 0;

  if (isGoalsEmpty) return <h4 className={styles.noGoalsText}>Nenhuma meta cadastrada</h4>;

  return goals?.map((meta) => (
    <li key={meta.goalUuid}>
      <CardGoal
        refetch={refetch}
        goalId={meta.goalUuid || ""}
        title={meta.goalTitle}
        description={meta.goalDescription}
        deadline={meta.goalDeadline.toString()}
        status={meta.goalStatus || "EmProgresso"}
      />
    </li>
  ));
}

export default GoalSection;
