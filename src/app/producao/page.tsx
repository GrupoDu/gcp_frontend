import styles from "./page.module.scss";
import "../globals.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import ListContainer from "@/components/listContainer";

const ProductionPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      <main className="mainContainer">
        <h2>Registros de produção</h2>
        <ListContainer />
      </main>
    </div>
  );
};

export default ProductionPage;
