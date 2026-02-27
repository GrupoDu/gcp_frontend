import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { LuGoal } from "react-icons/lu";
import GoalListContainer from "@/components/goalListContainer";
import { GoalProvider } from "@/providers/goal.provider";

const GoalPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Metas" HeaderIcon={LuGoal} />
      <GoalProvider>
        <GoalListContainer />
      </GoalProvider>
    </div>
  );
};

export default GoalPage;
