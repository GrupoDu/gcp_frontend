import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import ActivityForm from "@/components/forms/activityForm";
import { ProductProvider } from "@/providers/products.provider";
import { EmployeeProvider } from "@/providers/employee.provider";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { Breadcrumb } from "@/components/breadcrumb";

function ActivityPage() {
  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      <main className={"mainContainer"}>
        <Breadcrumb />
        <h2>Registrar atividade</h2>
        <EmployeeProvider>
          <ProductProvider>
            <Suspense fallback={<Loading />}>
              <ActivityForm />
            </Suspense>
          </ProductProvider>
        </EmployeeProvider>
      </main>
    </div>
  );
}

export default ActivityPage;
