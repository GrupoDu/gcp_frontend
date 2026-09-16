import React from "react";
import styles from "./styles.module.scss";
import CardGoal from "../ui/cardGoal";
import { Goal } from "@/types/goal.interface";

const GoalList = ({ goalData, refetch }: { goalData: Goal[] | undefined; refetch?: () => void }) => {
  return (
    <ul className={styles.cardListContainer}>
      {goalData?.map((goal) => (
        <li key={goal.uuid}>
          <CardGoal
            goalId={goal.uuid || ""}
            status={goal.status || ""}
            refetch={refetch}
            description={goal.description}
            title={goal.title}
            deadline={goal.deadline.toString()}
          />
        </li>
      ))}
    </ul>
  );
};

export default GoalList;
