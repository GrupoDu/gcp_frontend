import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import { Breadcrumb } from "@/components/breadcrumb";
import { EmployeeProvider } from "@/providers/employee.provider";
import { ProductProvider } from "@/providers/products.provider";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { WelderActivityForm } from "@/components/forms/welderActivityForm";

function WeldersActivityPage() {
  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      <main className={"mainContainer"}>
        <Breadcrumb />
        <h2>Registrar atividade</h2>
        <EmployeeProvider>
          <ProductProvider>
            <Suspense fallback={<Loading />}>
              <WelderActivityForm />
            </Suspense>
          </ProductProvider>
        </EmployeeProvider>
      </main>
    </div>
  );
}

export default WeldersActivityPage;
