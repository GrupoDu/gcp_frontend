import styles from "./page.module.scss";
import "../../globals.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import ProductionOrderListContainer from "@/components/productionOrderListContainer";

const ProductionPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      <ProductionOrderListContainer />
    </div>
  );
};

export default ProductionPage;
