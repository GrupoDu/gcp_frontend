import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";

function AssistantActivityPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle={"Atividades de Assistentes"} />
      <main className={"mainContainer"}>
        <h2>Registrar Atividade</h2>
      </main>
    </div>
  );
}

export default AssistantActivityPage;
