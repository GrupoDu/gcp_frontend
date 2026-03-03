import React from "react";
import styles from "../../register/page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import "../../../../globals.scss";
import { EmployeeProvider } from "@/providers/employee.provider";
import ProductionOrderForm from "@/components/forms/productionOrderForm";
import { ProductProvider } from "@/providers/products.provider";
import { ProductionOrderProvider } from "@/providers/productionOrder.provider";
import { SupervisorProvider } from "@/providers/supervisor.provider";

const EditRegisterPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Editar registro" />
      <main className="mainContainer">
        <h2>Editar registro de produção</h2>
        <EmployeeProvider>
          <ProductionOrderProvider>
            <ProductProvider>
              <SupervisorProvider>
                <ProductionOrderForm isEdit={true} productionOrderId={slug} />
              </SupervisorProvider>
            </ProductProvider>
          </ProductionOrderProvider>
        </EmployeeProvider>
      </main>
    </div>
  );
};

export default EditRegisterPage;
