import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
// @ts-expect-error tipagem chata do ts
import "../../../globals.scss";
import ProductionOrderInfos from "@/components/productionOrderInfos";
import ProductionOrderSection from "@/components/productionOrderSection";
import { ProductionOrderProvider } from "@/providers/productionOrder.provider";

async function ViewProductionOrderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className={styles.pageContainer}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Registro" />
      <main className="mainContainer">
        <ProductionOrderInfos production_order_id={slug} />
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
