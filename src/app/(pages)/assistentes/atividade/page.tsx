import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import { AssistantActivityForm } from "@/components/forms/assistantActivityForm";

function AssistantActivityPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle={"Atividades de Assistentes"} />
      <main className={"mainContainer"}>
        <h2>Registrar Atividade</h2>
      </main>
      <AssistantActivityForm />
    </div>
  );
}

export default AssistantActivityPage;
