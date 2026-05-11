import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import "../../../globals.scss";
import ProductionOrderInfos from "@/components/productionOrderInfos";
import ProductionOrderSection from "@/components/productionOrderSection";
import { ProductionOrderProvider } from "@/providers/productionOrder.provider";
import AssistantsRegisterProvider from "../../../../providers/assistantsRegister.provider";

async function ViewProductionOrderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Registro" />
      <main className="mainContainer">
        <AssistantsRegisterProvider>
          <ProductionOrderInfos production_order_uuid={slug} />
        </AssistantsRegisterProvider>
        <h3>
          <IoMdClipboard /> Ordens de produção pendentes
        </h3>
        <ProductionOrderProvider>
          <ProductionOrderSection />
        </ProductionOrderProvider>
      </main>
    </div>
  );
}

export default ViewProductionOrderPage;
