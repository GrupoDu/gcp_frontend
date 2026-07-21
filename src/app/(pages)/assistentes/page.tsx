import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import OpenMobileProvider from "@/providers/openMobile.provider";
import AssistantsActivitiesList from "@/components/lists/assistantsActivitiesList";
import { Suspense } from "react";

function AssistantActivityPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle={"Atividades de Assistentes"} />
      <OpenMobileProvider>
        <Suspense>
          <AssistantsActivitiesList />
        </Suspense>
      </OpenMobileProvider>
    </div>
  );
}

export default AssistantActivityPage;
