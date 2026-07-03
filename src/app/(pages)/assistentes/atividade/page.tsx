import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import { AssistantActivityForm } from "@/components/forms/assistantActivityForm";
import { Breadcrumb } from "@/components/breadcrumb";

function AssistantActivityPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle={"Atividades de Assistentes"} />
      <main className={"mainContainer"}>
        <Breadcrumb />
        <h2>Registrar Atividade</h2>
        <AssistantActivityForm />
      </main>
    </div>
  );
}

export default AssistantActivityPage;
