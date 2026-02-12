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
            goal_id={goal.goal_id || ""}
            status={goal.goal_status || ""}
            refetch={refetch}
            description={goal.goal_description}
            title={goal.goal_title}
            deadline={goal.goal_deadline.toString()}
          />
        </li>
      ))}
    </ul>
  );
};

export default GoalList;
