import ProductionContainer from "@/components/productionContainer";
import { Suspense } from "react";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import Loading from "@/components/ui/loading";

const ProductionPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      <Suspense fallback={<Loading />}>
        <ProductionContainer />
      </Suspense>
    </div>
  );
};

export default ProductionPage;
