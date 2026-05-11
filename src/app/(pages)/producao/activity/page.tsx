import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import ActivityForm from "@/components/forms/activityForm";

function ActivityPage() {
  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      <main className={"mainContainer"}>
        <h2>Registrar atividade</h2>
        <ActivityForm />
      </main>
    </div>
  );
}

export default ActivityPage;
