"use client";

import ProductionContainer from "@/components/productionContainer";
import { Suspense } from "react";
import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import Loading from "@/components/ui/loading";
import { useLoading } from "@/hooks/useLoading";
import styles from "./page.module.scss";
import FiltersList from "@/components/filtersList";
import ProductsDropdown from "@/components/ui/productsDropdown";
import StatusDropdown from "@/components/ui/statusDropdown";
import { MonthInputSelect } from "@/components/monthInputSelect";
import OpenMobileProvider from "@/providers/openMobile.provider";
import { Modal } from "@/components/modal";
import { toast } from "react-toastify";
import { api } from "@/services/api";

function getParams(): string {
  if (typeof window === "undefined") {
    console.warn("getParams: window is undefined");
    return "";
  }

  return window.location.search;
}

function extractUuid(params: string): string {
  const searchParams = new URLSearchParams(params);
  return searchParams.get("targetOrderDelete") || "";
}

function removeTargetParams(params: string): void {
  const searchParams = new URLSearchParams(params);
  searchParams.delete("targetOrderDelete");
}

const ProductionPage = () => {
  const { isLoading } = useLoading();

  const handleDeleteProductionOrder = async () => {
    const params = getParams();
    const uuid = extractUuid(params);

    try {
      await api.delete(`/productionOrder/delete/${uuid}`);

      if (typeof window !== "undefined") document.location.reload();
      toast.success("Ordem de produção deletada com sucesso. Recarregue a página");
    } catch (e) {
      const err = e as Error;
      console.error(err.message);
      toast.error(err.message);
    } finally {
      removeTargetParams(params);
    }
  };

  return (
    <>
      <Suspense>
        <Modal action={handleDeleteProductionOrder} />
      </Suspense>
      <div className="pageContainer">
        <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
        {isLoading && <Loading />}
        <main style={{ gap: 0 }} className={`${styles.listContainer} mainContainer ${isLoading ? "loading" : ""}`}>
          <OpenMobileProvider>
            <Suspense>
              <FiltersList
                buttonLabel={"Ordem de produção"}
                hrefButton={"producao/atividade?formTo=create"}
                style={{ borderRadius: ".2rem .2rem 0 0", borderBottom: 0 }}
              >
                <MonthInputSelect />
                <ProductsDropdown />
                <StatusDropdown />
              </FiltersList>
            </Suspense>
          </OpenMobileProvider>
          <Suspense fallback={<Loading />}>
            <ProductionContainer />
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default ProductionPage;
