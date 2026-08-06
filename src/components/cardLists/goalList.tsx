import React from "react";
import styles from "./styles.module.scss";
import CardGoal from "../ui/cardGoal";
import { Goal } from "@/types/goal.interface";

const GoalList = ({ goalData, refetch }: { goalData: Goal[] | undefined; refetch?: () => void }) => {
  return (
    <ul className={styles.cardListContainer}>
      {goalData?.map((goal) => (
        <li key={goal.goalUuid}>
          <CardGoal
            goalId={goal.goalUuid || ""}
            status={goal.goalStatus || ""}
            refetch={refetch}
            description={goal.goalDescription}
            title={goal.goalTitle}
            deadline={goal.goalDeadline.toString()}
          />
        </li>
      ))}
    </ul>
  );
};

export default GoalList;
