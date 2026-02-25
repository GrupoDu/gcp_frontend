import styles from "./page.module.scss";
// @ts-expect-error tipagem chata do ts
import "../../globals.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import ProductionOrderListContainer from "@/components/productionOrderListContainer";

const ProductionPage = () => {
  return (
    <div className={styles.pageContainer}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      <main className="mainContainer">
        <h2>Ordens de produção</h2>
        <ProductionOrderListContainer />
      </main>
    </div>
  );
};

export default ProductionPage;
