"use client";

import PageHeader from "@/components/ui/pageHeader";
import React, { useState } from "react";
import { LuGoal } from "react-icons/lu";
import styles from "./page.module.scss";
import "../../../globals.scss";
import GoalForm from "@/components/forms/goalForm";
import { useLoading } from "@/hooks/useLoading";
import Loading from "@/components/ui/loading";
import { handlePost } from "@/utils/handleSubmitUtils/handlePost";
import { GoalPayload } from "@/types/goal.interface";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

async function handleSubmit(
  e: React.SubmitEvent,
  router: AppRouterInstance,
  payload: GoalPayload,
  setIsLoading: (value: boolean) => void,
) {
  e.preventDefault();
  setIsLoading(true);

  const success = await handlePost(payload, "goal");

  if (!success) {
    setIsLoading(false);
    toast.error("Erro ao registrar meta");
    return;
  }

  toast.success("Meta registrada com sucesso");
  router.push("/metas");
}

const GoalRegisterPage = () => {
  const { isLoading, setIsLoading } = useLoading();
  const router = useRouter();
  const [goal, setGoal] = useState<GoalPayload>({
    title: "",
    description: "",
    isEmployeeGoal: false,
    deadline: "",
    employeeUuid: "",
  });

  const payload = {
    title: goal.title,
    description: goal.description,
    isEmployeeGoal: goal.isEmployeeGoal,
    deadline: goal.deadline,
    employeeUuid: goal.employeeUuid === "" ? null : goal.employeeUuid,
  };

  return (
    <div className={styles.pageContainer}>
      <PageHeader headerTitle="Usuários" HeaderIcon={LuGoal} />
      {isLoading && <Loading />}
      <main className={`mainContainer ${isLoading ? "loading" : ""}`}>
        <h3>Registrar nova meta</h3>
        <GoalForm
          isEdit={false}
          handleSubmit={(e) => handleSubmit(e, router, payload, setIsLoading)}
          goal={goal}
          setGoal={setGoal}
        />
      </main>
    </div>
  );
};

export default GoalRegisterPage;
