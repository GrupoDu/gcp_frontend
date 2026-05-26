import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { LuGoal } from "react-icons/lu";
import GoalListContainer from "@/components/goalListContainer";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import OpenMobileProvider from "@/providers/openMobile.provider";

const GoalPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader headerTitle="Metas" HeaderIcon={LuGoal} />
      <OpenMobileProvider>
        <Suspense fallback={<Loading />}>
          <GoalListContainer />
        </Suspense>
      </OpenMobileProvider>
    </div>
  );
};

export default GoalPage;
