import "../../globals.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import ProductionOrderListContainer from "@/components/productionOrderListContainer";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";

const ProductionPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      <Suspense fallback={<Loading />}>
        <ProductionOrderListContainer />
      </Suspense>
    </div>
  );
};

export default ProductionPage;
