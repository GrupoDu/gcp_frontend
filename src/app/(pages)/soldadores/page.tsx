import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import WeldersActivitiesList from "@/components/lists/weldersActivitiesList";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import OpenMobileProvider from "@/providers/openMobile.provider";

function WeldersActivitiesPage() {
  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção de soldadores" />
      <main className={"mainContainer"}>
        <Suspense fallback={<Loading />}>
          <OpenMobileProvider>
            <WeldersActivitiesList />
          </OpenMobileProvider>
        </Suspense>
      </main>
    </div>
  );
}

export default WeldersActivitiesPage;
