import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import "../../../globals.scss";
import ProductionOrderInfos from "@/components/productionOrderInfos";
import ProductionOrderSection from "@/components/productionOrderSection";
import { ProductionOrderProvider } from "@/providers/productionOrder.provider";
import AssistantsPORegisterProvider from "@/providers/assistantsPORegister.provider";

async function ViewProductionOrderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Registro" />
      <main className="mainContainer">
        <AssistantsPORegisterProvider>
          <ProductionOrderInfos production_order_id={slug} />
        </AssistantsPORegisterProvider>
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
