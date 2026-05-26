import "../../globals.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import ProductionOrderListContainer from "@/components/productionOrderListContainer";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import OpenMobileProvider from "@/providers/openMobile.provider";

const ProductionPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      <OpenMobileProvider>
        <Suspense fallback={<Loading />}>
          <ProductionOrderListContainer />
        </Suspense>
      </OpenMobileProvider>
    </div>
  );
};

export default ProductionPage;
