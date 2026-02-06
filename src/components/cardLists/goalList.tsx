import React from "react";
import styles from "./styles.module.scss";
import CardGoal from "../ui/cardGoal";
import { Goal } from "@/types/goal.type";

const GoalList = ({ goalData }: { goalData: Goal[] | undefined }) => {

  return (
    <ul className={styles.cardListContainer}>
      {goalData?.map((goal) => (
        <li key={goal.goal_id}>
          <CardGoal
            description={goal.description}
            title={goal.title}
            status={goal.goal_status}
          />
        </li>
      ))}
    </ul>
  );
};

export default GoalList;
