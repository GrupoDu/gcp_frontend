"use client";

import WeldersContainer from "@/components/weldersContainer";
import { Suspense } from "react";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import Loading from "@/components/ui/loading";
import { useLoading } from "@/hooks/useLoading";
import { EmployeeInputSelect } from "@/components/employeeInputSelect";
import { MonthInputSelect } from "@/components/monthInputSelect";
import FiltersList from "@/components/filtersList";
import OpenMobileProvider from "@/providers/openMobile.provider";

function WeldersActivitiesPage() {
  const { isLoading } = useLoading();

  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção de soldadores" />
      {isLoading && <Loading />}
      <main className={`mainContainer ${isLoading ? "loading" : ""}`}>
        <OpenMobileProvider>
          <Suspense>
            <FiltersList hrefButton={"/soldadores/atividade"} buttonLabel={"Registrar atividade"}>
              <EmployeeInputSelect targetFilter={"welderUuid"} employeeRole={"Soldador"} />
              <MonthInputSelect />
            </FiltersList>
          </Suspense>
        </OpenMobileProvider>
        <Suspense fallback={<Loading />}>
          <WeldersContainer />
        </Suspense>
      </main>
    </div>
  );
}

export default WeldersActivitiesPage;
