import styles from "./styles.module.scss";

type CardGoalProps = {
  title: string;
  description: string;
  isChecked: boolean;
};

const CardGoal = ({ title, description, isChecked }: CardGoalProps) => {
  return (
    <div className={styles.cardGoalContainer}>
      <div className={styles.goalTitle}>
        <input type="checkbox" name="goal-check" checked={isChecked} />
        <h4>{title}</h4>
      </div>
      <hr />
      <p>{description}</p>
    </div>
  );
};

export default CardGoal;
