"use client";

import AssistantContainer from "@/components/assistentesContainer";
import { Suspense } from "react";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import Loading from "@/components/ui/loading";
import { useLoading } from "@/hooks/useLoading";
import FiltersList from "@/components/filtersList";
import OpenMobileProvider from "@/providers/openMobile.provider";
import { EmployeeInputSelect } from "@/components/employeeInputSelect";
import { MonthInputSelect } from "@/components/monthInputSelect";

/**
 * Página de listagem e controle de atividades de assistentes.
 */
function AssistantsPage() {
  const { isLoading } = useLoading();

  return (
    <div className={`pageContainer `}>
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle={"Atividades de Assistentes"} />
      {isLoading && <Loading />}
      <main className={`mainContainer ${isLoading ? "loading" : ""}`}>
        <OpenMobileProvider>
          <Suspense>
            <FiltersList hrefButton={"/assistentes/atividade"} buttonLabel={"Registrar"}>
              <EmployeeInputSelect targetFilter={"assistantUuid"} employeeRole={"Assistente"} />
              <MonthInputSelect />
            </FiltersList>
          </Suspense>
        </OpenMobileProvider>
        <Suspense fallback={<Loading />}>
          <AssistantContainer />
        </Suspense>
      </main>
    </div>
  );
}

export default AssistantsPage;
