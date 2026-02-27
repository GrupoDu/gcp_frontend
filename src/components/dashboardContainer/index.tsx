"use client";

import React from "react";
import ChartSection from "../chartSection";
import { IoMdClipboard } from "react-icons/io";
import { GoalProvider } from "@/providers/goal.provider";
import { LuGoal } from "react-icons/lu";
import GoalSection from "../goalSection";
import ProductionOrderSection from "../productionOrderSection";
import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/loading";

const DashboardContainer = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <Loading />}
      <main
        style={{ gap: "1rem" }}
        className={`mainContainer ${isLoading && "loading"}`}
      >
        <h2>Análises</h2>
        <ChartSection />
        <h2>
          <IoMdClipboard /> Ordens de produção pendentes
        </h2>
        <ProductionOrderSection />
        <h2>
          <LuGoal /> Metas
        </h2>
        <GoalProvider>
          <GoalSection />
        </GoalProvider>
      </main>
    </>
  );
};

export default DashboardContainer;
