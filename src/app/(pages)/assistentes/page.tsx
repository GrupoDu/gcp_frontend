import AssistantContainer from "@/components/assistentesContainer";
import { Suspense } from "react";

import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import Loading from "@/components/ui/loading";

function AssistantActivityPage() {
  return (
    <div className={`pageContainer `}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle={"Atividades de Assistentes"} />
      <Suspense fallback={<Loading />}>
        <AssistantContainer />
      </Suspense>
    </div>
  );
}

export default AssistantActivityPage;
