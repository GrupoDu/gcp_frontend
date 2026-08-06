import GoalsContainer from "@/components/goalsContainer";
import { Suspense } from "react";
import PageHeader from "@/components/ui/pageHeader";
import { LuGoal } from "react-icons/lu";

const GoalPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Metas" HeaderIcon={LuGoal} />
      <Suspense>
        <GoalsContainer />
      </Suspense>
    </div>
  );
};

export default GoalPage;
