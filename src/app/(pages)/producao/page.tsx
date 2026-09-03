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

const ProductionPage = () => {
  const { isLoading } = useLoading();

  return (
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
  );
};

export default ProductionPage;
