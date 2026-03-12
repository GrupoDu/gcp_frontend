import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import { ProductProvider } from "@/providers/products.provider";
import { EmployeeProvider } from "@/providers/employee.provider";
import { ProductionOrderProvider } from "@/providers/productionOrder.provider";
import { SupervisorProvider } from "@/providers/supervisor.provider";
import ProductionOrderForm from "@/components/forms/productionOrderForm";

const RegisterPage = () => {
  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Novo registro" />
      <main className="mainContainer">
        <h2>Criar nova ordem de produção</h2>
        <ProductProvider>
          <EmployeeProvider>
            <ProductionOrderProvider>
              <SupervisorProvider>
                <ProductionOrderForm isEdit={false} />
              </SupervisorProvider>
            </ProductionOrderProvider>
          </EmployeeProvider>
        </ProductProvider>
      </main>
    </div>
  );
};

export default RegisterPage;
