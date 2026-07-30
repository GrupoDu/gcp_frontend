"use client";

import React, { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.scss";
import LinkButton from "@/components/linkButton";
import SubmitButton from "@/components/ui/submitButton";
import { useFetch } from "@/hooks/useFetch";
import { Employee } from "@/types/employee.interface";
import { Goal, GoalPayload } from "@/types/goal.interface";
import TextInput from "@/components/ui/textInput";
import { useLoading } from "@/hooks/useLoading";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/ui/selectInput";
import { getOptions } from "@/utils/getOptions";
import { CiCircleInfo } from "react-icons/ci";

type GoalFormProps = {
  isEdit: boolean;
  goal: unknown;
  setGoal: Dispatch<SetStateAction<Goal>>;
  handleSubmit: (
    e: React.SubmitEvent,
    router: AppRouterInstance,
    payload: GoalPayload,
    setIsLoading: (value: boolean) => void,
  ) => void;
};

function GoalForm({ isEdit, goal, handleSubmit, setGoal }: GoalFormProps) {
  const { data: welders } = useFetch<Employee[]>("employee?role=Soldador");
  const { isLoading, setIsLoading } = useLoading();
  const newGoal = goal as GoalPayload;
  const router = useRouter();
  const weldersOptions = welders?.map((welder) => getOptions(welder.employeeUuid, welder.name));

  const endpoint = isEdit ? `goal/${(goal as Goal).goalUuid}` : "goal";

  return (
    <form onSubmit={(e) => handleSubmit(e, router, newGoal, setIsLoading)} className={styles.registerGoalFormContainer}>
      <div className={styles.warning}>
        <CiCircleInfo className={styles.icon} />
        <span>
          Para selecionar um funcionário, marque a opção{" "}
          <i>
            <strong>&quot;Meta de funcionário&quot;</strong>
          </i>
        </span>
      </div>
      <label className={styles.deadlineInput}>
        <span>Data de entrega</span>
        <input
          type="date"
          onChange={(e) =>
            setGoal({
              ...newGoal,
              goalDeadline: new Date(e.target.value).toISOString(),
            })
          }
          value={String(newGoal.goalDeadline).split("T")[0]}
        />
      </label>
      <label className={`${styles.goalType}`}>
        <input
          type="checkbox"
          name=""
          id=""
          onChange={(e) => setGoal({ ...newGoal, isEmployeeGoal: e.target.checked })}
        />
        <span>Meta de funcionário</span>
      </label>
      <div className={styles.inputGrid}>
        <TextInput
          type={"text"}
          onChange={(e) => setGoal({ ...newGoal, goalTitle: e.target.value })}
          value={String(newGoal.goalTitle)}
          label={"Título"}
          required={true}
        />
        <SelectInput
          options={weldersOptions}
          value={String(newGoal.employeeUuid)}
          onChange={(e) => setGoal({ ...newGoal, employeeUuid: e.target.value })}
          label={"Funcionário"}
          defaultValue={"Funcionário"}
          isDisabled={!newGoal.isEmployeeGoal}
        />
      </div>
      <label className={styles.descriptionInput}>
        <span>Descrição</span>
        <textarea
          value={String(newGoal.goalDescription)}
          onChange={(e) => setGoal({ ...newGoal, goalDescription: e.target.value })}
        />
      </label>
      <div className={styles.buttons}>
        <LinkButton color="black" href="/metas">
          Cancelar
        </LinkButton>
        <SubmitButton>{isEdit ? "Editar" : "Salvar"}</SubmitButton>
      </div>
    </form>
  );
}

export default GoalForm;
