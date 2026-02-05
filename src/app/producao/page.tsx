import styles from "./page.module.scss";
// @ts-expect-error tipagem chata do ts
import "../globals.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import RegisterListContainer from "@/components/registerListContainer";

const ProductionPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      <main className="mainContainer">
        <h2>Registros de produção</h2>
        <RegisterListContainer />
      </main>
    </div>
  );
};

export default ProductionPage;
