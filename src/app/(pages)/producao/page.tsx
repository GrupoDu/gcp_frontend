import styles from "./page.module.scss";
<<<<<<< HEAD
// @ts-expect-error tipagem chata do ts
=======
>>>>>>> 738bf1c (AAAAAAAAAAAA:)
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
