import React from "react";
import styles from "./styles.module.scss";
import CardGoal from "../ui/cardGoal";
import { Goal } from "@/types/goal.type";

const GoalList = ({
  goalData,
  refetch,
}: {
  goalData: Goal[] | undefined;
  refetch?: () => void;
}) => {
  return (
    <ul className={styles.cardListContainer}>
      {goalData?.map((goal) => (
        <li key={goal.goal_id}>
          <CardGoal
            refetch={refetch}
            goal_id={goal.goal_id}
            description={goal.description}
            title={goal.title}
            status={goal.goal_status}
            deadline={goal.deadline.toString()}
          />
        </li>
      ))}
    </ul>
  );
};

export default GoalList;
