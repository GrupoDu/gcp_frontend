import WeldersContainer from "@/components/weldersContainer";
import { Suspense } from "react";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import Loading from "@/components/ui/loading";

function WeldersActivitiesPage() {
  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção de soldadores" />
      <Suspense fallback={<Loading />}>
        <WeldersContainer />
      </Suspense>
    </div>
  );
}

export default WeldersActivitiesPage;
