"use client";

import PageHeader from "@/components/ui/pageHeader";
import { IoMdClipboard } from "react-icons/io";
import React, { Suspense } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";
import { ProductionOrderForm } from "@/components/forms/ProductionOrderForm";

function ActivityPage() {
  const { isLoading } = useLoading();

  return (
    <div className="pageContainer">
      <PageHeader HeaderIcon={IoMdClipboard} headerTitle="Produção" />
      {isLoading && <Loading />}
      <main className={`mainContainer ${isLoading ? "loading" : ""}`}>
        <Breadcrumb />
        <Suspense>
          <ProductionOrderForm />
        </Suspense>
      </main>
    </div>
  );
}

export default ActivityPage;
