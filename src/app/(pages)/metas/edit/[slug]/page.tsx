"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import PageHeader from "@/components/ui/pageHeader";
import { LuGoal } from "react-icons/lu";
import GoalForm from "@/components/forms/goalForm";
import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { GoalPayload } from "@/types/goal.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { handlePatch } from "@/utils/handleSubmitUtils/handlePatch";
import { toast } from "react-toastify";

const handleSubmit = async (
  e: React.SubmitEvent,
  router: AppRouterInstance,
  payload: GoalPayload,
  setIsLoading: (value: boolean) => void,
) => {
  e.preventDefault();
  setIsLoading(true);

  const success = await handlePatch(payload, "goal/update");

  if (!success) {
    setIsLoading(false);
    toast.error("Ocorreu um erro ao atualizar a meta");
    return;
  }

  setIsLoading(false);
  toast.success("Meta atualizada com sucesso");
  router.push("/metas");
};

const GoalEditPage = () => {
  const { slug } = useParams();
  const { data: fetchedGoal } = useFetch<GoalPayload>(`goal/${slug}`);
  const [goal, setGoal] = useState<GoalPayload>({
    isEmployeeGoal: false,
    goalDeadline: new Date().toISOString(),
    goalTitle: "",
    goalDescription: "",
    employeeUuid: "",
  });

  useEffect(() => {
    if (fetchedGoal) setGoal(fetchedGoal);
  }, [fetchedGoal]);

  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Metas" HeaderIcon={LuGoal} />
      <main className="mainContainer">
        <h3>Editar meta</h3>
        <GoalForm isEdit={true} goal={goal} setGoal={setGoal} handleSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default GoalEditPage;
